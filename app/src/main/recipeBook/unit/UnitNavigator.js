import Unit from './Unit.js';
import Navigator from '../../../old_generics/Navigator.js';
import BasicCrud from '../../../old_generics/BasicCrud.js';

function UnitNavigator(props) {
  return (
    <div className="unit-navigator">

      <Navigator {...props} entity="units" view={<Unit/>} />
    </div>
  );
}

export default UnitNavigator;
