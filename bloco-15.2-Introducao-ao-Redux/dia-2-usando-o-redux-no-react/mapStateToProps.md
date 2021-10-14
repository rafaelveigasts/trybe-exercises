mapStateToProps

Ao implementar os componentes é preciso conectá-los ao Redux . Primeiramente é preciso importar e adicionar os componentes à página que precisará renderizar os mesmos.

import React from 'react';
import FirstComponent from './FirstComponent';
import SecondComponent from './SecondComponent';

class App extends React.Component {
  render() {
    return (
      <div>
        <FirstComponent />
        <SecondComponent />
      </div>
    );
  }
}

export default App;

Agora vamos analisar a implementação do componente FirstComponent :


import React from 'react';
import { connect } from 'react-redux';

class FirstComponent extends React.Component {
  render() {
    return (
      <div>
        <div>
          {this.props.myFirstState.map((element,index) => (
            <p key={ index }>{element}</p>
          ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  myFirstState: state.myReducer.state});

export default connect(mapStateToProps, null)(FirstComponent);

OBS: O método connect()() é utilizado para conectar o componente a store do Redux. Não se preocupe, pois iremos falar mais sobre ele no próximo tópico.

Vamos analisar o que está acontecendo:

Estamos fazendo um map com os elementos presentes no array myFirstState que, por sua vez, está presente nas props . Mas como isso foi parar lá?

A função mapStateToProps , auto-descritiva, mapeia as entidades armazenadas nos estados para uma props .

No nosso caso, queremos acessar os dados providos pelo reducer myReducer , portanto basta acessar o caminho do state com o reducer desejado e nomear a prop que o receberá (no caso, chamamos de myFirstState ).

Por último, como foi dito anteriormente, utilizamos o connect para conectar o Redux ao componente. Esse método possui o seguinte formato: connect()() . Como no caso estamos fazendo apenas leitura dos dados, basta passar a função mapStateToProps no primeiro parênteses e o componente no segundo.

Acesse a branch exercise-5 para praticar a criação do mapStateToProps. Você deverá visualizar o diretório missing_mapstatetoprops, essa é a nossa aplicação react-redux que precisará da implementação do mapStateToProps . Siga o passo a passo do arquivo README.md .

Para fixar

git checkout exercise-5
