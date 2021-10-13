/* Exemplos guiados
Agora que já temos uma ideia de como o thunk funciona, vamos ver um exemplo que mostra o que ele faz na prática. Para isso, vamos montar um app. Primeiro, vamos começar um novo app em React. Crie um diretório e use o comando:

npx create-react-app doguinhos-app

Depois de terminar, vamos acessar o diretório do nosso novo app e instalar as dependências necessárias:

cd doguinhos-app
npm i redux react-redux

Dê uma olhada no código da aplicação e gaste um tempo entendendo o que está sendo feito aqui. Exceto a parte do thunk (que não está completa), você tem conhecimento sobre tudo.
Vamos começar pelo arquivo index.js , onde conectamos o Provider aos componentes do nosso App. */

// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import store from './store';

ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
  document.getElementById('root'),
);

// Também temos que verificar o arquivo do componente. Como esse nosso App vai apenas fazer uma requisição externa (um fetch ), só teremos um componente, o App.js . Nós estamos utilizando o mapStateToProps para trazer o resultado do fetch e o valor da variável isFetching , que está na store, e o mapDispatchToProps para que se envie a action ao clicar no botão.

// src/App.js
import React from 'react';
import { connect } from 'react-redux';
import { fetchDog } from './store';

function App({ isFetching, src, fetchDog }) {
  return (
    isFetching ? <p>Loading</p>
      : (
        <div style={{ width: 500 }}>
          <button
            style={{ display: 'block' }}
            onClick={fetchDog}
            type="button"
          >
            Novo Doguinho
          </button>
          <img style={{ width: '100%' }} src={src} alt="dog" />
        </div>
      )
  );
}

const mapStateToProps = (state) => ({
  src: state.imagePath,
  isFetching: state.isFetching});

const mapDispatchToProps = (dispatch) => ({
  fetchDog: () => dispatch(fetchDog())});

export default connect(mapStateToProps, mapDispatchToProps)(App);

// Por último, vamos copiar o arquivo que contém nossa store, action e reducer. Para fins didáticos estamos com tudo no mesmo arquivo, mas as boas práticas pedem que deixemos cada parte em um arquivo separado, tanto para manter o código mais fácil de ser lido, quanto para fazer da manutenção menos complexa.

// src/store/index.js
import { createStore } from 'redux';

const GET_IMAGE = 'GET_IMAGE';
const REQUEST_IMAGE = 'REQUEST_IMAGE';
const FAILED_REQUEST = 'FAILED_REQUEST';

function getImage(json) {
  return { type: GET_IMAGE, payload: json.message };
}

function requestDog() {
  return { type: REQUEST_IMAGE };
}

function failedRequest(error) {
  return { type: FAILED_REQUEST, payload: error };
}

export function fetchDog() {
  return (dispatch) => {
    dispatch(requestDog());
    return fetch('https://dog.ceo/api/breeds/image/random')
      .then((r) => r.json()
        .then(
          (json) => dispatch(getImage(json)),
          (error) => dispatch(failedRequest(error)),
        ));
  };
}

const initialState = {
  isFetching: false,
  imagePath: '',
  error: '',
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case REQUEST_IMAGE:
      return { ...state, isFetching: true };
    case GET_IMAGE:
      return { ...state, imagePath: action.payload, isFetching: false };
    case FAILED_REQUEST:
      return { ...state, error: action.payload, isFetching: false };
    default:
      return state;
  }
}

const store = createStore(reducer);

export default store;

// Agora, rode o npm start e depois disso clique no botão Novo Doguinho . Você irá se deparar com o seguinte erro:

/* Esse erro, Actions must be plain objects mostra algo que já nos foi ensinado anteriormente: actions precisam ser objetos puros, ou seja, não podem ser funções. Para usar actions que são funções nós precisamos de um middleware especial, e é aí onde se encaixa o thunk na arquitetura Redux .

Então podemos entender que o que aquele código de 14 linhas faz: ele nos permite usar funções (incluindo funções assíncronas) como actions.
Para vermos o app rodando corretamente, vamos instalar o pacote e alterar nosso código para utilizar o thunk corretamente. 

npm i redux-thunk

Após a instalação, devemos inserir o thunk em nossa aplicação. O código abaixo está com as linhas não-alteradas comentadas, perceba que para utilizar o thunk é preciso acrescentar poucas linhas.

Não se preocupe, pois esse conteúdo exige prática! Caso ainda tenha dúvidas sobre a necessidade ou o funcionamento do thunk , a aula ao vivo e o Slack estão à disposição para esclarece-las.

*/