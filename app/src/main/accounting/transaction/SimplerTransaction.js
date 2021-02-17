import './SimplerTransaction.css';
import React from 'react';
import axios from 'axios';
import {LinkSelect} from '../../../generics/all.js';
import EntryList from '../entry/EntryList.js';

class SimplerTransaction extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    if(this.props.editing){
      var buttons = (
        <tr>
          <td></td>
          <td></td>
          <td>
            <button onClick={() => this.props.addToManyRelation(this.props.prefix + "entries")}>Adicionar entrada</button>
          </td>
          <td></td>
        </tr>
      );
    }


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
        <EntryList
          entity={this.props.entity.entries || []}
          prefix={this.props.prefix+"entries."}
          onChange={this.props.onChange}
          editing={this.props.editing}
          optionsLists={this.props.optionsLists}
          registerOptionList={this.props.registerOptionList}/>
        {buttons}
      </>
    );
  }

}

export default SimplerTransaction;
