#!/usr/bin/env bash
set -e -o pipefail

docker pull registry.gitlab.com/kibalabs/everypage/everysize-app:latest
docker stop everysize-app && docker rm everysize-app || true
docker run \
    --detach \
    --name everysize-app \
    --publish-all \
    --env-file ~/.everysize-app.vars \
    --restart on-failure \
    --env VIRTUAL_HOST=everysize-app.kibalabs.com \
    --env LETSENCRYPT_HOST=everysize-app.kibalabs.com \
    registry.gitlab.com/kibalabs/everypage/everysize-app:latest
