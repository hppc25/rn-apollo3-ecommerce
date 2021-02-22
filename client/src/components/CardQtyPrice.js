import React from 'react';
import {StyleSheet, TouchableOpacity, View, Text, } from 'react-native';

import ChevronDown from '../assets/icons/chevron-down.svg';

export function CardQtyPrice({product}) {

  console.log(product)
  return (
            
  
    <View style={styles.qtySizeWrapper}>
    
      <View style={styles.qtySizeContainer}>
        <Text style={styles.qtySizeLabel}>Size</Text>
        <View style={styles.qtySizeDetail}>
            <Text style={styles.qtySizeText}>42</Text>
            <TouchableOpacity >
              <ChevronDown  width="24" height="24" fill="transparent"></ChevronDown>
          </TouchableOpacity>
        </View>
        
        </View>

        <View style={styles.qtySizeContainer}>
          <Text style={styles.qtySizeLabel}>Color</Text>
          <View style={styles.qtySizeDetail}>
              <View style={[styles.colorItem, {backgroundColor: product.color?product.color:'white'}]}></View>
              <TouchableOpacity >
                <ChevronDown  width="24" height="24" fill="transparent"></ChevronDown>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.qtySizeContainer}>
          <Text style={styles.qtySizeLabel}>QTY</Text>
          <View style={styles.qtySizeDetail}>
              <Text style={styles.qtySizeText}>1</Text>
              <TouchableOpacity >
                <ChevronDown  width="24" height="24" fill="transparent"></ChevronDown>
            </TouchableOpacity>
          </View>
        </View>

       

    </View>
    

  );
}



const styles = StyleSheet.create({
  
  qtySizeWrapper:{
    height:75,
    marginTop:20,
    paddingHorizontal:16,
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowColor: 'black',
    shadowOffset: {
      height: 0,
      width: 0,
    },
    elevation: 1,
    backgroundColor:'rgba(0,0,0,0.1)',
    borderRadius:60,
    flexDirection: 'row',
    alignItems:'center',
    justifyContent:'space-around'

  },

  qtySizeContainer:{
    alignItems:'center'
  },

  qtySizeDetail:{
    flexDirection:'row'
  },

  qtySizeText:{
      marginRight:4,
      fontSize:18,
      fontWeight:'bold',
      opacity:0.8,
  },

  qtySizeLabel:{
    fontSize:16,
    color: 'gray',
    marginBottom:3,
  },

  colorItem:{
    width: 20,
    height: 20,
    borderRadius:20,
  }

});