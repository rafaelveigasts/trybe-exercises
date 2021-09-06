import React from "react";
import Cidade from "./Cidade";
import CPF from "./CPF";
import Email from "./Email";
import Endereco from "./Endereço";
import Estado from "./Estado";
import Radio from "./Radio";
import Username from "./Username";

class Forms extends React.Component {

  constructor(){
    super();
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      username: '',
      email:'',
      cpf:'',
      endereco: '',
      cidade: '', 
      estado:'',
      residencia:'',
    };
  }
  
  handleChange({target}){
    const { name } = target;
    const value = target.type==='checkbox'? target.checked : target.value;

    this.setState({
      [name]:value.toUpperCase(),
  })
};


  render() {
    return (
      <div>
        <Username value={this.state.username} handleChange={this.handleChange}/>

        <Email value={this.state.email} handleChange={this.handleChange} />

        <Endereco value={this.state.endereco} handleChange={this.handleChange} />

        <CPF value={this.state.cpf} handleChange={this.handleChange} />

        <Cidade value={this.state.cidade} handleChange={this.handleChange} />

        <Estado value={this.state.estado} handleChange={this.handleChange} />

        <Radio value={this.state.residencia} handleChange={this.handleChange} />
      </div>
    );
  }
}

export default Forms;

/* ignorando caracteres especiais, linha 26, fonte https://metring.com.br/javascript-substituir-caracteres-especiais
*/