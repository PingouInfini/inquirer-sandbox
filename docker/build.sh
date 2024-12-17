#!/usr/bin/env bash

docker_connect() {
  # Vérifier si l'utilisateur est déjà connecté à Docker

  # Chemin du fichier de configuration Docker
  DOCKER_CONFIG_FILE="$HOME/.docker/config.json"

  # Vérification de l'existence du fichier de configuration
  if [ -f "$DOCKER_CONFIG_FILE" ]; then
      # Vérification des informations de login dans le fichier config.json
      AUTH_COUNT=$(jq '.auths | length' "$DOCKER_CONFIG_FILE")

      if [ "$AUTH_COUNT" -gt 0 ]; then
          return
      fi
  fi

  # Nom du fichier
  file="./docker/docker_password.txt"

  # Vérifier si le fichier commence par "#"
  if [[ $(head -n 1 "$file") == "#"* ]]; then
    # Demander le mot de passe à l'utilisateur
    # shellcheck disable=SC2162
    read -s -p "Veuillez entrer votre mot de passe pour Docker Hub: " password
    echo

    # Utiliser la commande "docker login" avec le mot de passe saisi
    echo "$password" | docker login --username=pingouinfinihub --password-stdin

  else
    # Le fichier ne commence pas par "#", utiliser cat pour lire le contenu
    # shellcheck disable=SC2002
    cat "$file" | docker login --username=pingouinfinihub --password-stdin
  fi
}

launch_build() {
  rm -rf ./context/dockerdist/*
  touch ./context/dockerdist/.gitignore

  mkdir -p ./context/dockerdist/inventories/ && cp -Rf ../inventories/* ./context/dockerdist/inventories/
  mkdir -p ./context/dockerdist/lib/ && cp -Rf ../lib/* ./context/dockerdist/lib/
  cp -Rf ../main.sh ./context/dockerdist/

  docker rmi $(docker image ls pingouinfinihub/inquirer-sandbox -q)

  docker build -t pingouinfinihub/inquirer-sandbox context

  docker tag pingouinfinihub/inquirer-sandbox pingouinfinihub/inquirer-sandbox:latest
  docker push pingouinfinihub/inquirer-sandbox:latest

  rm -rf ./context/dockerdist/*
  touch ./context/dockerdist/.gitignore
}

docker_connect
launch_build