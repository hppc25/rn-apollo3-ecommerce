import React from 'react';
import {View,TouchableOpacity, StyleSheet, TextInput, ScrollView, Animated} from 'react-native';
import {Svg, Path,Circle} from 'react-native-svg';

import Search from '../assets/icons/search_1.svg';
import Close from '../assets/icons/close.svg';

export function SearchButton({hasBackground , children}) {

  const [searchBarFocused, setSearchBarFocused] = React.useState(false);
  const fadeAnimation = React.useRef(new Animated.Value(0)).current // Initial value for opacity: 0

  React.useEffect(() => {
    fadeIn();
  },[])
  const onSearch = ()=>{
    console.log("onBlur")
    setSearchBarFocused(false)
    fadeIn()
  }

  const onBlur = ()=>{
    console.log("onBlur")
    setSearchBarFocused(false)
    fadeIn()
  }
  const onFocus = ()=>{
    console.log("onFocus")
    setSearchBarFocused(true)
    fadeOut()
  }
 
  const fadeIn = () => {
    Animated.timing(fadeAnimation, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const fadeOut = () => {
    Animated.timing(fadeAnimation, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  return (
    <ScrollView >
      <View style={{backgroundColor:'transparent', paddingHorizontal:12}}>
    <View style={styles.container}>
        <TextInput 
            style={styles.input}
            placeholder={'Find your shoes'}
            onBlur={onBlur}
            onFocus={onFocus}
            ></TextInput>

        <TouchableOpacity 
          style={styles.btnSearch}
          onPress={onSearch} 
          >

          { searchBarFocused ?
            <Close width="24" height="24" fill="black"></Close>:
            <Search width="24" height="24" fill="black"></Search>
          }
  
    </TouchableOpacity>

        </View>
    
        <Animated.View
          style={[
            styles.fadingContainer,
            {
              opacity: fadeAnimation
            }
          ]}
        >
            {children}
        </Animated.View>
        
    </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f8f8f8', 
        height:55,
        borderRadius:30,
        flexDirection:'row',
        alignItems:'center',
        paddingLeft: 20,
        paddingRight: 10,
        shadowOpacity: 0.2,
        shadowRadius: 4,
        shadowColor: 'black',
        shadowOffset: {
          height: 0,
          width: 0,
        },
        elevation: 1,
        marginVertical:10,
        marginHorizontal:0
  },
  input:{
      flex:1,
      fontSize:16,
      color:'#fff',
  },

  btnSearch:{
    height:40,
    width:40,
    borderRadius:32,
    backgroundColor: 'black',
    justifyContent:'center',
    alignItems:'center'

  }
});