#!/usr/bin/env bash
set -e -o pipefail

envsubst '${SERVICE_NAME} ${VERSION}' < nginx.conf > /etc/nginx/nginx.conf

export KRT_NAME=$SERVICE_NAME
export KRT_VERSION=$VERSION

for assignment in $(env | grep "^KRT_"); do
  IFS='=' read -r name value <<< "$(echo -e "$assignment" | sed -e 's/^[[:space:]]*//' -e 's/[[:space:]]*$//')"
  echo "GLOBAL.$name = \"$value\";" >> /usr/share/nginx/html/runtimeConfig.js
done

nginx -g 'daemon off;'
