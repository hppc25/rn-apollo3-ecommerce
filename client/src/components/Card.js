import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
/**
 * I changed to a class component because Animated.createAnimatedComponent
 *  does not support stateless functional components 
 */
// export function Card({style, children, onPress}) {
//   return (
//     <TouchableOpacity style={[styles.card, style]} onPress={onPress}>
//       {children}
//     </TouchableOpacity>
//   );
// }

export class Card extends React.Component {

  constructor(props){
    super()
  }
  render() {
   const  {style, children, onPress} = this.props;
    return (
    <TouchableOpacity style={[styles.card, style]} onPress={onPress}>
    {children}
    </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 16,
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowColor: 'black',
    shadowOffset: {
      height: 0,
      width: 0,
    },
    elevation: 1,
  },
});