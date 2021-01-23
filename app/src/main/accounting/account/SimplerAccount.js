import './Account.css';
import React from 'react';
import axios from 'axios';

class Account extends React.Component {

  state = {
    datalist: [],
  };

  componentDidMount () {
    axios.get("accounts").then( (response) => {
      this.setState({
        datalist: response.data._embedded.accounts,
      });
    }, (error) => {
      console.log(error);
    })
  }

  render () {
    // ACCOUNT
    return (
      <div class-name="account">
        <div>
          <label htmlFor={this.props.prefix + 'name'}>Conta: </label>
          <input
            name={this.props.prefix + 'name'}
            type="text" value={this.props.entity.name || ''}
            onChange={this.props.onChange}
            readOnly={!this.props.editing}
            list="accounts-datalist"/>
          <datalist id="accounts-datalist">
            {this.state.datalist.map((account, key) =>
              <option key={key} value={account.name} />
            )}
          </datalist>
        </div>
        <div>
          <label htmlFor={this.props.prefix + 'type'}>Tipo da Conta: </label>
          <input name={this.props.prefix + 'type'} type="text" value={this.props.entity.type || ''} onChange={this.props.onChange} readOnly={!this.props.editing}></input>
        </div>
      </div>
    );
  }
}

export default Account;
