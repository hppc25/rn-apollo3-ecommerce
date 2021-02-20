import React from 'react'
import { FlatList, Image, StyleSheet, View, Text, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { useQuery } from '@apollo/client';
import Swiper from 'react-native-swiper'

// import { Error, Loading } from '../components';
import { Error } from '../components/Error';
import { Loading } from '../components/Loading';
import { SwipeDot } from '../components/SwipeDot';
import { GET_COMMENTS_BY_PRODUCT, GET_PRODUCT } from '../graphql/requests';
import { AddComment } from '../components/AddComment';
import { Card } from '../components/Card';
import { BASE_URL } from '../config';
import { FavoriteIcon } from '../components/FavoriteIcon';
import ArrowBack from '../assets/icons/arrow-left-circle.svg';
import { FadeIn } from '../animation/FadeIn';
import { ZoomIn } from '../animation/ZoomIn';
import ShoppingBag from '../assets/icons/shopping-bag.svg';
import { colors } from '../config/utils';
import { CardQtyPrice } from '../components/CardQtyPrice';
import { cartItemsVar } from '../graphql/cache';


export function ProductDetails({ route, navigation }) {

  const { productId } = route.params;
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
  product = !productData ? null : productData.product;


  function renderComment({ item: comment }) {
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
    const { product } = productData;
    return (
      <>

        <AddComment productId={product.id} />
        {commentsLoading && <Loading />}
        {commentsError && <Error error={commentsError} />}
        {renderNumberOfComments()}

      </>
    );
  }

  return (
    <SafeAreaView>
      <ScrollView>

        {
          product && product.thumb && product.thumb.length > 0 && <Swiper
            style={styles.swiper}
            dot={<SwipeDot></SwipeDot>}
            activeDot={<SwipeDot active></SwipeDot>}
            paginationStyle={{ top: 15, right: 15, bottom: null, left: null }}
          >
            {product.thumb.map((item, key) => (

              <Image
                style={styles.thumb}
                source={{ uri: BASE_URL + item.url }}
                key={key}
                resizeMode="cover"
              />

            )

            )}
          </Swiper>
        }

        <View style={styles.pageBody}>


          <FadeIn style={styles.infoContainer}>
            <Text style={styles.name}>{product.name}</Text>
            {product && product.categories && product.categories.length > 0 &&
              <Text style={styles.category}>{product.categories[0].name}</Text>}
            <Text style={styles.price}>{product.price}</Text>
            <Text style={styles.description} >{product.description}</Text>
          
            <CardQtyPrice product={product}></CardQtyPrice>
          </FadeIn>
          
            <FavoriteIcon
              favorite={product.favorite}
              style={styles.favoriteBtn}
            // onPress={async () => {
            //   await addOrRemoveProductFromFavorite();
            // }}
            />

              <ZoomIn style={styles.addToBagWrapper}>
                <Card style={styles.btnAddToBag} onPress={()=> cartItemsVar([...cartItemsVar(), product.id])}>
                  <Text style={styles.btnAddToBagText}>Add To Bag</Text>
                  <ShoppingBag style={{marginLeft:20}} width="24" height="24" fill="white"></ShoppingBag>
                </Card>
              </ZoomIn>
         
         <FadeIn>
          <FlatList
            data={commentsData ? commentsData.comments : []}
            renderItem={renderComment}
            ListHeaderComponent={renderHeader()}
            contentContainerStyle={styles.commentsContainer}
          />
          </FadeIn>


        </View>

        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.btnBack}>
          <ArrowBack width="32" height="32" fill="black"></ArrowBack>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>


  );

}

const styles = StyleSheet.create({

  commentsContainer: {
    paddingVertical: 16,
    marginTop: 12
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
    height: 280
  },

  thumb: {
    height: 280,
    width: '100%'
  },

  pageBody: {
    backgroundColor: '#fafafa',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    paddingHorizontal:20,
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
    color: 'grey',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    fontWeight: '400',
    color: '#787878',
  },

  favoriteBtn: {
    right: 12,
    top: -34,
  },

  btnBack: {
    position: 'absolute',
    left: 8,
    top: 8
  },

  addToBagWrapper:{
    alignItems:'center', 
    marginTop:20,
  },

  btnAddToBag:{
    height:55,
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'white',
    width:"100%",
    borderRadius:55,
    
  },

  btnAddToBagText:{
    color:'black',
    fontSize:18,
    fontWeight:'600',
  },

 
});