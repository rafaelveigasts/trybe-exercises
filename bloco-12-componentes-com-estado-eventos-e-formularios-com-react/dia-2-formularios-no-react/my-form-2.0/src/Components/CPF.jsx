import React from "react";
import PropTypes from 'prop-types';

class CPF extends React.Component{
  render(){

    const { value, handleChange } = this.props

    return(
      <fieldset>
        <label>CPF: 
          <textarea 
            name="cpf" cols="60" rows="2" maxLength="11" 
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

CPF.propTypes={
  value: PropTypes.any,
  handleChange: PropTypes.func,
}

export default CPF;