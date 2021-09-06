import React from "react";
import PropTypes from 'prop-types';

class Endereco extends React.Component{
  render(){

    const { value, handleChange } = this.props

    return(
      <fieldset>
        <label>Endereço: 
          <textarea 
            name="endereco" cols="60" rows="2" maxLength="200" 
            style={
            {resize:'none',
            overflow:'hidden',}}
            type='text'
            value={value}
            onChange={handleChange}
            required
            >
          </textarea>
        </label>
      </fieldset>
    )
  }
}

Endereco.propTypes={
  value: PropTypes.any,
  handleChange: PropTypes.func,
}

export default Endereco;