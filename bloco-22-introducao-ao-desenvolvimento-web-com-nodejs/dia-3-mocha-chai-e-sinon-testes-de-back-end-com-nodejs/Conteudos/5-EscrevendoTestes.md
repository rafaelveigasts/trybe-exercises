## Escrevendo testes

Para exemplificar o processo de escrita de código vamos retomar o exemplo com a função calculaSituacao , que vimos anteriormente.

O primeiro passo é compreender, através dos requisitos, a estrutura que desejamos ter e os comportamentos esperados. Já desenvolvemos esses pensamentos anteriormente, retomando-os temos:

Sobre a estrutura:

- Nossa função deverá receber um parâmetro "media";

- Responder com "reprovado" ou "aprovado".

Sobre os comportamentos esperados:

1 - Se passado um valor menor que 7 , por exemplo 4 , a resposta deve ser "reprovado" ; 2 - Se passado um valor maior que 7 , por exemplo 9 , a resposta ser "aprovado" ; 3 - E, não podemos esquecer do "OU", sendo assim, se passado 7 , a resposta deve ser "aprovado" ;

Essa estrutura é tudo o que precisamos para escrever nossos testes, antes mesmo de falarmos sobre código.

### Estruturando testes com o Mocha

O mocha é um framework de testes para JS, isso significa que ele nos ajuda a arquitetar os nossos testes, nos fornecendo a estrutura e interface para escrevermos os nossos testes.

Vamos começar pelos comportamentos. Da mesma forma como descrevemos os comportamentos acima, temos que fazê-lo nos testes para dizermos o que estamos testando naquela caso específico. Para isso, o mocha nos fornece duas palavras reservadas o describe e o it .

O describe nos permite adicionar uma descrição para um teste específico ou um grupo de testes. Já o it nos permite sinalizar exatamente o cenário de teste que estamos testando naquele ponto.

Relembrando os testes que escrevemos "na mão", o mocha substitui aqueles logs que utilizamos para descrever cada teste:

console.log('Quando a média for maior que 7, retorna "aprovado":');

Bora ver na prática como podemos fazer isso com a ajuda do mocha . Esse mesmo cenário 1 , utilizando describe para descrever o cenário ficaria assim:

describe('Quando a média for menor que 7', () => {
  //
});

Perceba que o describe aceita dois parâmetros: o primeiro é a descrição e o segundo uma função para executar o cenário de teste. Outro ponto de atenção é que não é necessário importar o mocha em nosso arquivo, suas palavras reservadas serão interpretadas quando executamos o testes, mas veremos mais adiante como fazê-lo.

Descrito nosso comportamento, vamos adicionar o que será testado de fato, ou seja, o que é esperado. Para isso, temos o it :

describe('Quando a média for menor que 7', () => {
  it('retorna "reprovado"', () => {
    //
  });
});

A sintaxe do it é bem semelhante à do describe : ela aceita uma string, qual o comportamento a ser testado, e uma função que executa os testes de fato.
