import React from 'react';
import {LinkSelect,NumberField,TextField} from '../../../../generics/all.js';

class WorkingTime extends React.Component {

  render () {
    return (
      <tr>
        {this.props.children}
        <td>
          <LinkSelect {...this.props} property="functionaryFunction" options="functionaryFunctions"/>
        </td>
        <td>
          <NumberField {...this.props} property="minutes"/>
        </td>
        <td>
          <TextField {...this.props} property="comment"/>
        </td>
      </tr>
    );
  }
}

export default WorkingTime;
