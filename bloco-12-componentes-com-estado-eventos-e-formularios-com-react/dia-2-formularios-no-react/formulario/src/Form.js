import React from "react";

class Form extends React.Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      textarea: '',
    }
  }

  handleChange(event){
    this.setState({
      textarea: event.target.value,
    })
  }
  render() {
    return (
      <div>
        <h1> Exercicio de fixação formulário</h1>
        <form>
          <label> Seu nome:
            <textarea 
            name="Estado Favorito" 
            value={ this.state.textarea}
            onChange={this.handleChange}></textarea>
          </label>
          <br/>
          <select></select>
        </form>
      </div>
    );
  }
}

export default Form;

// 1 - Crie um formulário com um campo select , dois inputs de tipo diferente, uma textarea e faça de um deles um componente controlado, ou seja, elementos do formulário controlados pelo Estado
// 2 - Baixe a React Developer Tools e veja, nela, o dado inserido no elemento controlado sendo salvo no Estado.
