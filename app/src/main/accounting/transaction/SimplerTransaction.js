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
          <LinkSelect {...this.props} property="modality" options="transactionModalities"/>
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
        <InListRelationView {...this.props} property="entries" before="2" after="1" view={<Entry/>}/>
      </>
    );
  }

}

export default SimplerTransaction;
