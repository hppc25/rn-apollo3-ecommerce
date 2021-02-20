import React from 'react';
import {StyleSheet, TouchableOpacity, View, Text, Image} from 'react-native';
import {Swipeable} from 'react-native-gesture-handler';

import { Card } from './Card';
import ChevronDown from '../assets/icons/chevron-down.svg';
import { BASE_URL } from '../config';
import { SliderUp } from '../animation/SliderUp';
import RemoveIcon from '../assets/icons/remove.svg';


const DELAY = 150;

export function CardProductList({product, showEditableArea, navigation,index, onRightPress}) {
  
  const rightActions = () =>{
    return(
      <Card style={styles.deleteWrapper} onPress={() => alert(34)}>
     
          <RemoveIcon  width="24" height="24" fill="white"></RemoveIcon>
       
      </Card>
    )
  }
  
  return (
    <Swipeable
    renderRightActions={rightActions}
    >
    <SliderUp delay={DELAY*index} >
    <Card 
        id={product.id} 
        style={styles.productCard} 
        onPress={() => {
          navigation.navigate('ProductDetails', {
            productId: product.id,
          });
        }}
    >
      <View>
        <Text style={styles.productTitle}>{product.name}</Text>
        {!showEditableArea && product && product.categories && product.categories.length>0 &&
          <Text style={styles.productCategory}>{product.categories[0].name}</Text>}
        <Text style={styles.productPrice}>{product.price}</Text>

        {showEditableArea && 
          
          <View style={styles.editContainer}>
              <TouchableOpacity>
                <Text style={styles.btnEdit}>-</Text>
              </TouchableOpacity>
              <Text style={styles.quantity}>1</Text>
              <TouchableOpacity>
                <Text style={styles.btnEdit}>+</Text>
              </TouchableOpacity>
              <Text style={styles.line}>|</Text>
              <Text style={styles.size}>42</Text>
              <TouchableOpacity style={styles.select}>
                  <ChevronDown  width="24" height="24" fill="white"></ChevronDown>
              </TouchableOpacity>
          </View>
        }
        
      </View>
      
      { product && product.thumb.length>0 && <Image
        style={styles.thumb}
        source={{uri: BASE_URL + product.thumb[0].url}}
      />}
      {/* <Text>product.name</Text> */}
    </Card></SliderUp>
    </Swipeable>
   
  );
}



const styles = StyleSheet.create({
  
  productCard:{
    paddingHorizontal:8,
    paddingVertical:8,
    marginBottom:16,
    flexDirection:'row',
    justifyContent:'space-between',
    // backgroundColor: '#f1f1f1',
  },

  productTitle:{
      fontSize:20,
      opacity:0.8
  },

  productPrice:{
    fontSize: 16,
    fontWeight: '600',
    opacity:0.5,
    marginTop:8
  },
  productCategory:{
    opacity:0.4,
    marginTop:8
  },

  thumb:{
      height:95,
      width:'40%',
      // width:'40%',
      borderRadius:24,
  },

  editContainer:{
    flexDirection:"row",
    marginTop:8,
    alignItems:'center'
  },

  btnEdit:{
    marginRight:12,
    fontSize:20,
    opacity:0.5,
    // fontWeight:'bold'
  },

  quantity:{
    marginRight:12,
    fontSize:18,
    fontWeight:'bold',
    opacity:0.8,
  },

  size:{
    marginRight:4,
    fontSize:18,
    fontWeight:'bold',
    opacity:0.8,
  },

  line:{
    marginRight:12,
    fontSize:18,
  },
  select:{
    fontSize:20,
    opacity:0.5,
  },
  deleteWrapper:{
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'white',
    width:80,
    marginLeft:12,
    height:'88%',
  }

});