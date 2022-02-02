## O que vamos aprender?

Hoje você aprenderá o que é o JWT (JSON Web Token), por que utilizá-lo, sua importância, como criar uma API com autenticação JWT e cases de empresas que estão utilizando essa tecnologia!

### Você será capaz de:

Entender o que há por dentro de um token de autenticação e autorização;
Gerar tokens a partir de informações como login e senha;
Autenticar pessoas usuárias utilizando o token JWT.
Autorizar o acesso a rotas do Express, usando o token JWT.

### Por que isso é importante?

O JWT é, definitivamente, uma maneira inteligente de obter, com segurança, a identidade de um usuário!

Imagine que você tem uma aplicação em que você precisa verificar se a sessão de uma pessoa ainda está ativa, mesmo depois de ela ter desligado o computador/smartphone. E aí, como faz?

Você poderia usar cookies. Porém, usar cookies, atualmente, não é uma boa opção por várias razões: o usuário pode não aceitar seus cookies, você não tem controle de onde ele está rodando, o site fica mais pesado dependendo de qual cookie você está usando, etc.

Uma alternativa é usar o JWT , que te disponibiliza um token/hash/código criptografado que você pode enviar para uma API e validá-lo como preferir.

Além disso, essa tecnologia nos traz outros benefícios:

  1) Não utiliza banco de dados: usar o JWT implica menos consultas ao banco de dados, o que nos dá um tempo de resposta mais rápido. Caso você esteja usando serviços pagos, como o DynamoDB https://aws.amazon.com/dynamodb/ , que cobram por consulta, o JWT poderá reduzir os custos de consumo.

  2) Mais simples de usar (se você for cuidadoso): se seu projeto não tem uma arquitetura boa para administrar as sessões dos seus clientes, e seus princípios básicos de segurança não forem claros, o tempo de desenvolvimento usando JWT será bem mais rápido, considerando que você pode simplesmente usar alguma biblioteca existente.

  3) Utilizado em vários serviços: você pode ter um servidor de autenticação que lida com o login/cadastro para gerar o token para a pessoa usuária. A partir daí, você pode transitar seu token entre várias aplicações, sendo necessário logar apenas uma vez e logo depois estar logado em todas as outras aplicações do seu sistema. No Google, por exemplo, você loga uma única vez e pode usar serviços como Google Drive, Gmail, Google docs, Google fotos, etc. sem precisar logar novamente.