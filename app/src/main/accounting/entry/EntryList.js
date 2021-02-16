import Entry from './Entry.js';

function EntryList(props) {
  return props.entity.map((entry,index) => {
      return (
          <tr key={index}>
            <td></td>
            <td></td>
            <Entry
              entity={entry}
              prefix={props.prefix+index+"."}
              onChange={props.onChange}
              editing={props.editing}
              optionsLists={props.optionsLists}
              registerOptionList={props.registerOptionList} />
            <td></td>
          </tr>);
      });
}

export default EntryList;
