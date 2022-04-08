## Interfaces

As interfaces indicam o que nossos objetos irão ser, uma vez que é lá que definimos seus atributos.
Vamos começar criando uma interface para uma armação de óculos. Para manter o exemplo simples, a armação terá apenas um material e uma cor.
Vamos começar com uma simples definição de interface:

  // src/Interfaces/Frame.ts
  interface Frame {
    material: string,
    color: string,
  }

  export default Frame;


## Zod

Um ponto importante a se observar é que, por mais que o TypeScript garanta os tipos dos dados que utilizamos durante o desenvolvimento, ele não garante estes tipos durante a execução.

Num caso de uma API como a nossa, se dissermos que vamos receber no corpo da requisição um conteúdo do tipo Frame , o TypeScript vai deixar você acessar os atributos de acordo no seu código. Mas se por algum motivo uma requisição inválida for enviada, seu código vai quebrar durante a execução, pois você pode tentar acessar um valor inexistente ou com um tipo inválido.

Para que isto não aconteça é necessário que façamos validações dos tipos e valores ao recebermos as requisições. Entretanto, conforme a aplicação cresce, é inviável fazer cada validação de forma manual. Por isso vamos utilizar a biblioteca zod para definir nossas tipagens e se responsabilizar pela validação dos dados na camada de Service, que será vista mais adiante.

Você pode utilizar o zod, adicionando-o como uma depêndencia em seus projetos, através do comando npm install zod .

Dito isto, o código de nosso Frame vai ficar assim:

