FROM node:16

ARG VERSION_REVEALJS='4.1.2'

RUN apt update && \
    apt install -y --no-install-recommends \
    tree \
    git \
    bzip2 \
    bsdmainutils \
    apt-transport-https \
    ca-certificates \
    curl \
    gnupg \
    lsb-release

WORKDIR /opt/revealjs

RUN ln -s /usr/bin/nodejs /usr/bin/node && \
    git clone --shallow-submodules --recurse-submodules --branch ${VERSION_REVEALJS} https://github.com/hakimel/reveal.js.git /opt/revealjs && \
    git clone https://github.com/denehyg/reveal.js-menu.git /opt/revealjs/plugin/menu && \
    npm cache clean --force && \
    npm install -f 


ENV BREAK=no
ENV PYTHONUNBUFFERED=1
COPY . /opt/revealjs/src/
RUN chmod 777 /opt/revealjs/src/bin/*
