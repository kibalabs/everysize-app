# Stage 1: build
FROM node:13.12.0-stretch as build

WORKDIR /app

# Install requirements
COPY package.json .
COPY package-lock.json .
RUN npm ci

# Build app
COPY . .
RUN npm run build

# Stage 2: Serve build files with nginx
FROM registry.gitlab.com/kibalabs/kiba/docker-images/app-serve:latest as console
COPY --from=build /app/dist /usr/share/nginx/html
