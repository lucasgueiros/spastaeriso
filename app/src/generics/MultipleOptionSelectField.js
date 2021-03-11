import React from 'react';

export default class MultipleOptionSelectField extends React.Component {

  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }

  onChange(event) {
    const target = event.target;
    const value = target.checked;
    const name = target.name;

    this.props.manyToManyChange(this.props.prefix + this.props.property, name, value);
  }
  render () {

    let value = this.props.entity[this.props.property];
    if(value == undefined) {
      value = [];
    }
    return (
      <>
        {
          this.props.options.map((entity, key) =>
            <div>
              <input
                name={entity.value}
                type="checkbox"
                checked={value.includes(entity.value)}
                onChange={this.onChange}/> {entity[this.props.nameField || 'name']}
            </div>)
        }
      </>
    );
  }

}
