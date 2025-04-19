#!/bin/bash

# Função para verificar se o Docker está instalado
check_docker() {
    if ! command -v docker &> /dev/null; then
        echo "Docker não está instalado. Por favor, instale o Docker primeiro."
        exit 1
    fi
}

# Função para verificar se o Docker Compose está instalado
check_docker_compose() {
    if ! command -v docker-compose &> /dev/null; then
        echo "Docker Compose não está instalado. Por favor, instale o Docker Compose primeiro."
        exit 1
    fi
}

# Função para iniciar os containers
start_containers() {
    echo "Iniciando containers..."
    docker-compose up -d
}

# Função para parar os containers
stop_containers() {
    echo "Parando containers..."
    docker-compose down
}

# Função para verificar o status dos containers
status_containers() {
    echo "Status dos containers:"
    docker-compose ps
}

# Função para ver os logs dos containers
logs_containers() {
    echo "Logs dos containers:"
    docker-compose logs -f
}

# Menu principal
case "$1" in
    start)
        check_docker
        check_docker_compose
        start_containers
        ;;
    stop)
        check_docker_compose
        stop_containers
        ;;
    status)
        check_docker_compose
        status_containers
        ;;
    logs)
        check_docker_compose
        logs_containers
        ;;
    *)
        echo "Uso: $0 {start|stop|status|logs}"
        exit 1
        ;;
esac 