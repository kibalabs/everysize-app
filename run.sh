#!/usr/bin/env bash
set -e -o pipefail

name="everysize-app"
url="${name}.kibalabs.com"
dockerImageName="docker.pkg.github.com/kibalabs/everysize-app/app"
dockerTag="latest"
dockerImage="${dockerImageName}:${dockerTag}"
version="$(git rev-list --count HEAD)"
varsFile=~/.${name}.vars

touch ${varsFile}

docker pull ${dockerImage}
docker stop ${name} && docker rm ${name} || true
docker run \
    --name ${name} \
    --detach \
    --publish-all \
    --restart on-failure \
    --env NAME=$name \
    --env VERSION=$version \
    --env VIRTUAL_HOST=$url \
    --env LETSENCRYPT_HOST=$url \
    --env-file ${varsFile} \
    ${dockerImage}
