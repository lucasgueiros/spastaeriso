import {StandaloneTextField} from '../../../generics/all.js';

export function Provider (props) {
  return (
    <div class-name="input">
      <StandaloneTextField {...props} property="name" label="Nome"/>
      <StandaloneTextField {...props} property="cnpj" label="CNPJ"/>
      <StandaloneTextField {...props} property="comment" label="Comentários"/>
    </div>
  );
}
