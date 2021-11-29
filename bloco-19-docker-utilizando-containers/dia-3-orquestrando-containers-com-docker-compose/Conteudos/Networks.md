## Networks - Redes no Docker ##

Anteriormente, vimos como "expor" as portas de nossos containers para acessá-los de fora, utilizando o parâmetro EXPOSE em nosso Dockerfile , e também como fazer a atribuição ( bind ) com as portas de nossa máquina host utilizando o parâmetro -p no docker container run . Chamamos de mapeamento de portas esses recursos que vinculam ou tornam visíveis portas do container para a nossa máquina localhost .

Já o Docker network , é uma espécie de rede virtualizada que permite que você conecte containers a uma determinada rede ou quantas redes Docker desejar, de forma que esses containers possam compartilhar informações através dessa rede.

Por padrão, o Docker possui 3 redes que são criadas junto com ele: *bridge , none e host* . Cada uma delas tem características específicas quanto a conectividade para seus containers . Podemos consultá-las executando:

  docker network ls

Vamos entender o que é cada uma!
