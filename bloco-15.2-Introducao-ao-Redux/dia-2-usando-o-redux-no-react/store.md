store

Vamos passar pelas peças de uma configuração básica react-redux e começaremos pela store . Não se preocupe em testar os códigos nesse momento e sim em absorver como as peças funcionam em conjunto, você terá muitas oportunidades de praticar essa configuração com os exercícios do repositório que você clonou no inicio da aula de hoje .

Vamos pensar na criação de um arquivo src/store/index.js com o seguinte conteúdo:

import { createStore, combineReducers } from 'redux';
import rootReducer from '../reducers';

const store = createStore(rootReducer);

export default store;

A função createStore sempre receberá como parâmetro um rootReducer . Portanto, deve-se criar um rootReducer no arquivo src/reducers/index.js .

Dica: Para facilitar a utilização do Redux, recomendamos fortemente que você instale a extensão Redux Devtools . Se a extensão Redux Devtools não estiver instalada, a linha de configuração dela apresentará um erro no navegador.

Observe o código abaixo de uma store configurada com a extensão:

import { createStore, compose } from 'redux';
import rootReducer from '../reducers';

const store = createStore(rootReducer,
window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

export default store;
