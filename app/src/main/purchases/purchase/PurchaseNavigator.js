import './PurchaseNavigator.css';
import Purchase from './Purchase.js';
import Navigator from '../../../generics/Navigator.js';
import PurchaseCrud from './PurchaseCrud.js';
import CrudFactory from '../../../generics/CrudFactory.js';

function PurchaseNavigator() {
  return (
    <div className="purchase-navigator">
      <Navigator crud={CrudFactory.get("purchases")} optionsLists={['accounts','transactionModalities','inputs','units','providers']}>
        <Purchase prefix=""/>
      </Navigator>
    </div>
  );
}

export default PurchaseNavigator;
