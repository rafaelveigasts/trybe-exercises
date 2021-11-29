## Networks - Redes no Docker ##

Anteriormente, vimos como "expor" as portas de nossos containers para acessá-los de fora, utilizando o parâmetro EXPOSE em nosso Dockerfile , e também como fazer a atribuição ( bind ) com as portas de nossa máquina host utilizando o parâmetro -p no docker container run . Chamamos de mapeamento de portas esses recursos que vinculam ou tornam visíveis portas do container para a nossa máquina localhost .

Já o Docker network , é uma espécie de rede virtualizada que permite que você conecte containers a uma determinada rede ou quantas redes Docker desejar, de forma que esses containers possam compartilhar informações através dessa rede.

Por padrão, o Docker possui 3 redes que são criadas junto com ele: *bridge , none e host* . Cada uma delas tem características específicas quanto a conectividade para seus containers . Podemos consultá-las executando:

  docker network ls

Vamos entender o que é cada uma!


## Bridge ##

Ao ser iniciado, todo container é associado a uma rede e, caso uma rede não seja seja especificada explicitamente por nós, ele será associado a rede *Bridge* .

Todos os containers associados a essa rede poderão se comunicar via protocolo TCP/IP e, se soubermos o IP do container que queremos conectar, podemos enviar tráfego a ele. Porém, os IPs de um container são gerados automaticamente, por isso não é muito útil fazermos a conexão dessa forma, pois sempre que o container for reiniciado, o IP poderá mudar.

Uma maneira de fazermos a descoberta do IP automaticamente pelo nome, é utilizando a opção --link *.

  * No entanto, a própria documentação do Docker desencoraja seu uso e alerta que essa flag ( --link ) pode ser removida eventualmente.

Para fins didáticos, vamos ver como isso funciona, utilizando uma imagem busybox , mas mais adiante veremos a melhor alternativa para fazer isso.

Digite no terminal:

  docker container run -ti --name container1 busybox

  docker container run -ti --link container1 --name container2 busybox  

Agora, o container2 poderá se conectar no container1 . Para fazermos um teste simples, podemos fazer um ping no container1 , dentro do container2 , apenas digitando no terminal interativo do container2 :

* É bom ressaltar que a opção --link não é necessária para permitir que os serviços se comuniquem, pois, por padrão, qualquer serviço pode alcançar qualquer outro serviço a partir de seu IP . Os links apenas permitem definir apelidos extras pelos quais um serviço pode ser acessado de outro serviço.

⚠️ Dica: Perceba que nos exemplos utilizamos uma imagem chamada busybox , ela é uma suite que possui vários utilitários Unix, dessa forma é muito útil quando queremos explorar comandos como o ping para testes.

## Host ##

Ao associarmos um container a essa rede, ela passa a compartilhar toda stack de rede do host , ou seja, da máquina que roda o ambiente Docker . O uso desta rede é recomendada apenas para alguns serviços específicos, normalmente de infra, em que o container precisa desse compartilhamento. Caso contrário, a recomendação é evitá-la.


## None ##

Essa é uma rede que não possui nenhum driver associado. Dessa maneira, ao atribuir um container a ela, o mesmo ficará isolado. Ela é útil quando temos containers que utilizam arquivos para a execução de comandos ou para se comunicar, por exemplo, um container de backup ou que rode apenas um script localmente.
