Relembrando conceitos

Redux é uma biblioteca que pode ser utilizada com React , Angular , Vue , Ember e JavaScript puro, para dar só alguns exemplos. É muito comum o uso de Redux com React , apesar de serem ferramentas independentes .

Quando você utiliza Redux com algum UI framework ( User Interface Framework ), é comum usar alguma biblioteca para realizar a conexão ( binding ) entre o Redux e o framework . No caso do React , a biblioteca React Redux é quem faz essa conexão e pode ser instalada em sua aplicação através do comando:

npm install react-redux

React Redux é a biblioteca oficial para realizar a conexão entre React e Redux
Vamos relembrar alguns conceitos:

Store
É onde vamos armazenar todos os dados compartilhados da aplicação e é representado por um objeto JavaScript . O State é armazenado no Store do Redux .

Action
É um objeto JavaScript que representa alguma mudança/alteração que precisa acontecer no State .

Reducer
É uma função JavaScript que recebe o estado atual ( current state ) e a ação corrente ( current action ) e retorna um novo estado ( new state ). É responsabilidade dessa função decidir o que acontecerá com o estado dada uma ação( action ).

Dispatch
É uma função que envia uma ação ( action ) para processamento.


Configurando Redux com React
Agora que relembramos todos estes conceitos, podemos criar e configurar uma aplicação React que utilizará Redux .
Primeiro, criamos nossa aplicação React:

npx create-react-ap my-app

depois instalamos as dependencias

npm install --save redux react redux

redux é a biblioteca que possui a implementação do Redux ;
react-redux é a biblioteca que realiza a conexão entre o Redux e o React .
Agora, imagine que vamos implementar uma solução para salvar uma lista de itens que podem ser adicionados por quem utilizar a aplicação. Inicialmente esta lista estará vazia. A primeira coisa que precisamos fazer, ao implementar o Redux em nossa aplicação React, é criar a nossa fonte universal de estados, o Store .
