## O que vamos aprender?

Você vai relembrar alguns conceitos importantes sobre o que é o HTTP, além de entender o que é uma API e para que elas servem.
Você vai aprender como utilizar um dos mais famosos e importantes frameworks na construção de APIs com Node: o Express !
Você vai entender como ele funciona e como seu sistema de rotas e middlewares se encaixam para formar uma aplicação pronta para ir para a produção.

### Você será capaz de:
Entender o que é o HTTP, o que é uma API e o que os dois têm a ver com o Express
Escrever APIs utilizando Node e Express;
Entender a estrutura de uma aplicação Express e como organizar seu código;
Criar rotas e aplicar funções que processam requisições HTTP.

### Por que isso é importante?

O protocolo HTTP é a fundação da web moderna. Ele é a base da comunicação de boa parte do que acontece na web e, portanto, entender bem seu funcionamento é essencial para desenvolver boas aplicações web.

Inicialmente criado para transportar documentos e mensagens simples, o HTTP hoje é responsável pelo tráfego de todo tipo de informação na internet. Boa parte do que é enviado e recebido via HTTP são requisições e respostas a APIs HTTP . É sobre essas APIs que você aprenderá hoje.

APIs são pontos de comunicação entre dois sistemas diferentes, e APIs HTTP são as mais utilizadas para comunicação na web. Para ficar nítido, imagine que você precisa que seu Front-End consulte alguns dados do seu banco de dados. Não faz sentido colocar, por exemplo, o usuário e senha do banco no meio do seu JavaScript e criar uma conexão direta, faz? Se fizéssemos algo do tipo, estaríamos, dentre outras coisas, simplesmente expondo o acesso a todo nosso banco de dados a qualquer pessoa que executasse um "Inspecionar elemento" na página.

Mas então, como o Front-End se comunica com o banco de dados?

Entra no palco, o Back-End .

As APIs HTTP, que são o que forma o Back-End da maioria das aplicações web, são as responsáveis por ler os dados no banco e entregá-los para o Front-End, ou por receber dados do Front-End e armazená-los no banco de dados.

Inclusive, você já consumiu APIs HTTP em projetos como o Star Wars e o Online store, e agora chegou a hora de aprender a criar suas próprias APIs para que suas aplicações Front-End (sejam elas web, mobile, desktop ou de qualquer outro tipo) possam se comunicar com seu banco de dados e tomar proveito de regras que seu sistema venha a ter.

Um ponto importante sobre as APIs HTTP é que tudo o que está nelas é reutilizável por qualquer cliente . Se você cria um endpoint para cadastrar pessoas usuárias, por exemplo, todo o Front-End da sua aplicação vai consumir esse mesmo endpoint , não importa em qual aplicação seja usada (web ou mobile).

Utilizando APIs, fazemos ainda mais, com menos código!
