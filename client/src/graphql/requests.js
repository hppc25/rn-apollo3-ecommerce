import {gql} from '@apollo/client';

export const PRODUCT_FRAGMENT = gql`
  fragment ProductFragment on Product {
    id
    name
    price
    description
    color
    favorite @client
    priceCurrency @client
    thumb {
      id
      url
    }
    categories {
      id
      name
    }
  }
`;

// I am not using fragment in here because of the unit tests, for some reason
// fragments have issues with the MockedProvider
export const GET_ALL_PRODUCTS = gql`
  {
    products {
      ...ProductFragment
    }
  }
  ${PRODUCT_FRAGMENT}
`;


export const GET_ALL_PRODUCTS_BY_CATEGORY = gql`
query getAllProductsByCategory($category: ID!){
  products( where: {categories: {id: $category} }){
    ...ProductFragment
  }
}
  ${PRODUCT_FRAGMENT}
`;


export const GET_ALL_CATEGORIES = gql`
  query getAllCategories {
    categories{
      id,
      name
    
    }
  }
`;

export const ADD_OR_REMOVE_PRODUCT_FROM_FAVORITE = gql`
  mutation AddOrRemoveProductFromFavorite($productId: ID!) {
    addOrRemoveProductFromFavorite(productId: $productId) @client
  }
`;

export const FAVORITE_PRODUCT_FRAGMENT = gql`
  fragment FavoriteProductFragment on Product {
    favorite
  }
`;

export const GET_FAVORITE_PRODUCTS_COUNT = gql`
  {
    favoriteProductsCount @client
  }
`;

export const GET_PRODUCT = gql`
  query GetProduct($productId: ID!) {
    product(id: $productId) {
      ...ProductFragment
    }
  }
  ${PRODUCT_FRAGMENT}
`;

export const GET_PRODUCT_BY_IDS = gql`
  query GetAllProductsByIds($listIds: [ID!]) {
    products( where: {id: $listIds }) {
      ...ProductFragment
    }
  }
  ${PRODUCT_FRAGMENT}
`;

// query getAllproductsByIds($listIds: [ID!]) {
//   products( where: {id:  $listIds }){
//     id,
//     name
//   }
// }

export const GET_COMMENTS_BY_PRODUCT = gql`
  query GetCommentsByProduct($productId: ID!) {
    comments(sort: "id:desc", where: {product: {id: $productId}}) {
      id
      comment
    }
  }
`;

export const CREATE_COMMENT = gql`
  mutation CreateComment($comment: String!, $productId: ID!) {
    createComment(input: {data: {comment: $comment, product: $productId}}) {
      comment {
        id
        comment
      }
    }
  }
`;


export const GET_CART_ITEMS = gql`
  query GetCartItems {
    cartItems @client
  }
`;