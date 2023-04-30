import React from "react";
import { View } from "react-native";
import Title from "./title";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";

const withTitle = (WrappedComponent) => {
  const TitleWrapper = (props) => {
    const navigation = useNavigation();
    const route = useRoute();

    return (
      <View style={{ flex: 1 }}>
        <Title navigation={navigation} route={route} />
        <View style={{ flex: 1 }}>
          <WrappedComponent {...props} />
        </View>
      </View>
    );
  };

  return TitleWrapper;
};
export default withTitle;
