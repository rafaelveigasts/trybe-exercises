import React from "react";
import Checkbox from "./Checkbox";
import SeuEmail from "./SeuEmail";
import SeuNome from "./Seunome";
import SuaIdade from "./SuaIdade";

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
            <SeuNome value={this.state.nome} handleChange={this.handleChange} />
            <SuaIdade value={this.state.idade} handleChange={this.handleChange} />
            <SeuEmail value={this.state.email} handleChange={this.handleChange}/>
            <Checkbox value={this.state.checkbox} handleChange={this.handleChange}/>
          </form>
        </fieldset>
      </div>
    );
  }
}

export default Form;

// 1 - Crie um formulário com um campo select , dois inputs de tipo diferente, uma textarea e faça de um deles um componente controlado, ou seja, elementos do formulário controlados pelo Estado
// 2 - Baixe a React Developer Tools e veja, nela, o dado inserido no elemento controlado sendo salvo no Estado.
