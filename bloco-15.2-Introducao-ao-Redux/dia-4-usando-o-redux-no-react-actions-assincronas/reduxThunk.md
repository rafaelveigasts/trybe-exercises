redux-thunk

A solução padrão recomendada na documentação do Redux para se ter actions assíncronas é via uso do pacote redux-thunk https://github.com/reduxjs/redux-thunk . Fun-fact: a lógica desse pacote se encontra em um arquivo https://github.com/reduxjs/redux-thunk/blob/master/src/index.js .js com 14 linhas de código, e é usado por aproximadamente 480.000 repositórios. Olha o que 14 linhas de código conseguiram prover para a comunidade. Que sirva de inspiração para todos nós! 🙂


Vamos reforçar, a seguir, os conceitos pricipais do redux-thunk :

redux-thunk é um middleware que, no contexto de uma aplicação Redux , nada mais é que um interceptador que captura todas as actions enviadas pela store antes delas chegarem a um reducer . 
Ou seja, fazendo analogia com pedido online de produto, se a action fosse o produto que você comprou em algum site, e o reducer fosse você, o middleware seria o correio, que intercepta o produto antes de chegar até você para garantir que ele chegue como se deve. Depois, se quiser ler mais sobre middlewares , acesse o Redux - Middleware na sessão de recursos adicionais.

Para fazer uso do redux-thunk , é preciso instalá-lo via npm :

npm install redux-thunk

Para habilitar o uso dele na sua aplicação, é preciso fazer uso da função applyMiddleware() do Redux :

// arquivo onde a redux store é criada
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from '/path/to/your/root/reducer';

...

const store = createStore(reducer, applyMiddleware(thunk));
...

thunk nada mais é do que uma função que encapsula uma operação para que ela seja feita posteriormente. 
Em termos práticos, isso significa que você está definindo uma função que vai ser retornada por uma outra função com mais lógica adicionada a ela. Se tiver curiosidade sobre o que é um "thunk", de forma geral, leia What the heck is a 'thunk'?, por Dave Ceddia na sessão de recursos adicionais.

Com redux-thunk , você consegue definir uma action creator que retorna uma função (que será invocada pelo redux-thunk ) em vez de retornar somente um objeto (o que você tem feito até a aula de hoje) . 

Na função retornada você pode realizar uma operação assíncrona, como fazer chamadas de API e, uma vez finalizada a operação, você consegue enviar uma action com os dados obtidos por ela, da mesma forma que tem feito até então. 

Note a conveniência que isso traz: toda essa lógica de lidar com operações assíncronas está encapsulada na sua respectiva action assíncrona, deixando transparente para quem for fazer uso dela, que para o seu caso seriam os componentes React ! Sob a perspectiva do componente, ele estaria consumindo uma action como uma outra qualquer!

Para ser devidamente usada pelo redux-thunk a action creator precisa retornar uma função, que pode fazer uso de dispatch e getState da store como parâmetros. Segue um exemplo de uma action creator definida em conformidade com tal contrato:

export const REQUEST_MOVIES = 'REQUEST_MOVIES';
export const RECEIVE_MOVIES = 'RECEIVE_MOVIES';

// action creator que retorna um objeto, que você tem feito até então
const requestMovies = () => ({
  type: REQUEST_MOVIES});

// outro action creator que retorna um objeto, que você tem feito até então
const receiveMovies = (movies) => ({
  type: RECEIVE_MOVIES,
  movies});

// action creator que retorna uma função, possível por conta do pacote redux-thunk
export function fetchMovies() {
  return (dispatch) => { // thunk declarado
    dispatch(requestMovies());
    return fetch('alguma-api-qualquer.com')
      .then((response) => response.json())
      .then((movies) => dispatch(receiveMovies(movies)));
  };
}

// componente onde você usaria a action creator fetchMovies assíncrona como uma outra qualquer
...
class MyConectedAppToRedux extends Component {
  ...
  componentDidMount() {
    const { dispatch, fetchMovies } = this.props;
    dispatch(fetchMovies()); // enviando a action fetchMovies
  }
  ...
}
...

OBS : é possível passar também um terceiro argumento para a função retornada. Para ver como fazer isso, leia esta seção do repositório do redux-thunk .
Em síntese, um thunk nada mais é do que uma action que, quando despachada, faz uma requisição assíncrona e aguarda o resultado da requisição, podendo disparar uma ação em caso de sucesso (tratando as informações recebidas) ou disparando outra ação em caso de falha para buscar a informação.