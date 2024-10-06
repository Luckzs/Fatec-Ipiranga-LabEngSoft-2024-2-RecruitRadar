# syntax=docker/dockerfile:1

# Comments are provided throughout this file to help you get started.
# If you need more help, visit the Dockerfile reference guide at
# https://docs.docker.com/go/dockerfile-reference/

# Want to help us make this template better? Share your feedback here: https://forms.gle/ybq9Krt8jtBL3iCk7

ARG NODE_VERSION=20.17.0

FROM node:${NODE_VERSION}-alpine AS development

# set our node environment, either development or production
# defaults to production, compose overrides this to development on build and run
#ARG NODE_ENV=production
#ENV NODE_ENV=$NODE_ENV

WORKDIR /code/backend

# Copiar os arquivos do projeto para o container
COPY . /code/backend

RUN rm -rf node_modules

# Instalar dependências do Node.js
RUN yarn install

# Instalar TypeScript globalmente
RUN yarn global add typescript

# Compilar o TypeScript
RUN yarn tsc

# Instalar dependências Python (caso necessário)
RUN apk add --no-cache python3 py3-pip

# Criar um ambiente virtual para Python
RUN python3 -m venv /opt/venv

# Ativar o ambiente virtual e instalar as dependências
RUN . /opt/venv/bin/activate && pip install --no-cache-dir -r src/database/pyscripts/requirements.txt

# Adicionar o ambiente virtual ao PATH para que seja usado por padrão
ENV PATH="/opt/venv/bin:$PATH"

# Comando para iniciar o servidor
#CMD ["yarn", "dev2"]
#RUN yarn dev2

# Expor a porta usada pela aplicação
EXPOSE 3000
