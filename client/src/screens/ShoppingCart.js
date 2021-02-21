import React from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useQuery, gql, useReactiveVar } from '@apollo/client';
import { cartItemsVar } from '../graphql/cache';

import { Loading } from '../components/Loading';
import { CardProductList } from '../components/CardProductList';
import { GET_ALL_PRODUCTS, GET_CART_ITEMS, GET_PRODUCT_BY_IDS } from '../graphql/requests';
import { Card } from '../components/Card';
import { FadeIn } from '../animation/FadeIn';
import { ZoomIn } from '../animation/ZoomIn';

export function ShoppingCart({ navigation }) {

 

  // const { data, loading, error } = useQuery(GET_CART_ITEMS);

  const cartItems = useReactiveVar(cartItemsVar);


  function renderProduct({ productId, index }) {
    return (
      <CardProductList ke={productId} productId={productId} index={index} showEditableArea navigation={navigation} ></CardProductList>
    );
  }

  function renderHeader() {
    return (
      <FadeIn slideValue={0}>
        <Text style={styles.title}>My Bag</Text>
        <Text style={styles.subtitle}>Check and Pay Your Shoes</Text>
      </FadeIn>);
  }
  function getTotalPrice(products) {
    // const reducer = (accumulator, currentValue) => accumulator.price + currentValue.price;
    if (!products || products.length == 0)
      return 0;
    // return products.reduce(reducer)
    return 324.95
  }

  return (
    <SafeAreaView style={[styles.container]} >
      <ScrollView style={[styles.containerWrapper]} >
 
        <View>
          <FlatList
            data={cartItems}
            renderItem={({ item, index }) => renderProduct({ productId: item, index })}
            ListHeaderComponent={renderHeader()}
            ListEmptyComponent={() => (<FadeIn delay={100}><Text style={styles.emptyListText}>There is no item on the bag!</Text></FadeIn>)}
            keyExtractor={(item, index) => item}
          />

        </View>

        {cartItems.length > 0 &&

          <View>
            <ZoomIn style={styles.numberItemInBagWrapper}>
              <Card style={styles.numberItemInBag}>
                <Text style={[styles.numberItemInBagText, { opacity: 0.4 }]}>{cartItems.length} items</Text>
                {/* <Text style={styles.numberItemInBagText}>£{getTotalPrice(data.products)}</Text> */}
                <Text style={styles.numberItemInBagText}>£{getTotalPrice(cartItems)}</Text>
              </Card>
            </ZoomIn>

            <ZoomIn style={styles.btnCheckoutWrapper}>
              <Card style={styles.btnCheckout}>
                <Text style={styles.btnCheckoutText}>CHECKOUT</Text>
              </Card>
            </ZoomIn>
          </View>
        }


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

  btnCheckoutWrapper: {
    alignItems: 'center',
    marginTop: 20,

  },

  btnCheckout: {
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    width: "60%",
    borderRadius: 55
  },

  btnCheckoutText: {
    color: 'black',
    fontSize: 18,
    fontWeight: '600',
  },

  numberItemInBagWrapper: {
    alignItems: 'center',
    marginTop: 20,
  },

  numberItemInBag: {
    height: 55,
    width: "100%",
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.5)',
    shadowColor: 'rgba(255,255,255,0.5)',
    paddingHorizontal: 16,
    borderRadius: 55,
  },

  numberItemInBagText: {
    fontSize: 18,
    fontWeight: 'bold',

  },

  emptyListText:{
    color:'gray',
    textAlign:'center'
  }

});