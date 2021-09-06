import React from "react";
import PropTypes from "prop-types";

class Radio extends React.Component {
  render() {
    return (
      <div>
        <label htmlFor="">
          Casa
          <input type="radio" name="radio" />
        </label> <br />
        <label htmlFor="">
          Apartamento
          <input type="radio" name="radio" id="" />
        </label><br />
        <label htmlFor="">
          Sítio
          <input type="radio" name="radio" id="" />
        </label>
      </div>
    );
  }
}

Radio.propTypes = {
  value: PropTypes.any,
  handleChange: PropTypes.func,
};

export default Radio;
