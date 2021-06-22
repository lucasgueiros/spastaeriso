import {StandaloneTextField,StandaloneLinkSelect, Navigator} from '../../../old_generics/all.js';

export function ContactChannelNavigator(props) {
  return (
    <>
      <h3>Canais de Contato</h3>
      <Navigator {...props}  entity="contactChannels" view={<ContactChannel/>} />
    </>
  );
}

export function ContactChannel (props){
  return (
    <>
      <StandaloneTextField {...props} property="name" label="Canal" />
      <StandaloneTextField {...props} property="description" label="Descrição" />
    </>
  );
}
/*
private String name;
	private String description;

  */
