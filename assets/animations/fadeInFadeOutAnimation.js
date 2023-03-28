import React, { useRef, useEffect, useContext } from "react";
import { Animated } from "react-native";
import { AddedOrRemovedContext } from "../../components/movieThumbnail";

const FadeInFadeOutAnimation = (props, {}) => {
  const { setIsAdded, setIsRemoved } = useContext(AddedOrRemovedContext);

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

export default FadeInFadeOutAnimation;
