import React from 'react';
import {SimplerLinkSelect,LinkSelect} from '../../../../generics/all.js';

function Item (props) {
  return (<>
  <td>
    <LinkSelect {...props} property="input" options="inputs"/>
  </td>
  <td>
    <div>
      <input
        name={props.prefix + "quantity"}
        type="number"
        value={props.entity.quantity || {}}
        onChange={props.onChange}
        readOnly={!props.editing}></input>
    </div>
  </td>
  <td>
    <div>
      <LinkSelect {...props} property="unit" options="units"/>
    </div>
  </td>
  <td>
    <div>
      <input name={props.prefix + "comment"} type="text" value={props.entity.comment || ''} onChange={props.onChange} readOnly={!props.editing}></input>
    </div>
  </td>
  </>);
}

export default function Ingredient (props) {

    return (
      <tr>
      {props.children}
        <td>
          <div>
            <input
              name={props.prefix + "index"}
              type="number"
              value={props.entity.index || {}}
              onChange={props.onChange}
              readOnly={!props.editing}></input>
          </div>
        </td>
        <Item
          entity={props.entity}
          prefix={props.prefix}
          editing={props.editing}
          onChange={props.onChange}
          optionsLists={props.optionsLists}/>
        <td>
          <LinkSelect {...props} property="recipe" options="recipes"/>
        </td>
      </tr>
    );
}
