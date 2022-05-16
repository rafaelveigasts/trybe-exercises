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

  // src/Interfaces/Frame.ts
  import { z } from 'zod';

  const FrameSchema = z.object({
    material: z.string(),
    color: z.string({
      required_error: 'Color is required',
      invalid_type_error: 'Color must be a string',
    }).min(3, { message: 'Color must be 3 or more characters long' }),
  });

  type Frame = z.infer<typeof FrameSchema>;

  export default Frame;
  export { FrameSchema };


Observe que não há muita diferença: temos um FrameSchema que é um objeto do zod , que contém justamente um material do tipo string e uma color , também string. A mesma coisa que nossa interface possuía anteriormente.

Além disso, a título de exemplo do uso do zod , nosso atributo color também possui erros personalizados no caso de não ser passado ( required_error ) ou de ser de um tipo incorreto ( invalid_type_error ), bem como uma validação de que deve possuir pelo menos 3 letras (no método min ). Dê uma olhadinha nos tipos disponíveis e nas validações que a biblioteca zod pode fazer 😁. https://github.com/colinhacks/zod#defining-schemas

Como o schema que o zod cria para validação não é um tipo do TypeScript, criamos esse tipo explícitamente utilizando o type MeuTipo = z.infer<typeof MeuSchema> . Nesse caso, para MeuTipo usamos Frame , que, mesmo sendo um type (e não uma interface), se comporta da mesma forma que nossa interface anteriormente criada. Já o MeuSchema é o frameSchema .

Agora que você já entendeu como ficou a criação da interface (ou tipo) da armação ( Frame ) com o zod , dê uma olhadinha em como ficou a interface (ou tipo) da lente ( Lens ):

  // src/Interfaces/Lens.ts
  import { z } from 'zod';

  const lensSchema = z.object({
    degree: z.number(),
    antiGlare: z.boolean(),
    blueLightFilter: z.boolean(),
  });

  type Lens = z.infer<typeof lensSchema>;

  export default Lens;
  export { lensSchema };


Observe que é bem semelhante. Passando o mouse por cima da palavra Lens na linha do export default Lens o vscode mostra a seguinte tipagem:

  // Tipo `Lens` inferido com base no `zod`
  type Lens = {
      degree: number;
      antiGlare: boolean;
      blueLightFilter: boolean;
  }

Com isso, temos o tipo de uma lente, que possui um grau, e que pode ou não ter antirreflexo e filtro de luz azul.

## Para fixar
Agora que você já tem nitidez sobre como construir uma interface usando zod . Suponhamos que você precise fazer uma interface referente a uma editora de livros. Pense sobre como você iria estruturar a interface Livro utilizando o zod . Quais campos seriam pertinentes e quais as validações precisariam ser implementadas?


  const FrameSchema2 = z.object({
    capa: z.string({
      required_error: 'Nome da capa é obrigatório',
      invalid_type_error: 'nome não pode ser vazio'
    }),
    paginas: z.number({
      required_error:'401',
      invalid_type_error:'numero de pagina não pode ser menor que 0'
    }),

  })

  type Frame2 = z.infer<typeof FrameSchema2>;
  export default Frame2;
  export { FrameSchema2 };