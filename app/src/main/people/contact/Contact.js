import {StandaloneTextField,StandaloneLinkSelect,Navigator} from '../../../generics/all.js';

export function ContactNavigator(props) {
  return (
    <>
      <h3>Contatos</h3>
      <Navigator {...props}  entity="contacts" view={<Contact/>} />
    </>
  );
}

export function Contact (props){
  return (
    <>
      <StandaloneTextField {...props} property="name" label="Marcador" />
      <StandaloneTextField {...props} property="contact" label="Contato" />
      <StandaloneLinkSelect {...props} property="channel" options="contactChannels" label="Canal"/>

    </>
  );
}
/*
private String name = "default";
@NonNull
private String contact;
@NonNull
@ManyToOne
private ContactChannel channel;

  */
