import React from 'react'
import {FlatList, StyleSheet, View,Text, Dimensions, TouchableOpacity, SafeAreaView} from 'react-native';
import {useQuery, gql} from '@apollo/client';

import {Loading} from '../components/Loading';
import {Error} from '../components/Error';
import { GET_ALL_PRODUCTS, GET_ALL_CATEGORIES, GET_ALL_PRODUCTS_BY_CATEGORY } from '../graphql/requests';
// import { Product } from '../components';
import { Product2 } from '../components/Product2';
import { SearchButton } from '../components/SearchButton';
import { FadeIn } from '../animation/FadeIn';

const {height, width} = Dimensions.get('window');
const itemWidth = (width - 60) / 2;

export function ProductsList({navigation}) {

  const [categorySelected, setCategorySelected] = React.useState(1);

    // const {data, loading, error} = useQuery(GET_ALL_PRODUCTS,
    const {data, loading, error} = useQuery(GET_ALL_PRODUCTS_BY_CATEGORY,
      {
        variables: {
          category: categorySelected,
        },
      },
      { fetchPolicy: 'cache-and-network',}
      );

    const {data:categoriesData, loading:categoriesLoading, error:categoriesError} = useQuery(GET_ALL_CATEGORIES,
      // {fetchPolicy:'cache-first'}
      { fetchPolicy: 'cache-and-network',}
      );
      
     


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
      <FadeIn style={styles.categoriesWrapper}>
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

      </FadeIn>
    )
  }

    return (
        <SafeAreaView style={styles.container}>

          <FadeIn>
            <View style={styles.searchContainer}>
              <SearchButton>
                  {renderCategories()}

                  {data && <FlatList
                    style={styles.productsList}
                    contentContainerStyle={styles.productsListContainer}
                    data={data.products}
                    renderItem={renderProduct}
                    numColumns={2}   
                    columnWrapperStyle={styles.row} 
                  />
                  }

              </SearchButton>
            </View>
          </FadeIn>
        
         

          
   
        
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({

    container:{
        flex:1,
        // justifyContent:"center",
        // alignItems:"center",
        paddingHorizontal:2,
        backgroundColor: '#fafafa',
    },

    productsList: {
      // backgroundColor: '#fafafa',
    },
    productsListContainer: {
      // backgroundColor: '#fafafa',
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
    // paddingHorizontal:16,
    paddingTop:32,

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
    // paddingHorizontal:16,
    backgroundColor:'#fafafa'
  }

  });