import './Transaction.css';
import React from 'react';
import Account from '../account/Account.js';

class Transaction extends React.Component {

  render () {
    // ACCOUNT
    return (
      <div class-name="transaction">
        <div>
          <label htmlFor={this.props.prefix + 'value'}>Valor total: </label>
          <input name={this.props.prefix + 'value'} type="number" value={this.props.entity.value || ''} onChange={this.props.onChange} readOnly={!this.props.editing}></input>
        </div>
        <div>
          <label htmlFor={this.props.prefix + 'date'}>Data: </label>
          <input name={this.props.prefix + 'date'} type="date" value={this.props.entity.date || ''} onChange={this.props.onChange} readOnly={!this.props.editing}></input>
        </div>
        <div>
          <label htmlFor={this.props.prefix + 'modality'}>Modalidade: </label>
          <input name={this.props.prefix + 'modality'} type="text" value={this.props.entity.modality || ''} onChange={this.props.onChange} readOnly={!this.props.editing}></input>
        </div>
        <div>
          <label htmlFor={this.props.prefix + 'comment'}>Comentários: </label>
          <input name={this.props.prefix + 'comment'} type="text" value={this.props.entity.comment || ''} onChange={this.props.onChange} readOnly={!this.props.editing}></input>
        </div>
        <Account
          entity={this.props.entity.account || {}}
          prefix={this.props.prefix + "account."}
          editing={this.props.editing}
          onChange={this.props.onChange}/>

      </div>
    );
  }
}

export default Transaction;
