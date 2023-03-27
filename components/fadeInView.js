import React, { useRef, useEffect, useContext } from "react";
import { Animated } from "react-native";
import { addedContext } from "./movieThumbnail";
import { removedContext } from "./movieThumbnail";

const FadeInView = (props, {}) => {
  const { setIsAdded } = useContext(addedContext);
  const { setIsRemoved } = useContext(removedContext);

  const fadeAnim = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0

  const fadeIn = () => {
    return new Promise((resolve) => {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }).start(() => resolve());
    });
  };

  const fadeOut = () => {
    return new Promise((resolve) => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }).start(() => resolve());
    });
  };

  useEffect(() => {
    const runAnimations = async () => {
      await fadeIn();
      await fadeOut();
      setIsAdded(false);
      setIsRemoved(false);
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

export default FadeInView;
