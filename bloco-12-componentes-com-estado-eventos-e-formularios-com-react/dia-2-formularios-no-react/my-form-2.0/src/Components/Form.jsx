import React from "react";
import Username from "./Username";

class Forms extends React.Component {

  constructor(){
    super();
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      username: '',
    };
  }

  handleChange({target}){
    const { name } = target;
    const value = target.type==='checkbox'? target.checked : target.value;

    this.setState({
      [name]:value.toUpperCase(),
    })
  }

  render() {
    return (
      <div>
        <Username value={this.state.username} handleChange={this.handleChange}/>
      </div>
    );
  }
}

export default Forms;
