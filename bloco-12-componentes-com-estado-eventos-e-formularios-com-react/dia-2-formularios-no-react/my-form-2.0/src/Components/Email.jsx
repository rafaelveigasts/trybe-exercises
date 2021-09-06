import React from "react";
import PropTypes from 'prop-types';

class Email extends React.Component{
  render(){

    const { value, handleChange } = this.props

    return(
      <fieldset>
        <label>Email: 
          <textarea 
            name="email" cols="60" rows="2" maxLength="50" 
            style={
            {resize:'none',
            overflow:'hidden',}}
            type='email'
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

Email.propTypes={
  value: PropTypes.any,
  handleChange: PropTypes.func,
}

export default Email;