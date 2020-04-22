#!/usr/bin/env bash
set -e -o pipefail

envsubst '${SERVICE_NAME} ${VERSION}' < nginx.conf.template > /etc/nginx/nginx.conf

export CRT_VERSION=$VERSION

for assignment in $(env | grep "^CRT_"); do
  IFS='=' read -r name value <<< "$(echo -e "$assignment" | sed -e 's/^[[:space:]]*//' -e 's/[[:space:]]*$//')"
  echo "GLOBAL.$name = \"$value\";" >> /usr/share/nginx/html/runtimeConfig.js
done

nginx -g 'daemon off;'
