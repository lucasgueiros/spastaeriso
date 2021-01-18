import './PurchaseNavigator.css';
import Purchase from './Purchase.js';
import Navigator from '../../../generics/Navigator.js';
import BasicCrud from '../../../generics/BasicCrud.js';

function PurchaseNavigator() {
  return (
    <div className="purchase-navigator">
      <Navigator crud={new BasicCrud("purchases")}>
        <Purchase/>
      </Navigator>
    </div>
  );
}

export default PurchaseNavigator;
