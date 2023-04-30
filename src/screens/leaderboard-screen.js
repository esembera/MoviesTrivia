import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { db } from "../../firebase";
import { quizTypes } from "../components/helpers/quiz-types-helper";
import { FlatList, HStack, Spacer, Box } from "native-base";
import { colorPalette } from "../../assets/theme/color-palette";
import { useState } from "react";
import Icon from "react-native-vector-icons/AntDesign";
import { Spinner } from "native-base";

const LeaderboardScreen = () => {
  const [i, setI] = useState(0);
  const [loading, setLoading] = useState(false);

  const getLeaderboards = async (i) => {
    setLoading(true);
    let data = null;
    const docRef = db.collection("leaderboards").doc(quizTypes[i]);
    await docRef.get().then((doc) => {
      // console.log("usao");
      // console.log(doc.data());
      data = doc.data();
    });
    setLoading(false);
    // console.log(data);
    return data;
  };

  const [leaderboardsData, setLeaderboardsData] = useState(null);

  useEffect(() => {
    getLeaderboards(i).then((data) => {
      if (data) {
        const dataArr = Object.entries(data);
        dataArr.sort((a, b) => b[1] - a[1]);
        const slicedDataArr = dataArr.slice(0, 10); // slice the array to only include the top 10 items
        setLeaderboardsData(slicedDataArr);
      } else {
        setLeaderboardsData(null);
      }
    });
  }, [i]);

  // getLeaderboards().then((data) => console.log(data));
  return (
    <View style={styles.container}>
      <View style={styles.parentContainer}>
        <View style={styles.insideContainerTop}>
          <Text style={styles.headingText}>Top 10 leaderboards by genre</Text>
        </View>
        <View style={styles.parentContainerBottom}>
          <View style={styles.insideContainerBottom}>
            <Icon
              name="stepbackward"
              size={22}
              style={styles.icon}
              color={colorPalette.textColor}
              onPress={() => {
                if (i === 0) {
                  setI(7);
                } else {
                  setI(i - 1);
                }
              }}
            />
            <View style={styles.textContainer}>
              <Text style={styles.leaderboardText}>{quizTypes[i]}</Text>
            </View>
            <Icon
              name="stepforward"
              size={22}
              style={styles.icon}
              color={colorPalette.textColor}
              onPress={() => {
                if (i === 7) {
                  setI(0);
                } else {
                  setI(i + 1);
                }
              }}
            />
          </View>
        </View>
        <View style={styles.parentContainerBottom}>
          <View style={styles.insideContainerBottom2}>
            <View style={styles.textContainer}>
              <Text style={styles.subtext1}>User:</Text>
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.subtext2}>Score:</Text>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.insideContainer}>
        {leaderboardsData && (
          <FlatList
            data={leaderboardsData}
            renderItem={({ item }) => (
              <Box
                bg={colorPalette.primaryColor}
                p={4}
                rounded="md"
                style={{ margin: 5 }}
              >
                <HStack space={2} alignItems="center">
                  <Text style={{ color: colorPalette.textColor }}>
                    {item[0]}
                  </Text>
                  <Spacer />
                  <Text style={{ color: colorPalette.textColor }}>
                    {item[1]}
                  </Text>
                </HStack>
              </Box>
            )}
            keyExtractor={(item) => item[0]}
          />
        )}
      </View>
      {loading && (
        <View style={styles.spinnerContainer}>
          <Spinner size="lg" color={colorPalette.textColor} />
        </View>
      )}
    </View>
  );
};

export default LeaderboardScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  insideContainer: {
    flex: 1,
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "center",
  },
  headingText: {
    fontSize: 20,
    color: colorPalette.textColor,
    fontWeight: "700",
  },
  leaderboardText: {
    fontSize: 18,
    color: colorPalette.textColor,
    fontWeight: "700",
    textAlign: "center",
  },
  subtext1: {
    fontSize: 12,
    color: colorPalette.textColor,
    fontWeight: "700",
    textAlign: "left",
    marginLeft: "5%",
  },
  subtext2: {
    fontSize: 12,
    color: colorPalette.textColor,
    fontWeight: "700",
    textAlign: "right",
    marginRight: "5%",
  },
  parentContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  insideContainerTop: {
    marginVertical: 10,
  },
  parentContainerBottom: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  insideContainerBottom: {
    marginVertical: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginHorizontal: "5%",
  },
  textContainer: {
    flex: 1,
    marginHorizontal: 10,
  },
  insideContainerBottom2: {
    marginVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  spinnerContainer: {
    position: "absolute",
    top: "80%",
    left: "50%",
    right: "50%",
  },
});
