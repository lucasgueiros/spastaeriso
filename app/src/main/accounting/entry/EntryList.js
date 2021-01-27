import Entry from './Entry.js';

function EntryList(props) {
  return props.entity.map((entry,index) => {
      return (
        <>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <Entry
              entity={entry}
              prefix={props.prefix+index+"."}
              onChange={props.onChange}
              editing={props.editing}
              accountsOptionsList={props.accountsOptionsList} />
            <td></td>
          </tr>
        </>);
      });
}

export default EntryList;
