
import { InMemoryCache, makeVar } from '@apollo/client';
import {GET_FAVORITE_PRODUCTS_COUNT} from './requests';

export const cartItemsVar = makeVar([]);

export const cache = new InMemoryCache(
    {
       typePolicies:{
         Product:{
           fields:{

             favorite:{
               read(favorite){
                 return favorite??false;
               }
             },

            //  priceCurrency:{
            //    read(price){
            //      return price;
            //    }
            //  },
            
             price(price){
              return `£${price}`
            }
             
           }
         },

         Query: {
          fields: {
            product(_, {args, toReference}) {
              return toReference({
                __typename: 'Product',
                id: args.id,
              });
            },
          },
        },

        Query: {
          fields: {
            cartItems: {
              read() {
                return cartItemsVar();
              }
            }
          },
        }

       }
     }
   );

   cache.writeQuery({
    query: GET_FAVORITE_PRODUCTS_COUNT,
    data: {
      favoriteProductsCount: 0,
    },
  });