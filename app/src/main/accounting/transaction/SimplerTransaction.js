import './SimplerTransaction.css';
import React from 'react';
import axios from 'axios';
import SimplerLinkSelect from '../../../generics/SimplerLinkSelect.js';

class SimplerTransaction extends React.Component {

  render() {
    if(Object.keys(this.props.entity).length === 0 && this.props.entity.constructor === Object){
      return null;
    }
    return (
      <>
        <tr>
          <td>
            <input
              name={this.props.prefix + "dateTime"}
              type="datetime-local"
              value={this.props.entity.dateTime ? this.props.entity.dateTime.slice(0,-3) : '' || ''}
              onChange={this.props.onChange}
              readOnly={!this.props.editing}></input>
          </td>
          <td>
            <SimplerLinkSelect
              entity={this.props.entity.type || {}}
              prefix={this.props.prefix + "type."}
              onChange={this.props.onChange}
              editing={this.props.editing}
              optionsList={this.props.typesOptionsList}/>
          </td>
          <td>
            <SimplerLinkSelect
              entity={this.props.entity.modality || {}}
              prefix={this.props.prefix + "modality."}
              onChange={this.props.onChange}
              editing={this.props.editing}
              optionsList={this.props.modalitiesOptionsList}/>
          </td>
          <td>
            <input
              name={this.props.prefix + "description"}
              type="text"
              value={this.props.entity.description || ''}
              onChange={this.props.onChange}
              readOnly={!this.props.editing}></input>
          </td>
        </tr>
      </>
    );
  }

}

export default SimplerTransaction;
