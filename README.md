# containerization-training

This repository holds the sources for the containerization training. 
This training will learn trainees to understand the fundamentals of containerization with Docker.

## Training

This training is based on AWS, where w host training environment for trainees. So, all you need a shell and an internet access, the rest will be provided to you.

This training is based on Docker, but since Docker has defined the initial specification of containerization it is applicable to containerization itself, no matter what runtime you is used.

The training contains the following topics:

1. Introduction to Containerization  
We compare containerization to virtualization and discuss the advantages of containerization compared to virtualization.

2. Containerization Basics  
We discuss the Linux technologies such as namespaces, which are used by containerization and that a container is nothing but a isolated process on the host.

3. Creating Images  
We discuss what COntainer Images are, how they are setup, and how to build Container Images efficiently.

4. Container Volumes  
We discuss how to store persistent data of containers in volumes and how to use them efficiently.

5. Docker System Commands  
We discuss the system command Docker provide, for instance for housekeeping.

6. Container Networking  
We discuss the container networking model, the different types of networks we can use, and how to use them properly.

7. Docker-Compose  
We discuss composing multiple service with Docker-Compose.

The objective of this training is that trainees understand containerization with Docker and can use containerization in there daily work.

### Presentation

The presentation contains the theory behind containerization and we will work through it during the training. The presentation is based on revealjs and can be built via Docker as discussed in [section](#build-presentation) 

### Training exercises

Additionally to the presentation we provide [training exercises](https://gepardec.github.io/containerization-training/) which we work trough during the training, and which cover the topics discussed in the presentation.

### Training environment

The training environment will be provided to by your trainer, and is used for hands on with Docker. You will connect to the environment via ssh, whereby the ssh public key will be provided to you, and is only valid for the provisioned environment during the training.

With this command you connect to your environment.
```
ssh ubuntu@<PROVIDED_AWS_URI> -i <PROVIDED_PUBLIC_KEY>
```

With this command you can copy a directory to the environment.
```
scp -r <LOCAL_DIR_PATH> buntu@<PROVIDED_AWS_URI>:<REMOTE_PATH> -i <PROVIDED_PUBLIC_KEY>
```

With this command you can copy a directory to the environment.
```
scp -r buntu@<PROVIDED_AWS_URI>:<REMOTE_PATH> <LOCAL_DIR_PATH> -i <PROVIDED_PUBLIC_KEY>
```

## Trainer 

This section is for trainers only, and documents how to prepare for a training.

### Build Presentation

This presentation can be rendered as HTMl and PDF on Unix/Linux Hosts via Docker.

`./make.sh` will render the HTMl and PDf slides.

#### Apple M1/2 (ARM64)

The used `decktape` container image has no ARM64 platform support for now, but works on ARM if you build it yourself.  
Set the the default container image architecture via an environment variable `export DOCKER_DEFAULT_PLATFORM=linux/arm64`.  
Build the container image with `docker build --tag astefanutti/decktape:3.1.0 .` on your ARM based host, and it will build the image for the `linux/arm64` architecture.

### Provision an training environment in AWS

We use AWS to provision a training environment, which is based on this [git repository](https://github.com/Gepardec/train) which provides  
a [container image](https://github.com/Gepardec/train/pkgs/container/train) which uses Terraform to provision the training environment.
These [Github Pages](https://gepardec.github.io/train/) provide the documentation how our provisioning in AWS works.

All of the following commands must be executed in the `/aws` directory of this repository.  
You need Docker, an active AWS account and a setup AWS CLI on the host you want to provision the environment from.

Provision an training environment
```
docker run --rm -it \
-v $(echo ~)/.aws:/root/.aws:ro \
-v $(pwd):/opt/train/workdir \
-v $(pwd)/bootstrap.sh:/opt/train/terraform/files/bootstrap/bootstrap.sh \
gepardec/train:latest apply
````

De-provision an training environment
```
docker run --rm -it \
-v $(echo ~)/.aws:/root/.aws:ro \
-v $(pwd):/opt/train/workdir \
-v $(pwd)/bootstrap.sh:/opt/train/terraform/files/bootstrap/bootstrap.sh \
gepardec/train:latest destroy
````

## contributions
- [Thomas Herzog](https://github.com/cchet)
- [Clemes Kaserer](https://github.com/ckaserer)