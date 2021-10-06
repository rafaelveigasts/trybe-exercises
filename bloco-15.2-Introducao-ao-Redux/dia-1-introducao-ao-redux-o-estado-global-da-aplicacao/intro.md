O que vamos aprender?
Hoje vamos aprender sobre uma biblioteca que possui ampla adoção entre as pessoas que desenvolvem em React . Essa biblioteca é o Redux . Ela é utilizada para ajudar no gerenciamento de estado. Vamos entender um pouco mais sobre o que é, como nasceu e como funciona o Redux .

Você será capaz de:
Criar uma Store para armazenar o estado de uma aplicação.
Utilizar Reducers e Actions para atualizar a Store

Por que isso é importante?

Como dito anteriormente, Redux é uma biblioteca com ampla adoção na comunidade React , além de contar com implementações que superam as fronteiras do JavaScript , como arquiteturas para desenvolvimento Android e iOS que se baseiam na estrutura de gerenciamento de estado que o Redux traz.

Imagine que você precisa transitar diversas informações entre os mais diversos componentes em React . Imagine também que estas informações descem níveis e mais níveis na hierarquia de componentes. Você concorda que esta manipulação, quando o estado é guardado por componente, é extremamente difícil? Suponha que você tenha um componente X que possui um dado que precisa ser repassado para um componente Y , que está 10 níveis abaixo da hierarquia de componentes. Você precisa passar esse dado para vários componentes no meio, sendo que nenhum deles precisa de tal informação! E se você passar o dado errado de um componente para outro no meio do caminho? Esse problema se chama prop threading (ou drilling), e é um dos problemas que o Redux ataca! 🚀

Quando você, enquanto pessoa que desenvolve software, passa a adotar uma abordagem como a do Redux , significa que você está levando a um outro nível a organização do seu código, endereçando a problemática do parágrafo acima, se preocupando em como transitar as informações entre os componentes e deixando seu código mais organizado e com maior confiabilidade.

