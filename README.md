# Training

This training is based on Docker, but since Docker has defined the initial specification of containerization, it is applicable to containerization itself, no matter what runtime is used.

The training covers the following containerization topics:

1. Introduction to Containerization  
We compare containerization to virtualization and discuss the advantages of containerization compared to virtualization.

2. Containerization Basics  
We discuss the Linux technologies such as namespaces, which are used by containerization and that a container is nothing but a isolated process on the host.

3. Creating Images  
We discuss what container images are, how they are set up, and how to build container images efficiently.

4. Container Volumes  
We discuss how to store persistent data of containers in volumes, how the volumes work, and how to use them efficiently.

5. Docker System Commands  
We discuss the system commands Docker provides, for instance for housekeeping.

6. Container Networking  
We discuss the container networking model, the different types of networks, and how to use container networks properly.

7. Docker-Compose  
We discuss composing multiple service with Docker-Compose.

The objective of this training is that trainees understand containerization with Docker and can use containerization in there daily work.

## Presentation

The presentation contains the theory behind containerization and we will work through it during the training. The presentation is based on revealjs and can be built via Docker as documented in [section](#build-presentation) 

## Training exercises

Additionally to the presentation we provide [training exercises](https://gepardec.github.io/containerization-training/) which we work trough during the training, and which provide a hands on of the covered topics of the presentation.

## Training environment

The training environment will be provided to by your trainer, and is used for hands on with Docker. You will connect to the environment via ssh, whereby the ssh public key will be provided to you, and is only valid for the provisioned environment during the training.

Connect to your environment.
```
ssh ubuntu@<PROVIDED_AWS_URI> -i <PROVIDED_PUBLIC_KEY>
```

Copy a directory to the environment.
```
scp -r <LOCAL_DIR_PATH> buntu@<PROVIDED_AWS_URI>:<REMOTE_PATH> -i <PROVIDED_PUBLIC_KEY>
```

Copy a directory from the environment.
```
scp -r buntu@<PROVIDED_AWS_URI>:<REMOTE_PATH> <LOCAL_DIR_PATH> -i <PROVIDED_PUBLIC_KEY>
```

# Trainer 

This section is for trainers only, and documents how to prepare for a training.

## Build Presentation

This presentation can be rendered as HTMl and PDF on Unix/Linux Hosts via Docker.

`./make.sh` will render the HTML and PDF slides.

### Apple M1/2 (ARM64)

The used `decktape` container image has no ARM64 platform support for now, but works on ARM if you build it yourself.  
Set the the default container image architecture via an environment variable `export DOCKER_DEFAULT_PLATFORM=linux/arm64`.  
Build the container image with `docker build --tag astefanutti/decktape:3.1.0 .` on your ARM based host, and it will build the image for the `linux/arm64` architecture.

## Provision an training environment in AWS

We use AWS to provision a training environment, which is based on this [git repository](https://github.com/Gepardec/train) which provides  
a [container image](https://github.com/Gepardec/train/pkgs/container/train) which uses Terraform to provision the training environment.
These [Github Pages](https://gepardec.github.io/train/) provide the documentation how our provisioning in AWS works.

All of the following commands must be executed in the `/aws` directory of this repository.  
You need Docker, an active AWS account and a set up AWS CLI on the host you want to provision the environment from.

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