#!/usr/bin/env bash
if [ -z ${EXAMPLE+x} ]; then
  echo Check out the examples README for how to start a specific example.
  exit 1
else
  npm run start:$EXAMPLE -w examples
fi