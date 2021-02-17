import './SimplerTransaction.css';
import React from 'react';
import axios from 'axios';
import {LinkSelect,InListRelationView} from '../../../generics/all.js';
import Entry from '../entry/Entry.js';

class SimplerTransaction extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <tr>
          {this.props.children}
          <td>
            <input
              name={this.props.prefix + "date"}
              type="date"
              value={this.props.entity.date ? this.props.entity.date : '' || ''}
              onChange={this.props.onChange}
              readOnly={!this.props.editing}></input>
          </td>
          <td>
          <LinkSelect {...this.props} property="modality" options="transactionModalities"/>

          </td>
          <td colSpan="2">Entradas:</td>
          <td>
            <input
              name={this.props.prefix + "description"}
              type="text"
              value={this.props.entity.description || ''}
              onChange={this.props.onChange}
              readOnly={!this.props.editing}></input>
          </td>
        </tr>
        <InListRelationView {...this.props} property="entries" before="1" after="1" view={<Entry/>}/>
      </>
    );
  }

}

export default SimplerTransaction;
