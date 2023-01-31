const MAPS_API_BASE_URL = 'https://maps.googleapis.com/maps/api/js';

export type ApiParams = {
  v: string;
  key: string;
  language: string;
  region: string;
  libraries: string;
  auth_referrer_policy: string;
};

const enum LoadingState {
  UNLOADED,
  UNLOADING,
  QUEUED,
  LOADING,
  LOADED
}

/**
 * Temporary document used to abort in-flight scripts.
 * The only way we found so far to stop a script that is already in
 * preparation from executing is
 */
const tmpDoc = new DOMParser().parseFromString('<html></html>', 'text/html');

/**
 * API loader to reliably load and unload the Google Maps API.
 * The actual loading and unloading is delayed into the microtask queue, to
 * allow for using this in a useEffect hook without having to worry about
 * starting to load the API multiple times.
 */
export class GoogleMapsApiLoader {
  private static params: ApiParams | null = null;
  private static serializedParams: string | null = null;
  private static loadPromise: Promise<void> | null = null;
  private static loadingState = LoadingState.UNLOADED;

  /**
   * Loads the Google Maps API with the specified parameters, reloading
   * it if neccessary. The returned promise resolves when loading completes
   * and rejects in case of an error or when the loading was aborted.
   * @param params
   */
  static async load(params: ApiParams): Promise<void> {
    const serializedParams = this.serializeParams(params);

    this.params = params;

    // loading hasn't yet started, so the promise can be reused (loading will
    // use parameters from the last call before loading starts)
    if (this.loadingState <= LoadingState.QUEUED && this.loadPromise) {
      return this.loadPromise;
    }

    // loading has already started, but the parameters didn't change
    if (
      this.loadingState >= LoadingState.LOADING &&
      serializedParams === this.serializedParams &&
      this.loadPromise
    ) {
      return this.loadPromise;
    }

    // if parameters did change, and we already loaded the API, we need
    // to unload it first.
    if (this.loadPromise) {
      await this.unloadAsync();
    }

    this.loadingState = LoadingState.QUEUED;
    this.loadPromise = new Promise(async (resolve, reject) => {
      // this causes the rest of the function to be pushed back into the
      // microtask-queue, allowing multiple synchronous calls before actually
      // loading anything.
      await Promise.resolve();

      // if the load request was canceled in the meantime, we stop here and
      // reject the promise. This is typically the case in react dev mode when
      // load/unload are called from a hook.
      if (this.loadingState !== LoadingState.QUEUED) {
        reject(new Error('map loading canceled'));
        return;
      }

      this.loadingState = LoadingState.LOADING;
      const url = this.getApiUrl(this.params);

      // setup the callback
      window.__gmcb__ = () => {
        this.loadingState = LoadingState.LOADED;
        resolve();
      };
      url.searchParams.set('callback', '__gmcb__');

      // create the script
      const script = document.createElement('script');
      script.src = url.toString();
      script.onerror = err => reject(err);
      document.head.appendChild(script);
    });

    return this.loadPromise;
  }

  /**
   * Unloads the Google Maps API by canceling any pending script downloads
   * and removing the global `google.maps` object.
   */
  static unload(): void {
    void this.unloadAsync();
  }

  private static async unloadAsync(): Promise<void> {
    // if loading hasn't started, reset the loadingState.
    // this will cause the loading to not start
    if (this.loadingState <= LoadingState.QUEUED) {
      this.loadingState = LoadingState.UNLOADED;
      return;
    }

    const gmScriptTags = Array.from(
      document.querySelectorAll(`script[src^="${MAPS_API_BASE_URL}"]`)
    );
    this.loadingState = LoadingState.UNLOADING;

    // defer to the microtask-queue and check if the loading-state was
    // changed in the meantime. If that is the case, unload was likely called
    // in error (or by the React dev-mode calling the effect cleanup function
    // just for fun). In this case, it is just ignored.
    await Promise.resolve();

    if (this.loadingState !== LoadingState.UNLOADING) {
      return;
    }

    // The elements are removed from the document and adopted into a different
    // one. This prevents the script from executing once it's loaded if it hasn't
    // already.
    for (const el of gmScriptTags) {
      el.remove();
      tmpDoc.adoptNode(el);
    }

    if (window.google && window.google.maps) {
      // @ts-ignore
      delete window.google.maps;
    }
  }

  private static getApiUrl(params: ApiParams | null): URL {
    if (params === null) {
      throw new Error("api-params can't be null");
    }

    const url = new URL(MAPS_API_BASE_URL);
    for (const [key, value] of Object.entries(params)) {
      url.searchParams.set(key, value);
    }

    return url;
  }

  private static serializeParams(params: ApiParams): string {
    return [
      params.v,
      params.key,
      params.language,
      params.region,
      params.libraries,
      params.auth_referrer_policy
    ].join('/');
  }
}

declare global {
  interface Window {
    __gmcb__: () => void;
  }
}
