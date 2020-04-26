#!/usr/bin/env bash
set -e -o pipefail

name="everysize-app"
url="${name}.kibalabs.com"
dockerImageName="registry.gitlab.com/kibalabs/everypage/everysize-app"
dockerTag="latest"
dockerImage="${dockerImage}:${dockerTag}"

docker pull $dockerImage
docker stop ${name} && docker rm ${name} || true
docker run \
    --detach \
    --name ${name} \
    --publish-all \
    --env-file ~/.${name}.vars \
    --restart on-failure \
    --env VERSION=$(git rev-list --count HEAD) \
    --env VIRTUAL_HOST=$url \
    --env LETSENCRYPT_HOST=$url \
    $dockerImage
