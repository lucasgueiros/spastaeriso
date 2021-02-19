import {StandaloneTextField,StandaloneDateField,DateField,LinkSelect,NumberField,ListRelationView,StandaloneLinkSelect,StandaloneMultipleLinkSelect} from '../../../generics/all.js';
import axios from 'axios';
import React from 'react';

export default class AccountingBalance extends React.Component {
  state = {
    data: [],
    loading: true,
  }

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    axios.get('entries/balance').then((response) => {
      this.setState({
        data: response.data,
        loading: false
      });
    }, (error) => {
      console.log(error);
    });
  }
  render() {
    if(this.state.loading) {
      return <p>Carregando...</p>
    }
    return (
      <>
        <table>
          <thead>
            <th>Conta</th>
            <th>Saldo</th>
          </thead>
          <tbody>
            {
              this.state.data.map((row,index) => {
                return (
                  <tr>
                    <td>{row.account}</td>
                    <td>{row.balance}</td>
                  </tr>
                );
              })
            }
          </tbody>
        </table>
      </>
    );
  }

}

/*
@Lob
private byte[] image;*/
