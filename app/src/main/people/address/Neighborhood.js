import {StandaloneTextField} from '../../../generics/all.js';

export default function Neighborhood (props){
  return (
    <>
      <StandaloneTextField {...props} property="name" label="Bairro" />
      <StandaloneTextField {...props} property="city" label="Cidade" />
      <StandaloneTextField {...props} property="state" label="Estado" />
    </>
  );
}
