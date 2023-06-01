import React from "react";
import { View } from "react-native";
import Title from "./title";
import { useNavigation, useRoute } from "@react-navigation/native";

const withTitle = (WrappedComponent) => {
  const TitleWrapper = (props) => {
    const navigation = useNavigation();
    const route = useRoute();

    return (
      <View style={{ flex: 1 }} accessible={true}>
        <Title navigation={navigation} route={route} />
        <View style={{ flex: 1 }} testID="outerContainer">
          <WrappedComponent {...props} />
        </View>
      </View>
    );
  };

  return TitleWrapper;
};
export default withTitle;
