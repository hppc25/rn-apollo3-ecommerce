import React from 'react';
import {View,TouchableOpacity, StyleSheet, TextInput} from 'react-native';
import {Svg, Path,Circle} from 'react-native-svg';

import Search from '../assets/icons/search_1.svg';
import Close from '../assets/icons/close.svg';


export function SearchButton({hasBackground}) {

  const [searchBarFocused, setSearchBarFocused] = React.useState(false);


  const onSearch = ()=>{
    console.log("onBlur")
    setSearchBarFocused(false)
  }

  const onBlur = ()=>{
    console.log("onBlur")
    setSearchBarFocused(false)
  }
  const onFocus = ()=>{
    console.log("onFocus")
    setSearchBarFocused(true)

  }
  return (
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
        {/* <Svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
      
        >
      <Circle cx={11} cy={11} r={8} />
      <Path d="M21 21l-4.35-4.35" />
    </Svg> */}
    </TouchableOpacity>
        </View>
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
  },
  input:{
      flex:1,
      fontSize:16,
      color:'#fff'
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