import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {useMutation} from '@apollo/client';

import {BASE_URL} from '../config';
import {FavoriteIcon} from './FavoriteIcon';
import {Card} from './Card';
import {ADD_OR_REMOVE_PRODUCT_FROM_FAVORITE} from '../graphql/requests';

export function Product({product, onPress, style}) {
  const [addOrRemoveProductFromFavorite] = useMutation(
    ADD_OR_REMOVE_PRODUCT_FROM_FAVORITE,
    {
      variables: {
        productId: product.id,
      },
    },
  );

    // console.log(product.thumb)
  return (
    <Card key={product.id} style={[styles.card, style]} onPress={onPress}>
      {product && product.thumb.length>0 && <Image
        style={styles.thumb}
        source={{uri: BASE_URL + product.thumb[0].url}}
      />}
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{product.name}</Text>
        {product && product.categories && product.categories.length>0 &&
          <Text style={styles.category}>{product.categories[0].name}</Text>}
        <Text style={styles.price}>{product.price}</Text>
        <Text style={styles.description} numberOfLines={2}>{product.description}</Text>
      </View>
      <FavoriteIcon
        favorite={product.favorite}
        onPress={async () => {
          await addOrRemoveProductFromFavorite();
        }}
      />
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginVertical: 20,
  },
  thumb: {
    height: 260,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  infoContainer: {
    padding: 16,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  category: {
    fontSize: 20,
    color:'grey',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    fontWeight: '400',
    color: '#787878',
  },
});