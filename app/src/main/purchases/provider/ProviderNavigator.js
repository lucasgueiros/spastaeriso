import React from 'react';
import Provider from './Provider.js';
import Navigator from '../../../old_generics/Navigator.js';
import BasicCrud from '../../../old_generics/BasicCrud.js';

class ProviderNavigator extends React.Component {
  render() {
    return (
      <div className="provider-navigator">
        <Navigator {...this.props} entity="providers" view={<Provider/>}/>
      </div>
    );
  }

}

export default ProviderNavigator;
