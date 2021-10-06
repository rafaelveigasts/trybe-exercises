Entendendo actions, stores e reducers

Para facilitar o entendimento do funcionamento das actions , stores e reducers , podemos usar algumas analogias com o nosso dia-a-dia. Voltemos ao exemplo da padaria.

Se o Redux fosse uma padaria, a store seria o forno de assar pão, o reducer seria a pessoa que faz o pão, as actions seriam as responsabilidades de quem faz o pão e o (a) cliente seria a aplicação ou o componente (no caso do React) que precisasse de um serviço.

Para a padaria funcionar bem, é importante que cada pessoa e equipamento tenham suas responsabilidades bem definidas, sendo assim, suponhamos que o (a) cliente queira comprar pão.
Primeiramente ele (a) entra na padaria com a intenção de comprar o pão - isso poderia ser assimilado a uma action - ao requisitar pra quem faz o pão, a intenção é executada.

Logo após o pedido, a pessoa que faz o pão - que na nossa analogia é o reducer - vai até o forno ( store ) e finalmente retira um pão de lá. Note que agora o estado do forno mudou, ele possui um pão a menos; o pagamento é feito e o fluxo encerra!

Observe que durante todo o processo, cada agente cumpriu seu papel e não houve conflitos no processo! Exatamente para isso que o Redux foi desenvolvido assim, com as partes bem definidas.
Agora vamos criar uma pequena store e vamos acessá-la, retornando o estado que guardamos nela e criando uma action para alterá-lo.

Primeiro vamos criar e retornar a nossa store :

const store = Redux.createStore();

Uma store só funciona se passarmos uma função que será responsável por alterar os dados dela: o reducer . O reducer recebe como primeiro parâmetro um state, sendo que seu retorno substituirá o state da store . Para fins didáticos, iremos montar o reducer no mesmo arquivo, mas a boa prática é fazer em um arquivo separado.