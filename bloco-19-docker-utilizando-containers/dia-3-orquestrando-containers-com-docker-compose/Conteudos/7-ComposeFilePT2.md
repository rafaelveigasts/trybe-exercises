## Compose File - Parte II ## 

# Volumes

Assim como aprendemos a utilizar volumes executando nossos containers de maneira individual, conseguimos também utilizar volumes por meio do nosso arquivo compose .

Podemos definir nossos volumes da mesma maneira que fazemos com o comando docker container run , tanto como bind como da forma nomeada.

Podemos utilizar a forma mais extensa dele também, por exemplo:

version: "3.8"
services:
  web:
    image: nginx:alpine
    volumes:
      - type: volume
        source: mydata
        target: /data
        volume:
          nocopy: true
      - type: bind
        source: ./static
        target: /opt/app/static

  db:
    image: postgres:latest
    volumes:
      - "/var/run/postgres/postgres.sock:/var/run/postgres/postgres.sock"
      - "dbdata:/var/lib/postgresql/data"

volumes:
  mydata:
  dbdata: