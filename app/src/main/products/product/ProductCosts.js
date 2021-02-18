import {StandaloneTextField,StandaloneDateField,DateField,LinkSelect,NumberField,ListRelationView,StandaloneLinkSelect,StandaloneMultipleLinkSelect} from '../../../generics/all.js';
import Item from '../../recipeBook/recipe/item/Item.js';
//import http from '../../../http.js';
import axios from 'axios';
import React from 'react';

export default class ProductCosts extends React.Component {
  state = {
    data: [],
    loading: true,
  }

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    axios.get('products/costs').then((response) => {
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
            <th>Produto</th>
            <th>Preço</th>
            <th>Custo</th>
          </thead>
          <tbody>
            {
              this.state.data.map((row,index) => {
                return (
                  <tr>
                    <td>{row.product}</td>
                    <td>{row.price}</td>
                    <td>{row.cost}</td>
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
