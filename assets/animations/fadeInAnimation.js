import React, { useRef, useEffect, useContext } from "react";
import { Animated } from "react-native";
import { AddedOrRemovedContext } from "../../src/components/movieThumbnail";

//fade in, fade out animation used for displaying info message when adding or removing the movie from favourites
const FadeInAnimation = (props, {}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0

  const fadeIn = () => {
    return new Promise((resolve) => {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start(() => resolve());
    });
  };

  useEffect(() => {
    const runAnimations = async () => {
      await fadeIn();
    };
    runAnimations();
  }, [fadeAnim]);

  return (
    <Animated.View // Special animatable View
      style={{
        ...props.style,
        opacity: fadeAnim, // Bind opacity to animated value
      }}
    >
      {props.children}
    </Animated.View>
  );
};

export default FadeInAnimation;
