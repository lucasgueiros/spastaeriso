import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Link, NavLink } from 'react-router-dom';
import { useKeycloak } from '@react-keycloak/web';
import {Navigator} from '../old_generics/all.js';
import {ListView} from '../old_generics/all.js';

// RecipeBook
import InputNavigator from './recipeBook/input/InputNavigator.js';
import UnitNavigator from './recipeBook/unit/UnitNavigator.js';
import RecipeNavigator from './recipeBook/recipe/RecipeNavigator.js';
import {UnitQuantity} from './recipeBook/unit/UnitQuantity.js';


// Purchases
import {PurchaseFromNFe} from './purchases/purchase/PurchaseFromNFe.js';
import {PurchaseNavigator} from './purchases/purchase/Purchase.js';
import ProviderNavigator from './purchases/provider/ProviderNavigator.js';
import {PurchaseProductNavigator} from './purchases/purchase/PurchaseProduct.js';
import {InventoryMovementListView} from './purchases/inventory/InventoryMovement.js';
import {ProducedProductNavigator} from './purchases/inventory/ProducedProduct.js';
import {PurchaseItemStatement} from './purchases/purchase/PurchaseItemStatement.js';
import {InputsAvgPrice} from './purchases/purchase/InputsAvgPrice.js';
import InventoryBalance from './purchases/inventory/InventoryBalance.js'

// People
import FunctionaryContractTemplate from './people/functionary/FunctionaryContractTemplate.js';
import FunctionaryFunction from './people/functionary/FunctionaryFunction.js';
import Neighborhood from './people/address/Neighborhood.js';
import AddressType from './people/address/AddressType.js';
import Address from './people/address/Address.js';
import {ContactNavigator} from './people/contact/Contact.js';
import {ContactChannelNavigator} from './people/contact/ContactChannel.js';
import {PersonNavigator} from './people/Person.js';

// Products
import Product from './products/product/Product.js';
import ProductCosts from './products/product/ProductCosts.js';

// sales
import {ClientOrderSimplified} from './sales/ClientOrderSimplified.js';
import {ClientOrderNavigator} from './sales/ClientOrder.js';
import {Deliveryman} from './sales/Deliveryman.js';
import {Delivery} from './sales/Delivery.js';
import {DeliveryPricesByNeighborhoodListView} from './sales/DeliveryPriceByNeighborhood.js';

// ACCOUTING
import {AccountNavigator} from './accounting/Account.js';
import {TransactionListView} from './accounting/Transaction.js';
import {CardNavigator} from './accounting/Card.js';
import {TransactionModalityNavigator} from './accounting/TransactionModality.js';
import {AccountingBalance} from './accounting/AccountingBalance.js';

export function Main(props) {
  return (
    <div class-name="main">

      <Router>
        <div>
          <nav id="sidebar">
            <ul>
              <li><NavLink to="/">Home</NavLink></li>
              <li>
                <NavLink to="/recipeBook">Livro de Receitas</NavLink>
                <ul>
                  <li><NavLink to="/recipeBook/unitQuantities">Grandezas</NavLink></li>
                  <li><NavLink to="/recipeBook/inputs">Insumos</NavLink></li>
                  <li><NavLink to="/recipeBook/units">Unidades</NavLink></li>
                  <li><NavLink to="/recipeBook/recipes">Receitas</NavLink></li>
                </ul>
              </li>
              <li>
                <NavLink to="/purchases">Compras</NavLink>
                <ul>
                  <li><NavLink to="/purchases/purchase">Compras</NavLink></li>
                  <li><NavLink to="/purchases/purchaseItemStatement">Extrato de compras</NavLink></li>
                  <li><NavLink to="/purchases/inventory">Extrato do Estoque</NavLink></li>
                  <li><NavLink to="/purchases/inventory/balance">Balanço do Estoque</NavLink></li>
                  <li><NavLink to="/purchases/purchaseItem/avgPrice">Preço médio dos insumos</NavLink></li>
                  <li><NavLink to="/purchases/produceds">Produtos produzidos</NavLink></li>
                  <li><NavLink to="/purchases/fromNFe">Enviar NFe</NavLink></li>
                  <li><NavLink to="/purchases/provider">Fornecedores</NavLink></li>
                  <li><NavLink to="/purchases/purchaseProduct">Mapeamento de produtos</NavLink></li>
                </ul>
              </li>
              <li>
                <NavLink to="/accounting">Finanças</NavLink>
                <ul>
                  <li><NavLink to="/accounting/account">Contas</NavLink></li>
                  <li><NavLink to="/accounting/transaction">Transações</NavLink></li>
                  <li><NavLink to="/accounting/cards">Cartões</NavLink></li>
                  <li><NavLink to="/accounting/modalities">Modalidades</NavLink></li>
                  <li><NavLink to="/accounting/balance">Relatório financeiro</NavLink></li>
                </ul>
              </li>
              <li>
                <NavLink to="/people">Pessoas</NavLink>
                <ul>
                  <li><NavLink to="/people/people">Pessoas</NavLink></li>
                  <li><NavLink to="/people/contactChannel">Canais de Contato</NavLink></li>
                  <li><NavLink to="/people/contact">Contatos</NavLink></li>
                  <li><NavLink to="/people/addresses">Endereços</NavLink></li>
                  <li><NavLink to="/people/addressTypes">Tipos de endereços</NavLink></li>
                  <li><NavLink to="/people/neighborhood">Bairros</NavLink></li>
                  <li><NavLink to="/people/functionaryContractTemplate">Modelos de salário para as funções</NavLink></li>
                  <li><NavLink to="/people/functionaryFunction">Funções</NavLink></li>
                </ul>
              </li>
              <li>
                <NavLink to="/products">Produtos</NavLink>
                <ul>
                  <li><NavLink to="/products/product">Produtos</NavLink></li>
                  <li><NavLink to="/products/costs">Tabela de custos</NavLink></li>
                </ul>
              </li>
              <li>
                <NavLink to="/orders">Pedidos</NavLink>
                <ul>
                  <li><NavLink to="/orders/simple">Visão simplificada</NavLink></li>
                  <li><NavLink to="/orders/details">Visão detalhada</NavLink></li>
                  <li><NavLink to="/orders/deliveryman">Entregadores</NavLink></li>
                  <li><NavLink to="/orders/deliveries">Entregas</NavLink></li>
                  <li><NavLink to="/orders/deliveryPrice">Preço por entrega</NavLink></li>
                </ul>
              </li>
            </ul>
          </nav>
          <div id="main-content">
            <Switch>

              // Orders
              <Route path="/orders/deliveryPrice">
                <DeliveryPricesByNeighborhoodListView {...props}/>
              </Route>
              <Route path="/orders/deliveries">
                <Navigator {...props} entity="deliveries" view={<Delivery/>}/>
              </Route>
              <Route path="/orders/deliveryman">
                <Navigator {...props} entity="deliverymen" view={<Deliveryman/>}/>
              </Route>
              <Route path="/orders/simple">
                <ClientOrderSimplified {...props}/>
              </Route>
              <Route path="/orders/details">
                <ClientOrderNavigator {...props}/>
              </Route>
              <Route path="/orders">
                <h3>Pedidos</h3>
              </Route>

              // Products
              <Route path="/products/costs">
                <ProductCosts {...props}/>
              </Route>
              <Route path="/products/product">
                <Navigator {...props}  entity="products" view={<Product/>} />
              </Route>
              <Route path="/products/">
                <h3>Produtos</h3>
              </Route>

              // Accouting
              <Route path="/accounting/balance">
                <AccountingBalance {...props}/>
              </Route>
              <Route path="/accounting/modalities">
                <TransactionModalityNavigator {...props}/>
              </Route>
              <Route path="/accounting/cards">
                <CardNavigator {...props}/>
              </Route>
              <Route path="/accounting/transaction">
                <TransactionListView {...props}/>
              </Route>
              <Route path="/accounting/account">
                <AccountNavigator {...props}/>
              </Route>
              <Route path="/accounting/">
                <h3>Finanças</h3>
              </Route>

              // Recipe Book
              <Route path="/recipeBook/unitQuantities">
                <Navigator {...props} entity="unitQuantities" view={<UnitQuantity/>}/>
              </Route>
              <Route path="/recipeBook/recipes">
                <RecipeNavigator {...props}/>
              </Route>
              <Route path="/recipeBook/units">
                <UnitNavigator {...props}/>
              </Route>
              <Route path="/recipeBook/inputs">
                <InputNavigator {...props}/>
              </Route>
              <Route path="/recipeBook/">
                <h3>Livro de Receitas</h3>
              </Route>

              // Purchases
              <Route path="/purchases/purchaseItem/avgPrice">
                <InputsAvgPrice {...props}/>
              </Route>
              <Route path="/purchases/purchaseItemStatement">
                <PurchaseItemStatement {...props}/>
              </Route>
              <Route path="/purchases/produceds">
                <ProducedProductNavigator {...props}/>
              </Route>
              <Route path="/purchases/inventory/balance">
                <InventoryBalance {...props}/>
              </Route>
              <Route path="/purchases/inventory">
                <InventoryMovementListView {...props}/>
              </Route>
              <Route path="/purchases/purchaseProduct">
                <PurchaseProductNavigator {...props}/>
              </Route>
              <Route path="/purchases/provider">
                <ProviderNavigator {...props}/>
              </Route>
              <Route path="/purchases/fromNFe">
                <PurchaseFromNFe {...props}/>
              </Route>
              <Route path="/purchases/purchase">
                <PurchaseNavigator {...props}/>
              </Route>
              <Route path="/purchases/">
                <h3>Compras</h3>
              </Route>

              // People
              <Route path="/people/people">
                <PersonNavigator {...props}/>
              </Route>
              <Route path="/people/contactChannel">
                <ContactChannelNavigator {...props}/>
              </Route>
              <Route path="/people/contact">
                <ContactNavigator {...props}/>
              </Route>
              <Route path="/people/addresses">
                <h3>Endereços</h3>
                <Navigator {...props}  entity="addresses" view={<Address/>} />
              </Route>
              <Route path="/people/addressTypes">
                <h3>Tipos de endereços</h3>
                <Navigator {...props}  entity="addressTypes" view={<AddressType/>} />
              </Route>
              <Route path="/people/neighborhood">
                <Navigator {...props}  entity="neighborhoods" view={<Neighborhood/>} />
              </Route>
              <Route path="/people/functionaryFunction">
                <Navigator {...props}  entity="functionaryFunctions" view={<FunctionaryFunction/>} />
              </Route>
              <Route path="/people/functionaryContractTemplate">
                <Navigator {...props}  entity="functionaryContractTemplates" view={<FunctionaryContractTemplate/>} />
              </Route>
              <Route path="/people/">
                <h3>Pessoas</h3>
              </Route>

              // Home
              <Route path="/">
                <h3>Home</h3>
              </Route>
            </Switch>
          </div>
        </div>
      </Router>
    </div>
  );
}
