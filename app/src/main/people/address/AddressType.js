import {StandaloneTextField} from '../../../old_generics/all.js';

export default function AddressTypes (props){
  return (
    <>
      <StandaloneTextField {...props} property="name" label="Tipo" />
      <StandaloneTextField {...props} property="description" label="Descrição" />
    </>
  );
}
