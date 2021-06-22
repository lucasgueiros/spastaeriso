import React from 'react';

export default class DateTimeFieldWithNowButton extends React.Component{

  constructor(props) {
    super(props);
    this.setNow = this.setNow.bind(this);
  }

  setNow() {
    var today = new Date();
    today.setHours(today.getHours()-3);
    today = today.toJSON();
    this.props.onChange({
      target: {
          type: 'datetime-local',
          name: this.props.prefix + this.props.property,
          value: today
        }
      });
  }

  render() {

    let value = this.props.entity[this.props.property] || '';
    if(value.length > 19) {
      value = value.slice(0,19);
    }
    return (
      <>
        <input
          name={this.props.prefix + this.props.property}
          type="datetime-local"
          value={value}
          onChange={this.props.onChange}
          readOnly={!this.props.editing}>
        </input>
        <button
          onClick={this.setNow}>
        Agora
        </button>
      </>
    );
  }

}
