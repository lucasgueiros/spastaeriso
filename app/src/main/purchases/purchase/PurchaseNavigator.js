import './PurchaseNavigator.css';
import Purchase from './Purchase.js';
import Navigator from '../../../generics/Navigator.js';
import PurchaseCrud from './PurchaseCrud.js';

function PurchaseNavigator() {
  return (
    <div className="purchase-navigator">
      <Navigator crud={new PurchaseCrud()}>
        <Purchase/>
      </Navigator>
    </div>
  );
}

export default PurchaseNavigator;
