import {StandaloneTextField} from '../../../generics/all.js';

export default function FunctionaryFunction (props) {
  return (
    <>
      <StandaloneTextField {...props} property="name" label="Função"/>
      <StandaloneTextField {...props} property="description" label="Descrição"/>
    </>
  );
}
