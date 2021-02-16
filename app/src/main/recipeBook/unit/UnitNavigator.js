import Unit from './Unit.js';
import Navigator from '../../../generics/Navigator.js';
import BasicCrud from '../../../generics/BasicCrud.js';

function UnitNavigator() {
  return (
    <div className="unit-navigator">
      <Navigator crud={new BasicCrud("units")}>
        <Unit prefix=""/>
      </Navigator>
    </div>
  );
}

export default UnitNavigator;
