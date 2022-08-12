# containerization-training

This repository holds the sources for the containerization training. 
This training will learn trainees to understand the fundementals of containerization with Docker.

## Training exercises

Additionally to the training slides in this repository we provide [training exercises](https://gepardec.github.io/containerization-training/) for the training, which cover the topics introduced in the training slides.

## AWS Training environment

We use AWS to provision a training envoíronment, which is based on this [git repository](https://github.com/Gepardec/train) which provides  
a [container image](https://github.com/Gepardec/train/pkgs/container/train) which uses Terraform to provision the training environment.
These [Github Pages](https://gepardec.github.io/train/) provide the documentation how our provisioning in AWS works.

The training environment can be created/destroyed with the following command, which has to be executed in the directory ```/aws```.
```
docker run --rm -it \
-v $(echo ~)/.aws:/root/.aws:ro \
-v $(pwd):/opt/train/workdir \
-v $(pwd)/bootstrap.sh:/opt/train/terraform/files/bootstrap/bootstrap.sh \
gepardec/train:latest [apply | destroy]
````

## Building

This presentation can be rendered as HTMl and PDF on Unix Hosts via nodejs, revealjs, deckjs and Docker.

`./make.sh` will render the HTMl and PDf slides.

### Apple M1/2 (ARM64)

The used decktape container image has no ARM plattform support for now, but works on ARM if you build it yourself. +
Set the the default conatienr image architecture via an environment variable `export DOCKER_DEFAULT_PLATFORM=linux/arm64`. +
Build the container image with `docker build --tag astefanutti/decktape:3.1.0 .` on your MAC and it will build the image for the `linux/arm64` architecture.

When we want to access the VM of a Docker-for-MAC then we need to use the container image of this [repository](https://github.com/justincormack/nsenter1) to be able to do that.

# contributions
- [Thomas Herzog](https://github.com/cchet)
- [Clemes Kaserer](https://github.com/ckaserer)