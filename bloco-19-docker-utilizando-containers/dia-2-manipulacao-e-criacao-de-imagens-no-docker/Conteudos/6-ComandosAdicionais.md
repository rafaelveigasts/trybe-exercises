## Dockerfile comandos adicionais ##

*LABEL*

Labels (Rótulos em português) são um mecanismo para atribuir "metadatas" (dados auxiliares) aos seus objetos Docker , como imagens e containers.

Com o parâmetro LABEL , é possível fazer essas definições em nosso Dockerfile .

A documentação oficial recomenda o uso de labels para organizar nossas imagens, registrar informações de licenças, anotar relacionamentos entre containers e outros componentes ou qualquer outras informações que façam sentido ao objetivo do container ou sua aplicação.
As informações são registradas seguindo o parâmetro de "chave e valor", e caso uma chave esteja repetida, a última sobrescreverá as anteriores:

  LABEL <KEY>=<VALUE>

É comum registrarmos o "maintener" da imagem, para um possível contato posterior para tirar dúvidas ou sugerir contribuições:

  LABEL maintener="John Doe <john.doe@trybe.com.br>"

Esse valor pode ser resgatado posteriormente através do comando docker inspect <CONTAINER ID || NAMES> , onde o valor estará no atributo Labels :


  "Labels": {
   "maintener": "John Doe <john.doe@trybe.com.br>"
}


*ENV*

Em ambientes de desenvolvimento de apps é muito importante o uso de Env ironment Variables (Variáveis de ambiente, em português)*, felizmente também podemos utilizá-las em nossos containers.

* Variáveis de ambiente são valores que são definidos dentro do escopo do sistema operacional, ou seja, são valores que estão disponíveis para todas as aplicações que estão instaladas dentro daquele SO .

No Dockerfile , podemos definir nossas variáveis durante a criação de nossa imagem utilizando o comando ENV :

  ENV <ENV NAME> <ENV VALUE>

Podemos utilizá-la, por exemplo, para setar o ambiente onde vamos rodar o app .

  ENV NODE_ENV production

Ao rodar nossos containers, também podemos passar variáveis, basta utilizar a tag --env ou -e :

  docker container run \
   --env myCat=fluffy \
   --env myName=johnDoe \
   <IMAGE NAME>

