import React from 'react'
import {FlatList, StyleSheet, View,Text, Button, Dimensions, TouchableOpacity} from 'react-native';
import {useQuery, gql} from '@apollo/client';

import {Loading} from '../components/Loading';
import {Error} from '../components/Error';
import { GET_ALL_PRODUCTS, GET_ALL_CATEGORIES } from '../graphql/requests';
// import { Product } from '../components';
import { Product2 } from '../components/Product2';
import { SearchButton } from '../components/SearchButton';

const {height, width} = Dimensions.get('window');
const itemWidth = (width - 35) / 2;

export function ProductsList({navigation}) {

    const {data, loading, error} = useQuery(GET_ALL_PRODUCTS,
      // {fetchPolicy:'cache-first'}
      { fetchPolicy: 'cache-and-network',}
      );

    const {data:categoriesData, loading:categoriesLoading, error:categoriesError} = useQuery(GET_ALL_CATEGORIES,
      // {fetchPolicy:'cache-first'}
      { fetchPolicy: 'cache-and-network',}
      );
      
      const [categorySelected, setCategorySelected] = React.useState(1);


  if (loading) {
    return <Loading hasBackground />;
  }

  if (error) {
    return <Error error={error} />;
  }

  function renderProduct({item: product}) {
    return (
      <Product2
        product={product}
        style={{  width: itemWidth}}
        onPress={() => {
          navigation.navigate('ProductDetails', {
            productId: product.id,
          });
        }}
      />
    );
  }

  function renderCategory({item: category}) {
 
    return (
      <TouchableOpacity 
        style={styles.categoryBtn}
        onPress={ ()=> setCategorySelected(category.id)}
      >
        <Text style={[styles.categoryBtnText, { color: category.id == categorySelected?'black' : 'grey'}]}>{category.name}</Text>
    
    </TouchableOpacity>
    );

  }

  function renderCategories() {

   

    return (
      <View style={styles.categoriesWrapper}>
        <Text style={styles.categoriesTitle}>Categories</Text>
        
        <View style={styles.categoriesBtnWrapper}>
    

         {!categoriesLoading && <FlatList
            // data={commentsData ? commentsData.comments : []}
            data={categoriesData.categories}
            renderItem={renderCategory}
            horizontal={true}
            keyExtractor={(item) => `category${item.id}`}
            // ListHeaderComponent={renderHeader()}
            contentContainerStyle={styles.categoriesContainer}
            showsHorizontalScrollIndicator={false}
          />
         }

           
        </View>

      </View>
    )
  }

    return (
        <View style={styles.container}>

          <View style={styles.searchContainer}>
            <SearchButton></SearchButton>
          </View>

          {renderCategories()}
         
             {/* onPress={()=>{navigation.navigate('ProductDetails')}} */}

            {data && <FlatList
                style={styles.productsList}
                contentContainerStyle={styles.productsListContainer}
                data={data.products}
                renderItem={renderProduct}
                numColumns={2}   
                columnWrapperStyle={styles.row} 
                // renderItem={({item}) => <Text>{item.name}</Text>}
    />
    }
   
        
        </View>
    )
}

const styles = StyleSheet.create({

    container:{
        flex:1,
        // justifyContent:"center",
        // alignItems:"center",
        paddingHorizontal:2
    },

    productsList: {
      backgroundColor: '#fafafa',
    },
    productsListContainer: {
      backgroundColor: '#fafafa',
      paddingVertical: 8,
      marginHorizontal: 0,
  
      // flex:1,
      // flexWrap: 'wrap',
     
    },

    row: {
      flex: 1,
      // justifyContent: "space-around"
  },

  categoriesWrapper:{
    backgroundColor: '#fafafa',
    paddingHorizontal:16,
    paddingTop:16,

  },

  categoriesTitle:{
    fontSize: 26,
    fontWeight: '600',

  },

  categoriesContainer:{

  },
  categoriesBtnWrapper:{
    marginTop:24,
    marginBottom:12,

  },

  categoryBtn:{
    marginRight : 12,
  },

  categoryBtnText:{
    fontWeight: '600',
    fontSize:18
  },

  searchContainer:{
    paddingTop:32,
    paddingBottom:12,
    paddingHorizontal:16,
    backgroundColor:'#fafafa'
  }

  });