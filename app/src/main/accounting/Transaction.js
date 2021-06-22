import {RelationView,FileField,LinkSelect,InListRelationView,TextField,DateTimeField,NumberField,ListView} from '../../old_generics/all.js';

export function TransactionListView (props) {
    return (
      <>
        <h3>Transações</h3>
        <ListView {...props} entity="genericTransactions" view={<Transaction/>}>
          <th>Date e hora</th>
          <th>Modalidade</th>
          <th>Conta</th>
          <th>Valor</th>
          <th>Descrição</th>
          <th>Comprovante(s)</th>
        </ListView>
      </>
    );

}

export function TransactionVoucher (props) {return (
  <>
    <FileField {...props} property="voucher" fileName="voucher"/>
  </>
);}

export function Transaction (props) {
    return (
      <>
        <tr>
          {props.children}
          <td>
            <DateTimeField {...props} property="date" />
          </td>
          <td>
            <LinkSelect {...props} property="modality" options="transactionModalities"/>
          </td>
          <td colSpan="2">Entradas:</td>
          <td>
            <TextField {...props} property="description"/>
          </td>
          <td>
            <TransactionVoucher {...props} property="voucher" prefix={props.prefix+'voucher.'}/>
          </td>
        </tr>
        <InListRelationView {...props} property="entries" before="2" after="1" view={<Entry/>}/>
      </>
    );
}

function Entry (props) {
  return (
    <>
      {props.children}
      <td>
        <LinkSelect {...props} property="account" options="accounts"/>
      </td>
      <td>
        <NumberField {...props} property="value"/>
      </td>
    </>
  );
}
