import React from 'react';
import {FlatList, SafeAreaView, StyleSheet, Text, View, Image, ScrollView, TouchableOpacity} from 'react-native';
import {useQuery, gql} from '@apollo/client';

import { Loading } from '../components/Loading';
import { CardProductList } from '../components/CardProductList';
import { GET_ALL_PRODUCTS} from '../graphql/requests';
import { Card } from '../components/Card';



export function ShoppingCart({navigation}) {

  const {data, loading, error} = useQuery(GET_ALL_PRODUCTS,
    { fetchPolicy: 'cache-and-network',}
    );


  function renderProduct({ item: product }) {
    return (
      <CardProductList product={product} showEditableArea ></CardProductList>
     );
  }

  if (loading) {
    return <Loading hasBackground />;
  }

  return (
    <SafeAreaView style={[styles.container]} >
      <ScrollView style={[styles.containerWrapper]} >
        <Text style={styles.title}>My Bag</Text>
        <Text style={styles.subtitle}>Check and Pay Your Shoes</Text>

        <View>
          <FlatList
              data={data ? data.products : []}
              renderItem={renderProduct}
            />
        </View>

        <View style={styles.btnCheckoutWrapper}>
          <Card style={styles.btnCheckout}>
            <Text style={styles.btnCheckoutText}>Checkout</Text>
          </Card>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
   flex:1,
   padding:8,
  
  //  justifyContent:'center',
  //  alignItems:'center',
  },

  containerWrapper:{
    padding:12
  },

  title:{
    fontSize:32,
    fontWeight: '600',
    paddingTop:24,
  },

  subtitle:{
    fontSize:18,
    fontWeight: '600',
    opacity:0.5,
    paddingTop:8,
    marginBottom:24
  },

  btnCheckoutWrapper:{
    alignItems:'center', 
    marginTop:30,
   
  },

  btnCheckout:{
    height:55,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'black',
    width:"60%",
    borderRadius:55
  },

  btnCheckoutText:{
    color:'white',
    fontSize:18,
    fontWeight:'600',
  }
 

});