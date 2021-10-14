provider

Para utilizarmos o estado compartilhado que o Redux provê, precisamos trabalhar o src/index.js para adicionarmos a configuração do Provider.

import React from 'react';
import ReactDOM from 'react-dom';
// o provider é o meio pelo qual disponibilizamos o store
// com os estados de toda a aplicação para todos os demais componentes
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import store from './store';

ReactDOM.render(
  <Provider store={ store }>
    <App />
  </Provider>,
  document.getElementById('root'),
);

Agora que você já entendeu a configuração dessas peças do react-redux, vamos assistir essa aula que mostra como integrar as peças em um outro tipo de aplicação.


Neste vídeo você viu como estruturar as peças do Redux que aprendemos no bloco anterior, só que agora utilizando o React. Caso você rode esta aplicação, ela ainda não irá funcionar, primeiro será necessário conectar todas as peças, o que veremos ainda neste bloco.


// src/actions/index.js
const addAssignment = (value) => ({ type: 'ADD_ELEMENT', value });

export default addAssignment;

// src/reducers/index.js
const INITIAL_STATE = [];

function listReducer(state = INITIAL_STATE, action) {
  switch(action.type) {
    case 'ADD_ELEMENT':
      return [...state, action.value];
    default:
      return state;
  }
}

export default listReducer;

Aqui, é importante sempre lembrar do caso default na declaração do switch . Apesar de não ser obrigatório, ele garante que não tenhamos um erro caso o reducer receba como parâmetro uma action inexistente. Se isso acontecer, todos os case serão pulados e a função vai cair no argumento default , que simplesmente retorna o estado como ele está. Garantimos que nosso estado não será alterado se uma action com um type que não conhecemos seja disparado para a store, mantendo assim a integridade do nosso estado global.


// src/store/index.js
import { createStore, combineReducers } from 'redux';
import listReducer from '../reducers';

const rootReducer = combineReducers({ listReducer });

const store = createStore(rootReducer);

export default store;

-------------------------

// src/App.js
import React from 'react';

function App() {
  return (
    <span> Hello, World </span>
  );
}

export default App;
---------------------------

// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import store from './store';

ReactDOM.render(
  <React.StrictMode>
    <Provider store = { store }>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);

Acesse a branch exercise-4 para praticar a criação do Provider. Você deverá visualizar o diretório missing_provider, essa é a nossa aplicação react-redux que precisará da implementação do provider . Siga o passo a passo do arquivo README.md .

git checkout exercise-4


