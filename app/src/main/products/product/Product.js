import {StandaloneTextField,StandaloneDateField,DateField,LinkSelect,NumberField,ListRelationView,StandaloneLinkSelect,StandaloneMultipleLinkSelect} from '../../../generics/all.js';
import Item from '../../recipeBook/recipe/item/Item.js';

function ProductPrice (props) {
  return (
    <>
      {props.children}
      <td>
        <DateField {...props} property="date"/>
      </td>
      <td>
        <NumberField {...props} property="price"/>
      </td>
    </>
  );
}

function ProductRecipe (props) {
  return (
    <>
      {props.children}
      <td>
        <LinkSelect {...props} property="input" options="inputs"/>
      </td>
      <td>
        <LinkSelect {...props} property="recipe" options="recipes" nameField="title"/>
      </td>
    </>
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

      <ListRelationView {...props} property="items" row={<Item/>} >
        <th>Insumo</th>
        <th>Quantidade</th>
        <th>Unidade</th>
        <th>Comentários</th>
      </ListRelationView>

      <ListRelationView {...props} property="recipes" row={<ProductRecipe/>} >
        <th>Insumo</th>
        <th>Receita</th>
      </ListRelationView>

      <StandaloneMultipleLinkSelect {...props} property="categories" label="Categorias" options="productCategories" />
    </>
  );
}

/*
@Lob
private byte[] image;*/
