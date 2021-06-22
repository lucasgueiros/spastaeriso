import {StandaloneTextField} from '../../../old_generics/all.js';

export default function FunctionaryFunction (props) {
  return (
    <>
      <StandaloneTextField {...props} property="name" label="Função"/>
      <StandaloneTextField {...props} property="description" label="Descrição"/>
    </>
  );
}
