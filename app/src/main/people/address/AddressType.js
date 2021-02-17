import {StandaloneTextField} from '../../../generics/all.js';

export default function AddressTypes (props){
  return (
    <>
      <StandaloneTextField {...props} property="name" label="Tipo" />
      <StandaloneTextField {...props} property="description" label="Descrição" />
    </>
  );
}
