FROM node:20-alpine as builder
WORKDIR /storybook
COPY ./storybook/package.json ./
COPY ./storybook/package-lock.json ./
RUN npm i
COPY ./lerna.json /
COPY ./storybook/.storybook ./.storybook
RUN mv ./.storybook/production.js ./.storybook/main.js
COPY ./storybook/storiesGenerator.js ./
COPY ./packages /packages
RUN mkdir ./stories
COPY ./storybook/stories/main.css ./stories
COPY ./storybook/stories/assets ./stories/assets
RUN node ./storiesGenerator.js
RUN npm run build-storybook
RUN rm -rf ./packages

FROM nginx:alpine
# COPY ./docker_nginx.conf /etc/nginx/default.conf
COPY --from=builder /storybook/storybook-static /usr/share/nginx/html