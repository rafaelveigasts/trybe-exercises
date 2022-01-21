## REST

Antes de começarmos, vamos entender a diferença entre REST e 

RESTful: RESTful é, basicamente, um web service que segue as regras definidas pelo padrão REST.

Pronto, agora vamos à definição formal:

  *Representational State Transfer (REST)*, em português Transferência de Estado Representacional, é um estilo de arquitetura de software, controlado pelo W3C , que define um conjunto de restrições a serem usadas para a criação de APIs.

Uma maneira interessante de explicar é a seguinte:

Imagine que você está em um jantar. Existem algumas coisas que você deveria fazer, como:

  Comer com a boca fechada;
  Não colocar os cotovelos na mesa;
  Usar os talheres corretamente;
  Não arrotar.

O REST deve ser visto da mesma forma: um conjunto de boas práticas. Quando você está construindo uma API, existem algumas normas que você deve seguir para ser "educado" (RESTful).

Para o REST, uma aplicação é um conjunto de recursos que podem ter seu estado representado de alguma forma. Ao consumir esses recursos, você está transferindo as informações sobre esse estado para o cliente (uma requisição GET , por exemplo) ou fazendo uma alteração nele (um POST , PUT ou DELETE ). Daí o nome Transferência de Estado Representacional , ou seja, estamos transferindo uma representação do estado de algum recurso.