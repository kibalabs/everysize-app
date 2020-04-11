#!/usr/bin/env bash
set -e -o pipefail

docker build -t everysize everysize/
docker stop everysize || true
docker rm everysize || true
docker run \
    --detach \
    --name everysize \
    --publish-all \
    --env-file ~/.everysize.vars \
    --restart on-failure \
    --env VIRTUAL_HOST=everysize.kibalabs.com \
    --env LETSENCRYPT_HOST=everysize.kibalabs.com \
    everysize
