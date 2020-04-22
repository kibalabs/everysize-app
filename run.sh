#!/usr/bin/env bash
set -e -o pipefail

docker pull registry.gitlab.com/kibalabs/everypage/everysize-app:latest
docker stop everysize && docker rm everysize || true
docker run \
    --detach \
    --name everysize \
    --publish-all \
    --env-file ~/.everysize.vars \
    --restart on-failure \
    --env VIRTUAL_HOST=everysize-app.kibalabs.com \
    --env LETSENCRYPT_HOST=everysize-app.kibalabs.com \
    registry.gitlab.com/kibalabs/everypage/everysize-app:latest
