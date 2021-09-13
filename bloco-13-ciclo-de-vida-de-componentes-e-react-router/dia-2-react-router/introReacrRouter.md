O que vamos aprender?

Até então, você aprendeu como criar aplicações React via:

composição de componentes;
gerenciamento de estado e de ciclo de vida de componentes;
captura de eventos no contexto de React .

Para inicializar sua aplicação React , você executa o comando npm start , acessa http://localhost:3000/ , e toda a interação com a aplicação se dá nessa URL .

Agora, você já parou para pensar em como prover navegação entre páginas em uma aplicação React ? Por exemplo:

suponha que, na página inicial de sua aplicação React , haja uma lista de produtos vendidos, e deseja-se que cada um desses produtos seja clicável, de forma que, uma vez clicado, seus detalhes sejam mostrados a quem usar sua aplicação. Como você levaria quem usa sua aplicação para ver esses detalhes?

como você provê a opção de voltar/avançar URL em sua aplicação React ?

como você disponibiliza a opção de poder favoritar URL em sua aplicação React ?

De forma a responder a essas perguntas, você aprenderá nesta aula como fazer uso de React Router , que permite tornar sua aplicação React navegável, e também, aprenderá a utilizar props.children que permite a você flexibilizar a lógica de um componente, garantindo que ele possa ser usado de várias formas e em vários contextos diferentes, sempre de forma legível e com sintaxe simples.
Você utilizará React Router Dom quase todos os dias dentro do front-end na Trybe daqui pra frente, então mantenha o foco!

Você será capaz de:

Utilizar o props.children para acessar os filhos de um componente React e interagir com eles;
Utilizar o componente BrowserRouter corretamente;
Criar links de navegação na aplicação com o componente Link ;
Criar rotas, mapeando o caminho da URL com o componente correspondente, via Route ;
Estruturar e organizar as rotas da sua aplicação com o componente Switch ;
Usar o componente Redirect pra alternar entre rotas.

Por que isso é importante?

Ao tornar sua aplicação React navegável, React Router possibilita uma melhor experiência para quem fizer uso de sua aplicação, criando páginas com estruturas sofisticadas e intuitivas. Além disso, a boa utilização da props.children é essencial no desenvolvimento de Apps complexos e reutilizáveis.
