import React from 'react';
import {LinkSelect,NumberField,DateField} from '../../../generics/all.js';

class Entry extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <td>
          <DateField {...this.props} property="date" />
        </td>
        <td>
          <LinkSelect {...this.props} property="account" options="accounts"/>
        </td>
        <td>
          <NumberField {...this.props} property="value"/>
        </td>
      </>
    );
  }

}

export default Entry;
