/*Higher Order Functions
Agora que já especificamos o que são funções de primeira classe, vamos aprender sobre as Funções de Ordem Superior , conhecidas por Higher Order Functions ou HOF .
As HOFs são funções que usam outras funções em suas operações, devendo aceitá-las como parâmetro e/ou retorná-las. O mais incrível é que você já aplicou este conceito na prática. 
Veja este exemplo:*/

const button = document.querySelector('#signup-button');

const registerUser = () => {
  console.log('Registrado com sucesso!');
};

button.addEventListener('click', registerUser);

/*Construímos uma função que simula o registro de uma nova pessoa e passamos como argumento de uma segunda função. Logo, addEventListener é uma HOF.
Lembre-se: First-Class Functions é o nome do conceito que define a forma que a linguagem (no nosso caso JavaScript) trata suas funções, permitindo que sejam suportadas em operações que são usadas em outros tipos (atribuição, retorno, parâmetro), e HOF é uma função que atende ao critério de receber como parâmetro e/ou retornar outra função.
Agora que você viu o que são funções de primeira classe e sua aplicação em parâmetros, partiu saber como estruturar suas HOF ?*/