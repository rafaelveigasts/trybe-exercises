## O que vamos aprender?

Hoje você aprenderá o que é e como funciona uma operação assíncrona e entender também qual a sua importância no Node.js. Para isso, você irá rever duas formas de realizar operações assíncronas em JavaScript: callbacks e Promises, e quais as diferenças entre elas.Além disso, você verá como é feito input (leitura) e output (escrita) em arquivos localmente com Node.js!

Por último, você aprenderá como reescrever código que utiliza callbacks de forma que ele passe a utilizar Promises.

### Você será capaz de:

Realizar operações assíncronas utilizando callbacks;
Realizar operações assíncronas utilizando Promises;
Ler e escrever arquivos localmente com Node.js;
Escrever seus próprios scripts que criam e consomem Promises;
Reescrever código que usa callbacks para que use Promises.

### Por que isso é importante?
O JavaScript é uma linguagem single-threaded , ou seja, executa apenas uma operação de cada vez. Isso quer dizer que, quando temos uma operação demorada no código, toda vez que essa operação é executada, o JavaScript precisa esperar que ela termine antes de fazer qualquer outra coisa.
Para o navegador, isso significa travar até mesmo a renderização da tela e deixar o usuário sem ação nenhuma durante todo o tempo que essa operação demorar para ser completada. Para o servidor, isso quer dizer não conseguir processar nenhuma outra requisição até que determinada operação termine.

Sendo assim, para que possamos escrever aplicações com boa performance e um boa experiência para o usuário, é importante sabermos como realizar operações demoradas de forma assíncrona , ou seja, fora do contexto de execução do restante do JavaScript . Esse conhecimento pode ser, muitas vezes, a diferença entre escrever um código bom e performático e escrever um código que não funciona, ou é extremamente lento.
