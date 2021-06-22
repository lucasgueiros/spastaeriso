import {RestrictOptionsList,NavigatorRelationView,StandaloneTextField,StandaloneLinkSelect,Navigator,TextField,LinkSelect,ListRelationView} from '../../old_generics/all.js';
import Address from './address/Address.js';

export function PersonNavigator(props) {
  return (
    <>
      <h3>Pessoas</h3>
      <Navigator {...props}  entity="people" view={<Person/>} />
    </>
  );
}

function Contact (props){
  return (
    <tr>
      {props.children}
      <td>
        <TextField {...props} property="name" label="Marcador" />
      </td>
      <td>
        <TextField {...props} property="contact" label="Contato" />
      </td>
      <td>
        <LinkSelect {...props} property="channel" options="contactChannels" label="Canal"/>
      </td>
    </tr>
  );
}

/*function Address (props) {
  return (
    <tr>
      {props.children}
      <td>
        <TextField {...props} property="name" label="Marcador" />
      </td>
      <td>
        <TextField {...props} property="localName" label="Nome do local" />
      </td>
      <td>
        <LinkSelect {...props} property="type" options="addressTypes" label="Tipo"/>
      </td>
      <td>
        <LinkSelect {...props} property="neighborhood" options="neighborhoods" label="Bairro"/>
      </td>
      <td>
        <TextField {...props} property="street" label="Rua" />
      </td>
      <td>
        <TextField {...props} property="number" label="Número" />
      </td>
      <td>
        <TextField {...props} property="postalCode" label="CEP" />
      </td>
      <td>
        <TextField {...props} property="complement" label="Complemento" />
      </td>
      <td>
        <TextField {...props} property="reference" label="Ponto de referência" />
      </td>
      <td>
        <TextField {...props} property="comments" label="Comentários" />
      </td>
    </tr>);
}*/

export function Person (props){
  return (
    <>
      <StandaloneTextField {...props} property="name" label="Nome" />
      <StandaloneTextField {...props} property="comment" label="Comentários" />

      <ListRelationView {...props} property="contacts" row={<Contact/>} >
        <th>Marcador</th>
        <th>Contato</th>
        <th>Canal</th>
      </ListRelationView>

      <h4>Endereços</h4>
      <NavigatorRelationView {...props} property="addresses" view={<Address/>} />

      <RestrictOptionsList {...props} key={props.entity._links ? props.entity._links.self.href + "/primaryAddress" : ""} property="addresses" options="addresses" identifier="of_person">
        <StandaloneLinkSelect {...props}
          property="primaryAddress"
          options="addresses"
          label="Endereço principal"
          restricted="of_person"/>
      </RestrictOptionsList>

      <RestrictOptionsList {...props} key={props.entity._links ? props.entity._links.self.href + "/primaryContact" : ""}  property="contacts" options="contacts" identifier="of_person">
        <StandaloneLinkSelect {...props}
          property="primaryContact"
          options="contacts"
          label="Contato principal"
          restricted="of_person"/>
      </RestrictOptionsList>

    </>
  );
}

/*
	private List<Address> addresses;
	@ManyToMany
	private List<Contact> contacts;
	@ManyToOne
	private Address primaryAddress;
	@ManyToOne
	private Contact primaryContact;
	@OneToOne
	private Account account;*/
