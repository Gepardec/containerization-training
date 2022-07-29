#!/bin/bash

####################### 
# READ ONLY VARIABLES #
#######################

readonly IMAGE_NAME=containerization-training-renderer
readonly PRESENTATION_NAME=Containerization-Training
readonly OUTPUT_DIR=generated
#################### 
# GLOBAL VARIABLES #
####################

########## 
# SOURCE #
##########
set -ex

rm -rf ${OUTPUT_DIR}
mkdir ${OUTPUT_DIR}
docker build -t $IMAGE_NAME .
docker container rm -f $IMAGE_NAME >/dev/null
docker run -d --name $IMAGE_NAME $IMAGE_NAME
docker cp $IMAGE_NAME:/opt/revealjs/dist   ${OUTPUT_DIR}/dist
docker cp $IMAGE_NAME:/opt/revealjs/plugin ${OUTPUT_DIR}/plugin
docker cp $IMAGE_NAME:/opt/revealjs/src    ${OUTPUT_DIR}/src

chmod -R 777 ${OUTPUT_DIR}

docker container rm -f $IMAGE_NAME >/dev/null
docker run -d -p 8080:8080 --entrypoint=/opt/revealjs/src/bin/present.py --name $IMAGE_NAME $IMAGE_NAME 8080 
sleep 2
docker cp $IMAGE_NAME:/opt/revealjs/index.html ${OUTPUT_DIR}/$PRESENTATION_NAME.html
#docker run --rm --net=host -t -v $(pwd):/slides astefanutti/decktape:3.1.0 reveal --size=1920x1080 --pause 2000 --load-pause 2000 http://localhost:8080/ ${OUTPUT_DIR}/$PRESENTATION_NAME.pdf
docker container rm -f $IMAGE_NAME >/dev/null