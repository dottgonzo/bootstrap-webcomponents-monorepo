#!/bin/bash

version=$(cat packages/bundle/package.json | grep version|sed "s/.*: \"//g"|sed 's/",//g')

docker build -t dottgonzo/htmlbricks-storybook-docs:v$version . && docker push dottgonzo/htmlbricks-storybook-docs:v$version