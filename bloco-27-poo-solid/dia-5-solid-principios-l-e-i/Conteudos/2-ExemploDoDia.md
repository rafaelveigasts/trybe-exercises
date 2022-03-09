## Exemplo do dia

### Contextualizando o exemplo

O seu time de desenvolvimento está trabalhando em um software que controla os acessos à API do seu serviço. Para validar todas as requisições recebidas de clientes, é utilizado um token de acesso, enviado pelo front .

Sua empresa cobra clientes por número de requisições, então você precisará registrar em um banco de dados a quantidade de vezes que um determinado token foi utilizado para acessar o serviço.

A infraestrutura utiliza um servidor MySQL, cuja implementação será apresentada logo adiante, e até então tudo funciona muito bem. Mas logo, logo será necessário utilizar um banco em memória, o redis .

Bom, vamos começar inicializando a arquitetura do nosso sistema.

