#!/bin/bash

# Update and install minimal packages
sudo apt-get update -y
sudo apt-get install -y ansible git

# Clone the git repository holding the ansible resources
git -c http.version=HTTP/1.1 -c protocol.version=1 clone https://github.com/Gepardec/containerization-training.git /tmp/training

# Prepare environment with ansible
ansible-galaxy collection install -r /tmp/training/aws/requirements.yml 2>&1 | tee /tmp/ansible-collections.log
ansible-playbook /tmp/training/aws/playbook.yml 2>&1 | tee /tmp/ansible-playbook.log
