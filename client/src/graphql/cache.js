
import { InMemoryCache } from '@apollo/client';
import {GET_FAVORITE_PRODUCTS_COUNT} from './requests';

export const cache = new InMemoryCache(
    {
       typePolicies:{
         Product:{
           fields:{
             // favorite:{
             //   read(favorite){
             //     return favorite??false;
             //   }
             // },
             price(price){
               return `£${price}`
             }
           }
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