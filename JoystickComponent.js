// src/JoystickComponent.js
import React, { useRef, useEffect } from 'react';
import { View, PanResponder, Animated } from 'react-native';

const JoystickComponent = ({ onDirectionChange }) => {
 const pan = useRef(new Animated.ValueXY()).current;
 const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: () => {
        Animated.spring(pan, {
          toValue: { x: 0, y: 0 },
          useNativeDriver: false,
        }).start();
        onDirectionChange(0, 0); // Reset direction when released
      },
    })
 ).current;

 useEffect(() => {
    pan.addListener(({ x, y }) => {
      const direction = calculateDirection(x, y);
      onDirectionChange(direction.x, direction.y);
    });

    return () => {
      pan.removeAllListeners();
    };
 }, [pan]);

 const calculateDirection = (x, y) => {
    // Calculate direction based on x and y values
    // This is a simplified example. You might need to adjust the logic
    // to fit your specific requirements.
    return { x: x / 100, y: y / 100 };
 };

 return (
    <View
      style={{
        width: 100,
        height: 100,
        overflow: 'hidden',
        borderRadius: 50,
        borderWidth: 1,
        borderColor: 'black',
      }}
      {...panResponder.panHandlers}
    >
      <Animated.View
        style={{
          width: 50,
          height: 50,
          borderRadius: 25,
          backgroundColor: 'blue',
          transform: [{ translateX: pan.x }, { translateY: pan.y }],
        }}
      />
    </View>
 );
};

export default JoystickComponent;
