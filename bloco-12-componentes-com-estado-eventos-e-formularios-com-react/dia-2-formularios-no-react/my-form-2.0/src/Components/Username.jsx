import React from "react";
import PropTypes from 'prop-types';

class Username extends React.Component{
  render(){

    const { value, handleChange } = this.props

    return(
      <fieldset>
        <label>Nome: 
          <textarea 
            name="username" cols="60" rows="2" maxLength="40" 
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

Username.propTypes={
  value: PropTypes.any,
  handleChange: PropTypes.func,
}

export default Username;