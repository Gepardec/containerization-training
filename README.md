# containerization-training

This repository holds the sources for the containerization training. 
This training will learn trainees to understand the fundementals of Containerization via Docker.

## Building

This presentation can be rendered as HTMl and PDF on Unix Hosts via nodejs, revealjs, deckjs and Docker.

`./make.sh` will render the HTMl and PDf slides.

## Apple M1/2 (ARM64)

The used decktape container image has no ARM plattform support for now, but works on ARM if you build it yourself. +
Set the the default conatienr image architecture via an environment variable `export DOCKER_DEFAULT_PLATFORM=linux/arm64`. +
Build the container image with `docker build --tag astefanutti/decktape:3.1.0 .` on your MAC and it will build the image for the `linux/arm64` architecture.

When we want to access the VM of a Docker-for-MAC then we need to use the container image of this [repository](https://github.com/justincormack/nsenter1) to be able to do that.

# contributions
- [Thomas Herzog](https://github.com/cchet)

See [here](https://gepardec.github.io/containerization-training/) for the Containerization Training exersices