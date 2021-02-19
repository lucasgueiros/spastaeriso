import React from 'react';
import SimplerLinkSelect from '../../../../generics/SimplerLinkSelect.js';

class WorkingTime extends React.Component {

  render () {
    return (
      <tr>
        {this.props.children}
        <td>
          <SimplerLinkSelect
            entity={this.props.entity.functionaryFunction || ''}
            prefix={this.props.prefix + "functionaryFunction"}
            onChange={this.props.onChange}
            editing={this.props.editing}
            optionsList={this.props.optionsLists.functionaryFunctions || []}/>
        </td>
        <td>
          <div>
            <input
              name={this.props.prefix + "minutes"}
              type="number"
              value={this.props.entity.minutes || {}}
              onChange={this.props.onChange}
              readOnly={!this.props.editing}></input>
          </div>
        </td>
        <td>
          <div>
            <input name={this.props.prefix + "comment"} type="text" value={this.props.entity.comment || ''} onChange={this.props.onChange} readOnly={!this.props.editing}></input>
          </div>
        </td>
      </tr>
    );
  }
}

export default WorkingTime;
