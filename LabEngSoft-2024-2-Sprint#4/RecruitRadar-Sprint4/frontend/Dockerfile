# syntax=docker/dockerfile:1

ARG NODE_VERSION=20.17.0

FROM node:${NODE_VERSION}-alpine AS development

# Definir ambiente de produção por padrão
#ARG NODE_ENV=production
#ENV NODE_ENV $NODE_ENV

WORKDIR /code/frontend

COPY . /code/frontend

# Remover node_modules
RUN rm -rf node_modules

# Instalar dependências do Node.js
RUN yarn install

# Instalar TypeScript globalmente
RUN yarn global add typescript


RUN yarn global add expo-cli

# Compilar o TypeScript
# RUN yarn tsc


# Expor a porta do frontend
EXPOSE 8081
EXPOSE 19000
EXPOSE 19001
EXPOSE 19002

# Comando para iniciar o frontend mas deve se abrir o terminal do container e rodar o expo la dentro
CMD /bin/sh -c "while sleep 86000; do :; done"