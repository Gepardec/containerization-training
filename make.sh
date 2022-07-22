#!/bin/bash

####################### 
# READ ONLY VARIABLES #
#######################

readonly IMAGE_NAME=containerization-training-renderer
readonly PRESENTATION_NAME=Containerization-Training

#################### 
# GLOBAL VARIABLES #
####################

########## 
# SOURCE #
##########
set -ex

rm -rf docs
mkdir docs
docker build -t $IMAGE_NAME .
docker container rm -f $IMAGE_NAME >/dev/null
docker run -d --name $IMAGE_NAME $IMAGE_NAME
docker cp $IMAGE_NAME:/opt/revealjs/dist   docs/dist
docker cp $IMAGE_NAME:/opt/revealjs/plugin docs/plugin
docker cp $IMAGE_NAME:/opt/revealjs/src    docs/src

chmod -R 777 docs

docker container rm -f $IMAGE_NAME >/dev/null
docker run -d -p 8080:8080 --entrypoint=/opt/revealjs/src/bin/present.py --name $IMAGE_NAME $IMAGE_NAME 8080 
sleep 2
docker cp $IMAGE_NAME:/opt/revealjs/index.html docs/$PRESENTATION_NAME.html
#docker run --rm --net=host -t -v $(pwd):/slides astefanutti/decktape:3.1.0 reveal --size=1920x1080 --pause 2000 --load-pause 2000 http://localhost:8080/ docs/$PRESENTATION_NAME.pdf
docker container rm -f $IMAGE_NAME >/dev/null