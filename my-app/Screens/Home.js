import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect, useCallback } from "react";
import { items } from "../Mock/Items";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Home = ({ navigation }) => {
  const [cartItems, setCartItems] = useState([]);
  const [numColumns, setNumColumns] = useState(2);

  useEffect(() => {
    async function getCartItems() {
      try {
        const storedCartItems = await AsyncStorage.getItem("cartItems");
        if (storedCartItems !== null) {
          setCartItems(JSON.parse(storedCartItems));
        }
      } catch (error) {
        console.log(error);
      }
    }
    getCartItems();
  }, []);

  useEffect(() => {
    async function saveCartItems() {
      try {
        await AsyncStorage.setItem("cartItems", JSON.stringify(cartItems));
      } catch (error) {
        console.log(error);
        console.log(Cart)
      }
    }
    saveCartItems();
  }, [cartItems]);

  const addItem = useCallback((item) => {
    setCartItems((prevCartItems) => {
      const itemExists = prevCartItems.some((cartItem) => cartItem.id === item.id);
      if (!itemExists) {
        return [...prevCartItems, item];
      }
      return prevCartItems;
    });
  }, []);

  const removeItem = useCallback((itemId) => {
    setCartItems((prevCartItems) => {
      return prevCartItems.filter((item) => item.id !== itemId);
    });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.subContainer}>
        {/* header */}
        <View style={styles.header}>
          <Image style={styles.icon} source={require("../assets/Menu.png")} />
          <View style={styles.headerTextContainer}>
            <Text style={styles.headerText}>Open</Text>
            <Text style={styles.headerTextSub}>Fashion</Text>
          </View>
          <View style={styles.iconContainer}>
            <TouchableOpacity>
              <Image
                style={styles.icon}
                source={require("../assets/icons8-search.png")}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate("Cart", { cartItems, removeItem })}
            >
              <Image
                style={styles.icon}
                source={require("../assets/shopping-bag.png")}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* story */}
        <View style={styles.story}>
          <Text style={styles.storyText}>OUR STORY</Text>
          <View style={styles.iconContainer}>
            <Image
              style={styles.icon}
              source={require("../assets/Listview.png")}
            />
            <Image
              style={styles.icon}
              source={require("../assets/Filter.png")}
            />
          </View>
        </View>

        {/* products */}
        <View style={styles.products}>
          <FlatList
            data={items}
            key={numColumns}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => addItem(item)}>
                <View style={styles.productContainer}>
                  <View>
                    <Image style={styles.productImage} source={item.image} />
                    <Image
                      style={styles.iconAdd}
                      source={require("../assets/add.png")}
                    />
                  </View>

                  <View>
                    <Text style={styles.itemName}>{item.name}</Text>
                  </View>

                  <View>
                    <Text style={styles.itemDescription}>
                      {item.description}
                    </Text>
                    <Text style={styles.itemPrice}>${item.price}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            )}
            columnWrapperStyle={styles.columnWrapper}
            keyExtractor={(item) => item.id}
            numColumns={numColumns}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  subContainer: {
    padding: 10,
    gap: 40,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  headerTextContainer: {
    flexDirection: "column",
    alignItems: "center",
  },
  story: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  headerText: {
    fontWeight: "bold",
    fontSize: 18,
  },
  headerTextSub: {
    fontWeight: "bold",
    fontSize: 18,
    top: -9,
  },
  storyText: {
    fontSize: 20,
  },
  iconContainer: {
    flexDirection: "row",
    gap: 20,
  },
  icon: {
    width: 26,
    height: 26,
  },
  columnWrapper: {
    justifyContent: "space-between",
    marginBottom: 10, // Optional: to add space between rows
  },

  productContainer: {
    justifyContent: "center",
    gap: 10,
    flex: 1,
    marginBottom: 20,
  },
  productImage: {
    width: 200,
    height: 250,
  },
  itemPrice: {
    color: "red",
  },
  products: {
    height: 700,
  },
  iconAdd: {
    height: 26,
    width: 26,
    position: "absolute",
    bottom: 4,
    right: 5,
  },
  itemName: {
    fontSize: 16,
    fontWeight: "500",
  },
  itemDescription: {
    fontSize: 14,
    marginBottom: 5,
  },
});
