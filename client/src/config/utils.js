import Animated, { Easing } from 'react-native-reanimated';


  export const colors = [
    '#69d2e7',
    '#a7dbd8',
    '#e0e4cc',
    '#f38630',
    '#fa6900',
    '#fe4365',
    '#fc9d9a',
    '#f9cdad',
    '#c8c8a9',
    '#83af9b',
    '#ecd078',
    '#d95b43',
    '#c02942',
    '#53777a',
  ];



  const {
    Value,
    block,
    cond,
    set,
    startClock,
    stopClock,
    debug,
    timing,
    clockRunning,
    
  } = Animated;

  export function runTiming(clock, value, dest) {
    const state = {
      finished: new Value(0),
      position: new Value(0),
      time: new Value(0),
      frameTime: new Value(0)
    };
  
    const config = {
      duration: 1000,
      toValue: new Value(0),
      easing: Easing.inOut(Easing.ease)
    };
  
    return block([
      cond(clockRunning(clock), 0, [
        set(state.finished, 0),
        set(state.time, 0),
        set(state.position, value),
        set(state.frameTime, 0),
        set(config.toValue, dest),
        startClock(clock)
      ]),
      timing(clock, state, config),
      cond(state.finished, debug('stop clock', stopClock(clock))),
      state.position
    ]);
  }