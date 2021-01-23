import './SimplerTransaction.css';
import React from 'react';
import axios from 'axios';
import SimplerLinkSelect from '../../../generics/SimplerLinkSelect.js';
import Entry from '../entry/Entry.js';

class SimplerTransaction extends React.Component {

  render() {
    if(Object.keys(this.props.entity).length === 0 && this.props.entity.constructor === Object){
      return null;
    }
    const litsEntries = this.props.entity.entries.map((entry,index) => {
      if(index===0) {
        return "";
      } else {
        return (
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <Entry
              entity={entry}
              prefix={this.props.prefix + "entries."+index+".account."}
              onChange={this.props.onChange}
              editing={this.props.editing}
              accountsOptionsList={this.props.accountsOptionsList}
              />
            <td></td>
          </tr>);
      }
    }

    );
    return (
      <>
        <tr>
          <td>
            <input
              name={this.props.prefix + "dateTime"}
              type="date"
              value={this.props.entity.dateTime ? this.props.entity.dateTime.split('T')[0] : '' || ''}
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
          <Entry
            entity={this.props.entity.entries[0]}
            prefix={this.props.prefix + "entries.0.account."}
            onChange={this.props.onChange}
            editing={this.props.editing}
            accountsOptionsList={this.props.accountsOptionsList}
            />
          <td>
            <input
              name={this.props.prefix + "description"}
              type="text"
              value={this.props.entity.description || ''}
              onChange={this.props.onChange}
              readOnly={!this.props.editing}></input>
          </td>
        </tr>
        {litsEntries}
      </>
    );
  }

}

export default SimplerTransaction;
