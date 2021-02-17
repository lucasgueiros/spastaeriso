import {StandaloneTextField,StandaloneDateField,DateField,NumberField,ListRelationView,StandaloneLinkSelect,StandaloneMultipleLinkSelect} from '../../../generics/all.js';
import Item from '../../recipeBook/recipe/item/Item.js';

function ProductPrice (props) {
  return (
    <>
      <td>
        <DateField {...props} property="date"/>
      </td>
      <td>
        <NumberField {...props} property="price"/>
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

      <StandaloneMultipleLinkSelect {...props} property="categories" label="Categorias" options="productCategories" />
    </>
  );
}

/*
@Lob
private byte[] image;
@ManyToMany
private List<ProductCategory> categories;*/
