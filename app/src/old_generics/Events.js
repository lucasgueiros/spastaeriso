import {ListRelationView,DateTimeFieldWithNowButton,OptionSelectField,TextField} from './all.js';

export default function Events(props) {
  return (
    <>
    <h3>Eventos</h3>
    <ListRelationView {...props} row={<Row status={props.children} />}>
      <th>Data e hora</th>
      <th>Status</th>
      <th>Comentários</th>
    </ListRelationView>
    </>
  );
}

function Row (props) {
  return (
    <tr>
      {props.children}
      <td>
        <DateTimeFieldWithNowButton {...props} property="datetime"/>
      </td>
      <td>
        <OptionSelectField {...props} property="status">
          {props.status}
        </OptionSelectField>
      </td>
      <td>
        <TextField {...props} property="comments"/>
      </td>
    </tr>
  );
}
