import {StandaloneTextField,StandaloneDateField,DateField,LinkSelect,NumberField,ListRelationView,StandaloneLinkSelect,StandaloneMultipleLinkSelect} from '../../../old_generics/all.js';
import React from 'react';

export default class InventoryBalance extends React.Component {
  state = {
    data: [],
    loading: true,
  }

  constructor(props) {
    super(props);
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentDidMount() {
    this.props.http.get('inventoryMovements/balance').then((response) => {
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
            <th>Quantidade</th>
            <th>Unidade</th>
          </thead>
          <tbody>
            {
              this.state.data.map((row,index) => {
                return (
                  <tr>
                    <td>{row.input}</td>
                    <td>{row.quantity}</td>
                    <td>{row.unit}</td>
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
