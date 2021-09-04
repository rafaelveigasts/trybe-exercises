import React from "react";

class Form extends React.Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      nome: "",
      idade: 0,
      email: "",
      checkbox: false,
    };
  }

  handleChange({ target }) {
    // descontruimos o event para acesso ao name e target
    const { name } = target;

    // para checkbox abaixo:
    const value = target.type === "checkbox" ? target.checked : target.value;
    this.setState({
      [name]: value, // aqui o nome da variável será o nome da chave do objeto
    });
  }
  render() {
    return (
      <div>
        <h1> Exercicio de fixação formulário</h1>
        <fieldset>
          <form>
            <label>
              {" "}
              Seu nome:
              <textarea
                name="nome" // esse name que vai pro this.state
                type="text"
                value={this.state.nome}
                onChange={this.handleChange}
              ></textarea>
            </label>
            <br />
            <label>
              {" "}
              Sua idade:
              <textarea
                name="idade"
                type="number"
                value={this.state.idade}
                onChange={this.handleChange}
              ></textarea>
            </label>
            <br />
            <label>
              {" "}
              Seu email:
              <textarea
                name="email"
                type="text"
                value={this.state.email}
                onChange={this.handleChange}
              ></textarea>
            </label>
            <br />
            <label>
              {" "}
              Você concorda com os termos e serviços?
              <input
                name="checkbox"
                type="checkbox"
                value={this.state.checkbox}
                onChange={this.handleChange}
              ></input>
            </label>
          </form>
        </fieldset>
      </div>
    );
  }
}

export default Form;

// 1 - Crie um formulário com um campo select , dois inputs de tipo diferente, uma textarea e faça de um deles um componente controlado, ou seja, elementos do formulário controlados pelo Estado
// 2 - Baixe a React Developer Tools e veja, nela, o dado inserido no elemento controlado sendo salvo no Estado.
