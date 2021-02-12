import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, FlatList, Text, View } from 'react-native';
import { useQuery, gql } from '@apollo/client';

import { Loading } from '../components/Loading';
import { CardProductList } from '../components/CardProductList';
import { GET_ALL_PRODUCTS } from '../graphql/requests';


export function FavoriteList({ navigation }) {

  const { data, loading, error } = useQuery(GET_ALL_PRODUCTS,
    { fetchPolicy: 'cache-and-network', }
  );

  function renderProduct({ item: product }) {
    return (
      <CardProductList product={product}  ></CardProductList>
    );
  }

  if (loading) {
    return <Loading hasBackground />;
  }


  return (

    <SafeAreaView style={[styles.container]} >
      <ScrollView style={[styles.containerWrapper]} >
        <Text style={styles.title}>My Favorites</Text>
        <Text style={styles.subtitle}>Check and Pay Your Shoes</Text>


        <FlatList
          data={data ? data.products : []}
          renderItem={renderProduct}
        // ListHeaderComponent={renderHeader()}
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

});