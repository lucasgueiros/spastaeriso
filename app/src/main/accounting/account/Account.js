import './Account.css';
import React from 'react';
import SimplerLinkSelect from '../../../generics/SimplerLinkSelect.js';

class Account extends React.Component {

  render () {

    return (
      <div class-name="input">
        <div>
          <label htmlFor="name">Nome: </label>
          <input name="name" type="text" value={this.props.entity.name || ''} onChange={this.props.onChange} readOnly={!this.props.editing}></input>
        </div>
        <div>
          <label htmlFor="comment">Comentários: </label>
          <input name="comment" type="text" value={this.props.entity.comment || ''} onChange={this.props.onChange} readOnly={!this.props.editing}></input>
        </div>
        <div>
          <label htmlFor="created">Criada em: </label>
          <input name="created" type="date" value={this.props.entity.created || ''} onChange={this.props.onChange} readOnly={!this.props.editing}></input>
        </div>
        <div>
          <SimplerLinkSelect
            entity={this.props.entity.motherAccount || ""}
            prefix={this.props.prefix + "motherAccount"}
            onChange={this.props.onChange}
            editing={this.props.editing}
            optionsList={this.props.accountsOptionsList}/>
        </div>

      </div>
    );
  }

}

export default Account;
