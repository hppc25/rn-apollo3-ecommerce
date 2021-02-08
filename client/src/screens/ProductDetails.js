import React from 'react'
import {FlatList,Image, StyleSheet, View,Text, ScrollView} from 'react-native';
import {useQuery} from '@apollo/client';
import Swiper from 'react-native-swiper'

// import { Error, Loading } from '../components';
import { Error } from '../components/Error';
import { Loading } from '../components/Loading';
import { Product } from '../components/Product';
import { SwipeDot } from '../components/SwipeDot';
import { GET_COMMENTS_BY_PRODUCT, GET_PRODUCT } from '../graphql/requests';
import { AddComment } from '../components/AddComment';
import { Card } from '../components/Card';
import { BASE_URL } from '../config';
import { FavoriteIcon } from '../components/FavoriteIcon';

export function ProductDetails({route,navigation}) {

  const {productId} = route.params;
  const {
    loading: productLoading,
    error: productError,
    data: productData,
  } = useQuery(GET_PRODUCT, {
    variables: {
      productId,
    },
    fetchPolicy: 'cache-first',
  });


  const {
    loading: commentsLoading,
    error: commentsError,
    data: commentsData,
  } = useQuery(GET_COMMENTS_BY_PRODUCT, {
    variables: {
      productId,
    },
    fetchPolicy: 'cache-and-network',
  });


  if (productLoading) {
    return <Loading hasBackground />;
  }

  if (productError) {
    return <Error error={productError} />;
  }

    // const {product} = productData;
    let product = null;
    product = !productData? null: productData.product;

    


    function renderComment({item: comment}) {
      return (
        <Card id={comment.id} style={styles.commentCard}>
          <Text>{comment.comment}</Text>
        </Card>
      );
    }
  
    function renderNumberOfComments() {
      return (
        <Text style={styles.title}>
          {commentsData && commentsData.comments.length > 0
            ? `Comments [${commentsData.comments.length}]`
            : 'No comments found'}
        </Text>
      );
    }
  
    function renderHeader() {
      const {product} = productData;
      return (
        <>
          

          {/* <Product product={product} /> */}
         
          <AddComment productId={product.id} />
          {commentsLoading && <Loading />}
          {commentsError && <Error error={commentsError} />}
          {renderNumberOfComments()}
          
        </>
      );
    }

    return (

      <ScrollView>

        {
            product && product.thumb && product.thumb.length>0 && <Swiper
              style={styles.swiper}
              dot={<SwipeDot></SwipeDot>}
              activeDot={<SwipeDot active></SwipeDot>}
              paginationStyle={{top:15, right:15, bottom:null, left:null}}
              >
                {product.thumb.map( (item, key) => (

                    <Image
                      style={styles.thumb}
                      source={{uri: BASE_URL + item.url}}
                      key={key}
                      resizeMode="cover"
                    />
                
                )

                )}
              </Swiper>
            }

         <View style={styles.pageBody}>


            <View style={styles.infoContainer}>
            <Text style={styles.name}>{product.name}</Text>
            {product && product.categories && product.categories.length>0 &&
              <Text style={styles.category}>{product.categories[0].name}</Text>}
            <Text style={styles.price}>{product.price}</Text>
            <Text style={styles.description} >{product.description}</Text>
          </View>


          <FavoriteIcon
            favorite={product.favorite}
            style={styles.favoriteBtn}
            // onPress={async () => {
            //   await addOrRemoveProductFromFavorite();
            // }}
          />


      <FlatList
        data={commentsData ? commentsData.comments : []}
        renderItem={renderComment}
        ListHeaderComponent={renderHeader()}
        contentContainerStyle={styles.commentsContainer}
      />

          
         </View>

      </ScrollView>


    
    );

}

const styles = StyleSheet.create({

    commentsContainer: {
      padding: 8,
      marginTop:12
    },
    commentCard: {
      padding: 16,
      marginVertical: 8,
    },
    title: {
      marginTop: 16,
      marginBottom: 8,
    },

    swiper: {
      height:280
    },

    thumb:{
      height:280,
      width:'100%'
    },

    pageBody:{
      backgroundColor: '#fafafa',
      borderTopLeftRadius: 50,
      borderTopRightRadius: 50,
      // marginBottom: -30,
      minHeight: 600,
      width: '100%',

      shadowOpacity: 0.2,
      shadowRadius: 4,
      shadowColor: 'black',
      shadowOffset: {
        height: 0,
        width: 0,
      },
      elevation: 1,
    },


    infoContainer: {
      paddingTop: 26,
      paddingHorizontal: 18,
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

    favoriteBtn:{
      right: 12,
      top: -34,
    },

  });