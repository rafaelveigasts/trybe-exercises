## Desinstalando o Docker Engine ##

Caso você queira ou precise remover completamente o motor do Docker do seu computador, utilize o seguinte comando no terminal:

sudo apt-get purge docker-ce docker-ce-cli containerd.io

Para remover containers , volumes (que veremos nas próximas aulas) e configurações personalizadas que não são removidas automaticamente pelo apt-get , utilize os seguintes comandos:

sudo rm -rf /var/lib/docker
sudo rm -rf /var/lib/containerd

