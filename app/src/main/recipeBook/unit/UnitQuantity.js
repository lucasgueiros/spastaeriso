import {StandaloneLinkSelect,StandaloneTextField} from '../../../generics/all.js';

export function UnitQuantity (props) {return (
  <div>
    <StandaloneTextField {...props} property="name" label="Nome"/>
    <StandaloneLinkSelect {...props} property="favorite" options="units" label="Unidade favorita"/>
  </div>
);}
