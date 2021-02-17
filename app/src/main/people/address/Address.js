import {StandaloneTextField,StandaloneLinkSelect} from '../../../generics/all.js';

export default function Address (props){
  return (
    <>
      <StandaloneTextField {...props} property="name" label="Marcador" />
      <StandaloneTextField {...props} property="localName" label="Nome do local" />
      <StandaloneLinkSelect {...props} property="type" options="addressTypes" label="Tipo"/>
      <StandaloneLinkSelect {...props} property="neighborhood" options="neighborhoods" label="Bairro"/>
      <StandaloneTextField {...props} property="street" label="Rua" />
      <StandaloneTextField {...props} property="number" label="Número" />
      <StandaloneTextField {...props} property="postalCode" label="CEP" />
      <StandaloneTextField {...props} property="complement" label="Complemento" />
      <StandaloneTextField {...props} property="reference" label="Ponto de referência" />
      <StandaloneTextField {...props} property="comments" label="Comentários" />

    </>
  );
}
/*
	private Neighborhood neighborhood
	private AddressType type;*/
