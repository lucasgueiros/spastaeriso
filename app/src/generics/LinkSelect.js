import './SimplerLinkSelect.css';

export default function LinkSelect (props) {
    return (
        <select
          name={props.prefix + props.property}
          value={props.entity[props.property] || 'none'}
          onChange={props.onChange}
          disabled={!props.editing} >
          {props.optionsLists[props.options].map((entity, key) =>
            <option key={key} value={entity._links.self.href || "none"}>{entity[props.nameField || 'name']}</option>
          )}
          <option key={-1} value={"none"}>Nenhuma</option>
        </select>
    );
}
