import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, FlatList, Text, View } from 'react-native';
import { useQuery, gql } from '@apollo/client';

import { Loading } from '../components/Loading';
import { CardProductList } from '../components/CardProductList';
import { GET_ALL_PRODUCTS, GET_ALL_PRODUCTS_BY_CATEGORY } from '../graphql/requests';
import { FadeIn } from '../animation/FadeIn';
import { HeaderFavoriteProductsCount } from '../components/HeaderFavoriteProductsCount';


export function FavoriteList({ navigation }) {

  // const { data, loading, error } = useQuery(GET_ALL_PRODUCTS,
  //   { fetchPolicy: 'cache-and-network', }
  // );

  const {data, loading, error} = useQuery(GET_ALL_PRODUCTS_BY_CATEGORY,
    {
      variables: {
        category: 2,
      },
    },
    { fetchPolicy: 'cache-and-network',}
    );

  function renderProduct({ product, index }) {
    return (
        <CardProductList productId={product.id} index={index}  navigation={navigation} ></CardProductList>
    );
  }
  
  function renderHeader() {
    return (
        <FadeIn slideValue={0}>
          <View style={styles.titleWrapper}>
            <Text style={styles.title}>My Wishlist</Text>
            <HeaderFavoriteProductsCount></HeaderFavoriteProductsCount>
          </View>
          <Text style={styles.subtitle}>List of Your Favorites Shoes</Text>
      </FadeIn>
      );
  }

  if (loading) {
    return <Loading hasBackground />;
  }


  return (

    <SafeAreaView style={[styles.container]} >
      <ScrollView style={[styles.containerWrapper]} >
      

        <FlatList
          data={data ? data.products : []}
          renderItem={({item, index})=>renderProduct({product: item, index})}
          ListHeaderComponent={renderHeader()}
        // contentContainerStyle={styles.commentsContainer}
        />

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
  },

  containerWrapper: {
    padding: 12
  },

  title: {
    fontSize: 32,
    fontWeight: '600',
    paddingTop: 24,
  },

  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    opacity: 0.5,
    paddingTop: 8,
    marginBottom: 24
  },

  titleWrapper:{
    flexDirection:'row', 
    alignItems:'center'
  }

});