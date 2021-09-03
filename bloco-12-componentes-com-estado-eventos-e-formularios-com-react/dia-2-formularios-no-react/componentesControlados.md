Componentes controlados

No JavaScript "tradicional", que vocês usavam nos primeiros blocos, você fez formulários, certo? Pois bem, se pergunte o seguinte: onde ficavam os dados que vocês inseriam nesses formulários? Os dados dos campos numéricos, de texto, select ... Eles não ficavam em nenhuma variável declarada por você certo?
Pois então! Se você reparar com um inspect , vai ver que os dados dos campos preenchidos sempre aparecem no próprio DOM quando inseridos. Você acredita que é aí que esses dados são salvos? Sim! No próprio DOM. Meio estranho, certo? Pensando numa aplicação React , onde nós salvaríamos os dados do nosso formulário? Pensando no formulário, lógico, como um componente.
... No Estado , correto?
Pois é! Como todos os dados que concernem os componentes do React, os dados de um formulário também devem ser salvos no Estado ! E eis o pulo do gato: a partir do momento que a informação do forms não é mais salva no próprio elemento, no DOM, mas no Estado do componente que o contém, passamos a dizer que esse elemento é um Componente Controlado!

No JavaScript "tradicional", que vocês usavam nos primeiros blocos, você fez formulários, certo? Pois bem, se pergunte o seguinte: onde ficavam os dados que vocês inseriam nesses formulários? Os dados dos campos numéricos, de texto, select ... Eles não ficavam em nenhuma variável declarada por você certo?
Pois então! Se você reparar com um inspect , vai ver que os dados dos campos preenchidos sempre aparecem no próprio DOM quando inseridos. Você acredita que é aí que esses dados são salvos? Sim! No próprio DOM. Meio estranho, certo? Pensando numa aplicação React , onde nós salvaríamos os dados do nosso formulário? Pensando no formulário, lógico, como um componente.
... No Estado , correto?
Pois é! Como todos os dados que concernem os componentes do React, os dados de um formulário também devem ser salvos no Estado ! E eis o pulo do gato: a partir do momento que a informação do forms não é mais salva no próprio elemento, no DOM, mas no Estado do componente que o contém, passamos a dizer que esse elemento é um Componente Controlado!

import React, { Component } from 'react'
import './Form.css'

class Form extends Component {
  constructor() {
    super();

    this.handleChange = this.handleChange.bind(this);

    this.state = {
      estadoFavorito: '',
    };
  }


  handleChange(event) {
    this.setState({
      estadoFavorito: event.target.value,
    });
  }

  render() {
    return (
      <div>
        <h1>Estados e React - Tecnologia fantástica ou reagindo a regionalismos?</h1>
        <form className="form">
          <label>
            Diga qual o seu Estado favorito! De React ou do Brasil, você decide! =)
              <textarea name="estadoFavorito" value={this.state.estadoFavorito} onChange={this.handleChange} />
          </label>
          <input
            type="number"
            name="idade"
          />
          <input
            type="checkbox"
            name="vaiComparecer"
          />
        </form>
      </div>
    );
  }
}

export default Form;

💡 Atenção! Essa nomenclatura, oficial do React, é confusa. Estamos dizendo aqui que o elemento do formulário é um componente controlado. Não estamos falando dos componentes React aqui, mas dos elementos que compõem o formulário! Cuidado para não confundir.
💡 A extensão do Google Chrome React Developer Tools é incrívelmente útil para se desenvolver aplicativos React! Não deixe de baixá-la.
Para fixar
1 - Crie um formulário com um campo select , dois inputs de tipo diferente, uma textarea e faça de um deles um componente controlado, ou seja, elementos do formulário controlados pelo Estado
2 - Baixe a React Developer Tools e veja, nela, o dado inserido no elemento controlado sendo salvo no Estado.
