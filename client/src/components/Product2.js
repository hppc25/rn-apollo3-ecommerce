import React from 'react';
import {Image, StyleSheet, Text, View, Animated, Easing} from 'react-native';
import {useMutation} from '@apollo/client';

import {BASE_URL} from '../config';
import {FavoriteIcon2} from './FavoriteIcon2';
import {Card} from './Card';
import {ADD_OR_REMOVE_PRODUCT_FROM_FAVORITE} from '../graphql/requests';

const AnimatedCard = Animated.createAnimatedComponent(Card);


export function Product2({product, onPress, style}) {
  const [addOrRemoveProductFromFavorite] = useMutation(
    ADD_OR_REMOVE_PRODUCT_FROM_FAVORITE,
    {
      variables: {
        productId: product.id,
      },
    },
  );

  // const animatedValue = new Animated.Value(0);
  const animatedValue = React.useRef(new Animated.Value(0)).current
  const fadeAnim = React.useRef(new Animated.Value(0)).current  // Initial value for opacity: 0

  
  React.useEffect(() => {

    Animated.parallel([

      Animated.timing(animatedValue,{
        toValue:1,
        duration:1000,
        Easing: Easing,
        useNativeDriver: true 
      }),

      Animated.timing(
            fadeAnim,
            {
              toValue: 1,
              duration: 1000,
              useNativeDriver: true
            }
          ),

    ]).start(); 
  

  })

  const scale = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0.7, 1]
  })

  const transform = [{scale}];


  return (
    <AnimatedCard key={product.id} style={[styles.card, style,
    // {opacity: fadeAnim, transform,}
    { opacity: fadeAnim, transform }
    ]} onPress={onPress}>
      {product && product.thumb.length>0 && <Image
        style={styles.thumb}
        source={{uri: BASE_URL + product.thumb[0].url}}
      />}
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{product.name}</Text>
        {/* {product && product.categories && product.categories.length>0 &&
          <Text style={styles.category}>{product.categories[0].name}</Text>} */}
      
        {/* <Text style={styles.description} numberOfLines={2}>{product.description}</Text> */}
      </View>
      <FavoriteIcon2
        favorite={product.favorite}
        onPress={async () => {
          await addOrRemoveProductFromFavorite();
        }}
      />
        <Text style={styles.price}>{product.price}</Text>
    </AnimatedCard>
  );
}

const styles = StyleSheet.create({
  card: {
    marginVertical: 20,
    backgroundColor:'#f1f1f1',
    marginHorizontal: 8
  },
  thumb: {
    height: 130,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  infoContainer: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  name: {
    fontSize: 20,
    // fontWeight: 'bold',
  },
  price: {
    fontSize: 16,
    fontWeight: '600',
    position:'absolute',
    marginLeft: 16,
    marginTop: 8,
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