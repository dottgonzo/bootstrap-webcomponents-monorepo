FROM node:16-alpine as builder
ARG production=true
WORKDIR /storybook
COPY ./storybook /storybook
RUN npm i

FROM nginx:alpine
COPY --from=builder /storybook/storybook-static /usr/share/nginx/html