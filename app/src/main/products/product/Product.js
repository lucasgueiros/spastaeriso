import {TextField,StandaloneTextField,StandaloneDateField,DateField,LinkSelect,NumberField,ListRelationView,StandaloneLinkSelect,StandaloneMultipleLinkSelect} from '../../../old_generics/all.js';
import Item from '../../recipeBook/recipe/item/Item.js';

function ProductPrice (props) {
  return (
    <tr>
      {props.children}
      <td>
        <DateField {...props} property="date"/>
      </td>
      <td>
        <NumberField {...props} property="price"/>
      </td>
    </tr>
  );
}

function ProductItem (props) {
  return (
    <tr>
      {props.children}
      <td>
        <LinkSelect {...props} property="input" options="inputs"/>
      </td>
      <td>
        <NumberField {...props} property="quantity"/>
      </td>
      <td>
        <LinkSelect {...props} property="unit" options="units" nameField="symbol"/>
      </td>
      <td>
        <TextField {...props} property="comment" />
      </td>
      <td>
        <LinkSelect {...props} property="recipe" options="recipes" nameField="title"/>
      </td>
    </tr>
  );
}

export default function Product (props) {
  return (
    <>
      <StandaloneTextField {...props} property="name" label="Produto"/>
      <StandaloneDateField {...props} property="created" label="Criado em"/>
      <StandaloneTextField {...props} property="description" label="Descrição"/>
      <StandaloneTextField {...props} property="comments" label="Comentários"/>

      <h4>Preços</h4>
      <ListRelationView {...props} property="prices" row={<ProductPrice/>} index="date">
        <th>Data</th>
        <th>Preço</th>
      </ListRelationView>

      <ListRelationView {...props} property="items" row={<ProductItem/>} >
        <th>Insumo</th>
        <th>Quantidade</th>
        <th>Unidade</th>
        <th>Comentários</th>
        <th>Receita</th>
      </ListRelationView>

      <StandaloneMultipleLinkSelect {...props} property="categories" label="Categorias" options="productCategories" />
    </>
  );
}

/*
@Lob
private byte[] image;*/
