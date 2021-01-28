import React from 'react';
import Provider from './Provider.js';
import Navigator from '../../../generics/Navigator.js';
import BasicCrud from '../../../generics/BasicCrud.js';

class ProviderNavigator extends React.Component {
  render() {
    return (
      <div className="provider-navigator">
        <Navigator crud={new BasicCrud("providers")}>
          <Provider prefix="" />
        </Navigator>
      </div>
    );
  }

}

export default ProviderNavigator;
