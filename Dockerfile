FROM node:16-alpine as builder
WORKDIR /storybook
COPY ./storybook/package.json ./
COPY ./storybook/package-lock.json ./
RUN npm i
COPY ./lerna.json /
COPY ./storybook/.storybook ./.storybook
COPY ./storybook/stories ./stories
ENV PRODUCTION=true
RUN npm run build-storybook

FROM nginx:alpine
COPY --from=builder /storybook/storybook-static /usr/share/nginx/html