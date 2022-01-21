## As camadas de Controller e Service

Hoje, você vai aprender duas camadas novas, que podem ser (e geralmente são) utilizadas de forma complementar à camada de Model.

Vamos falar sobre as camadas de Controllers e de Services .

Essas duas camadas são, respectivamente, responsáveis por (1) receber e tratar os dados da requisição e (2) aplicar as regras de negócio da aplicação antes que qualquer comunicação com o banco seja realizada. Dessa forma, o Model precisa fazer menos coisas, o que quer dizer que temos uma arquitetura que delimita mais as responsabilidades de cada camada, de forma que, caso precise alterar uma parte do código, a quantidade de lugares em que precisaremos mexer é menor, visto que camada tem sua responsabilidade bem delimitada.

Para entender melhor como estão organizadas as camadas dessa arquitetura, observe o diagrama abaixo:

<img src="architecture_layers.png" />

### Organização das Camadas

Sempre que utilizarmos os termos "camadas abaixo" ou "camadas acima", lembre-se dessa ordem para se orientar.

Continue a leitura para uma explicação mais aprofundada sobre controllers e services , e bons estudos! 😄
