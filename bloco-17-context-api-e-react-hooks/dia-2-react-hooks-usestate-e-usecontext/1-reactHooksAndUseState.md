O que vamos aprender?

Existem dois jeitos de se criar um componente React. Você pode definir uma classe que estende React.Component ou você pode definir uma função que retorna o que é renderizado.

Qual é a diferença entre essas duas formas? 

A classe te dá muito mais ferramentas , mas é mais complicada de se criar. Você pode definir estados, acessar contextos, usar métodos de ciclo de vida de componente etc. Mas você precisa, também, fazer bind nas funções que não forem arrow functions e que deseja passar como callbacks para outros componentes, além de ser necessário definir um construtor, caso você utilize estado ou métodos de ciclo de vida. Dessa forma, na hora de separar lógica em vários componentes e reutilizá-la, a complexidade da aplicação tende a aumentar muito rápido.

Assim sendo, por vezes seria ótimo fazer algo mais simples , como um componente funcional, mas utilizando estados, contextos e tudo o mais . Pois bem! Os React Hooks vêm pra resolver esses problemas! Com eles, fazer componentes complexos é mais simples , mais rápido e fica mais fácil de compartilhar e agrupar suas lógicas.

Você será capaz de:
Utilizar o React Hook useState;
Utilizar o React Hook useContext.

Por que isso é importante?

React Hooks são uma das mais modernas formas de se trabalhar lógicas complexas em componentes React. Eles têm adoção crescente na comunidade, resolvem problemas que a criação de componentes com classes traz e facilitam muito a vida de quem quer criar componentes, muitas vezes, mais simples. Eles são uma ferramenta fundamental para quem desenvolve ter em seu portfólio!

Conteúdos
Você já deve ter notado que sempre que uma nova aplicação React é criada, o App.js vem como um componente funcional e se você precisar usar um estado ou um ciclo de vida dentro dele, é necessário mudar todo seu componente pra classe, e junto com ela vinha constructor, super(), render(), this, binds... 😖
Não seria muito melhor se pudessemos deixar as classes de lado e usar uma função que fosse capaz de utilizar estados e ciclo de vida de forma simples e muito menos verbosa?? Com a chegada dos Hooks na versão 16.8.0 do React isso se tornou possível!
(ノಥ,_｣ಥ)ノ彡 React.Component 🗑
function ヾ(Ő‿Ő✿)