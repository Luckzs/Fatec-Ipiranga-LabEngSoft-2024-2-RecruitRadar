# syntax=docker/dockerfile:1

ARG NODE_VERSION=20.17.0

FROM node:${NODE_VERSION}-slim AS development

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

# Instalar Python, pip e dependências de compilação para o Debian
RUN apt-get update && apt-get install -y \
    python3 python3-pip python3-venv build-essential \
    && rm -rf /var/lib/apt/lists/*

# Criar um ambiente virtual para Python
RUN python3 -m venv /opt/venv

# Ativar o ambiente virtual para instalar as dependências dentro dele
ENV PATH="/opt/venv/bin:$PATH"

# Instalar dependências Python no ambiente virtual
RUN pip install --no-cache-dir -r src/database/pyscripts/requirements.txt

# ---------- Instalação manual do Google Chrome e ChromeDriver ---------- #

# Instalar o Google Chrome e outras dependências necessárias para o Selenium
RUN apt-get update && apt-get install -y \
    chromium chromium-driver fonts-noto \
    && rm -rf /var/lib/apt/lists/*

# Definir variáveis de ambiente para o Chrome e o ChromeDriver
ENV CHROME_BIN=/usr/bin/chromium \
    CHROME_DRIVER=/usr/bin/chromedriver \
    PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true

# ---------- Fim da instalação do Chrome e ChromeDriver ---------- #

# Instalar o OpenSSH Server para permitir a conexão remota ao container
COPY sshd_config /etc/ssh/
COPY entrypoint.sh ./

# Start and enable SSH
RUN apt-get update && apt-get install -y openssh-server \
    && echo "root:Docker!" | chpasswd \
    && chmod +x ./entrypoint.sh \
    && mkdir /var/run/sshd

EXPOSE 3000 2222 

# Definir argumentos para build
ARG NODE_ENV
ARG SECRET
ARG TYPEORM_CONNECTION
ARG TYPEORM_HOST
ARG TYPEORM_PORT
ARG TYPEORM_USERNAME
ARG TYPEORM_PASSWORD
ARG TYPEORM_DATABASE
ARG GMAIL_USER
ARG GMAIL_PASS

# Passar as variáveis de build como variáveis de ambiente
ENV NODE_ENV=${NODE_ENV}
ENV SECRET=${SECRET}
ENV TYPEORM_CONNECTION=${TYPEORM_CONNECTION}
ENV TYPEORM_HOST=${TYPEORM_HOST}
ENV TYPEORM_PORT=${TYPEORM_PORT}
ENV TYPEORM_USERNAME=${TYPEORM_USERNAME}
ENV TYPEORM_PASSWORD=${TYPEORM_PASSWORD}
ENV TYPEORM_DATABASE=${TYPEORM_DATABASE}
ENV GMAIL_USER=${GMAIL_USER}
ENV GMAIL_PASS=${GMAIL_PASS}

ENTRYPOINT [ "./entrypoint.sh" ]

# Comando para iniciar o servidor (ajuste conforme necessário)
# CMD ["yarn", "dev2"]
