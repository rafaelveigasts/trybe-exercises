import React from "react";
import PropTypes from 'prop-types';

class Cidade extends React.Component{
  render(){

    const { value, handleChange } = this.props

    return(
      <fieldset>
        <label>Cidade: 
          <textarea 
            name="cidade" cols="60" rows="2" maxLength="28" 
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

Cidade.propTypes={
  value: PropTypes.any,
  handleChange: PropTypes.func,
}

export default Cidade;