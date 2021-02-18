import {StandaloneTextField,StandaloneLinkSelect,Navigator,TextField,LinkSelect,ListRelationView} from '../../generics/all.js';

export function PersonNavigator(props) {
  return (
    <>
      <h3>Pessoas</h3>
      <Navigator entity="people" view={<Person/>} />
    </>
  );
}

function Contact (props){
  return (
    <>
      <td>
        <TextField {...props} property="name" label="Marcador" />
      </td>
      <td>
        <TextField {...props} property="contact" label="Contato" />
      </td>
      <td>
        <LinkSelect {...props} property="channel" options="contactChannels" label="Canal"/>
      </td>
    </>
  );
}

function Address (props) {
  return (
    <>
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
    </>);
}

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

      <ListRelationView {...props} property="addresses" row={<Address/>} >
        <th>Marcador</th>
        <th>Nome do local</th>
        <th>Tipo</th>
        <th>Bairro</th>
        <th>Rua</th>
        <th>Número</th>
        <th>CEP</th>
        <th>Complemento</th>
        <th>Ponto de referência</th>
        <th>Comentários</th>
      </ListRelationView>

      <StandaloneLinkSelect {...props} property="primaryAddress" options="contacts" label="Endereço principal"/>
      <StandaloneLinkSelect {...props} property="primaryContact" options="addresses" label="Contato principal"/>

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
