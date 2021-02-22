import {StandaloneTextField,StandaloneDateField,DateField,LinkSelect,NumberField,ListRelationView,StandaloneLinkSelect,StandaloneMultipleLinkSelect} from '../../../generics/all.js';
import axios from 'axios';
import React from 'react';

export class InputsAvgPrice extends React.Component {
  state = {
    data: [],
    loading: true,
  }

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    axios.get('purchaseItems/balance').then((response) => {
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
            <th>Insumo</th>
            <th>Unidade</th>
            <th>Preço médio/U</th>
          </thead>
          <tbody>
            {
              this.state.data.map((row,index) => {
                return (
                  <tr>
                    <td>{row.input}</td>
                    <td>{row.unit}</td>
                    <td>{row.avgPrice}</td>
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
