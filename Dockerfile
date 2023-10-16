FROM node:20-alpine as builder
WORKDIR /storybook
COPY ./storybook/package.json ./
COPY ./storybook/package-lock.json ./
RUN npm i
COPY ./lerna.json /
COPY ./storybook/.storybook ./.storybook
COPY ./storybook/storiesGenerator.js ./
COPY ./packages /packages
RUN node ./storiesGenerator.js
RUN npm run build-storybook
RUN rm -rf ./packages

FROM nginx:alpine
# COPY ./docker_nginx.conf /etc/nginx/default.conf
COPY --from=builder /storybook/storybook-static /usr/share/nginx/html