import {StandaloneCheckboxField,StandaloneMultipleOptionSelectField,RelationView,ListRelationView,DateField,NumberField,TextField} from '../../generics/all.js';
import {Person} from '../people/Person.js';

export function Deliveryman (props) {return (
  <div>
    <RelationView {...props} property="person" view={<Person/>}/>
    <StandaloneCheckboxField {...props} property="salaryBasedPayment" label="Tem salário?"/>
    <StandaloneMultipleOptionSelectField {...props} property="avaliableDays" label="Dias disponíveis:"
      options={[
        {name: 'Domingo', value: 'SUNDAY'},
        {name: 'Segunda-feira', value: 'MONDAY'},
        {name: 'Terça-feira', value: 'TUESDAY'},
        {name: 'Quarta-feira', value: 'WEDNESDAY'},
        {name: 'Quinta-feira', value: 'THURSDAY'},
        {name: 'Sexta-feira', value: 'FRIDAY'},
        {name: 'Sábado', value: 'SATURDAY'},
    ]}/>
    <ListRelationView {...props} property="contracts" row={<DeliverymanContract/>}>
      <th>Data inicial</th>
      <th>Data final</th>
      <th>R$/entrega</th>
      <th>Min. R$/ciclo</th>
      <th>Add. R$/ciclo</th>
      <th>Dias/ciclo</th>
      <th>Comentários</th>
    </ListRelationView>
    
  </div>
);}

/*private LocalDate startDate;
	private LocalDate endDate;

        private BigDecimal paymentForDelivery;
	private BigDecimal minimumCiclePayment;
        private BigDecimal fixedPaymentForCycle;
	private Integer daysPerCycle;

	private String comments;*/
function DeliverymanContract (props) {
  return (
    <tr>
      {props.children}
      <td><DateField {...props} property="startDate"/></td>
      <td><DateField {...props} property="endDate"/></td>
      <td><NumberField {...props} property="paymentForDelivery"/></td>
      <td><NumberField {...props} property="minimumCiclePayment"/></td>
      <td><NumberField {...props} property="fixedPaymentForCycle"/></td>
      <td><NumberField {...props} property="daysPerCycle"/></td>
      <td><TextField {...props} property="comments"/></td>
    </tr>
  );
}
