reducer e rootReducer

Como dito anteriormente, a função createStore precisa receber como parâmetro um rootReducer , que por sua vez recebe todos os reducers da aplicação como um objeto no parâmetro da função combineReducers .

Arquivo myReducer.js dentro do diretório reducers:

const INITIAL_STATE = {
  state: '',
};

function myReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'NEW_ACTION':
      return { state: action.state };
    default:
      return state;
  }
}

export default myReducer;

Arquivo index.js dentro do diretório reducers:

import { combineReducers } from 'redux';
import myReducer from './myReducer';

const rootReducer = combineReducers({ myReducer });

export default rootReducer;

import { combineReducers } from 'redux';
import myReducer from './myReducer';

const rootReducer = combineReducers({ myReducer });

export default rootReducer;

O método combineReducers que, como diz seu nome, combina reducers , deve receber um objeto com os reducers criados. Sem ele, só poderíamos usar um reducer em nossa aplicação.

Dica: Mesmo que tenhamos apenas um reducer é uma boa prática que utilizemos o combineReducers , pois caso nossa aplicação cresça e necessite de mais de um reducer não será necessário alterar sua lógica.

Vamos analisar o que está acontencedo:

Primeiro, definimos um estado inicial para nosso reducer;
Um reducer deve receber como parâmetro um estado e uma ação;
A ação, por convenção, deve ser um objeto e possuir a key type . É essa key que define como o reducer vai manipular o estado.
Então combinamos os reducers dentro do arquivo contendo o rootReducer.

Acesse a branch exercise-2 para praticar a criação do reducer e do rootReducer. Você deverá visualizar o diretório missing_reducers, essa é a nossa aplicação react-redux que precisará da implementação do reducer e do rootReducer . Siga o passo a passo do arquivo README.md .