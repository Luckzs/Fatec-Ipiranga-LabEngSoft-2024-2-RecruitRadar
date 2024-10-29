#!/bin/sh
set -e

echo "EntryPoint Functioning"

# Inicia o servidor SSH
/usr/sbin/sshd || exit 1

# Executa o yarn dev2
exec yarn dev2