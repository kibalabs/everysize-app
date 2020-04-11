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
FROM nginx:1.17.9

WORKDIR /app

COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf.template .
COPY start.sh .

EXPOSE 80
CMD ["./start.sh"]
