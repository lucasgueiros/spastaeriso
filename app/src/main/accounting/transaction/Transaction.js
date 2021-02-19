import './Transaction.css';
import React from 'react';
import Account from '../account/Account.js';
import SimplerLinkSelect from '../../../generics/SimplerLinkSelect.js';

class Transaction extends React.Component {

  render () {
    let accountSelect= '';
    if(this.props.entity._links) {
      accountSelect = <SimplerLinkSelect
        entity={this.props.entity._links.account}
        prefix={this.props.prefix + "_links.account."}
        onChange={this.props.onChange}
        editing={this.props.editing}
        optionsList={this.props.accountsOptionsList}/>;
    }
    return (
      <div class-name="transaction">
        <div>
          <label htmlFor={this.props.prefix + 'value'}>Valor total: </label>
          <input name={this.props.prefix + 'value'} type="number" value={this.props.entity.value || ''} onChange={this.props.onChange} readOnly={!this.props.editing}></input>
        </div>
        <div>
          <label htmlFor={this.props.prefix + 'modality'}>Modalidade: </label>
          <input name={this.props.prefix + 'modality'} type="text" value={this.props.entity.modality || ''} onChange={this.props.onChange} readOnly={!this.props.editing}></input>
        </div>
        <div>
          <label htmlFor={this.props.prefix + 'comment'}>Comentários: </label>
          <input name={this.props.prefix + 'comment'} type="text" value={this.props.entity.comment || ''} onChange={this.props.onChange} readOnly={!this.props.editing}></input>
        </div>
        {accountSelect}
      </div>
    );
  }
}

export default Transaction;
