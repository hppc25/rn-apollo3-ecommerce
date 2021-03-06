import {
    FAVORITE_PRODUCT_FRAGMENT,
    GET_FAVORITE_PRODUCTS_COUNT,
  } from './requests';
  
  export const resolvers = {
    Product:{
        // favorite(){
        //     return true;
        // },

        priceCurrency(){
            return 0;
        },
        
    },

    Mutation: {
      addOrRemoveProductFromFavorite(_root, args, {client, cache}) {
        const productId = cache.identify({
          __typename: 'Product',
          id: args.productId,
        });

        // cache.modify(productId, modifiers: { 
        //     favorite(favorite){
        //         return !favorite;
        //     }
        // })
        
        const {favorite} = client.readFragment({
          fragment: FAVORITE_PRODUCT_FRAGMENT,
          id: productId,
        });
        client.writeFragment({
          fragment: FAVORITE_PRODUCT_FRAGMENT,
          id: productId,
          data: {
            favorite: !favorite,
          },
        });
      

        const {favoriteProductsCount} = client.readQuery({
          query: GET_FAVORITE_PRODUCTS_COUNT,
        });
        client.writeQuery({
          query: GET_FAVORITE_PRODUCTS_COUNT,
          data: {
            favoriteProductsCount: favorite
              ? favoriteProductsCount - 1
              : favoriteProductsCount + 1,
          },
        });
      },
    },
  };