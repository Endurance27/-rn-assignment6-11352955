import React, { useState, useEffect, useCallback } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Cart = ({ route, navigation }) => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    async function initCartItems() {
      try {
        const storedCartItems = await AsyncStorage.getItem("cartItems");
        if (storedCartItems !== null) {
          setCartItems(JSON.parse(storedCartItems));
        } else if (route.params?.cartItems) {
          setCartItems(route.params.cartItems);
        } else {
          setCartItems([]);
        }
      } catch (error) {
        console.error("Error initializing cart items:", error);
      }
    }
    initCartItems();
  }, [route.params]);

  useEffect(() => {
    async function saveCartItems() {
      try {
        await AsyncStorage.setItem("cartItems", JSON.stringify(cartItems));
      } catch (error) {
        console.error("Error saving cart items:", error);
        console.log(Cart);
      }
    }
    saveCartItems();
  }, [cartItems]);

  const removeItem = useCallback((itemId) => {
    setCartItems((prevCartItems) =>
      prevCartItems.filter((item) => item.id !== itemId)
    );
  }, []);

  const totalPrice = cartItems.reduce((total, item) => total + item.price, 0);

  const handleCheckout = () => {
    // Add navigation or checkout logic here
    console.log("Checkout clicked!");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.subContainer}>
        <View style={styles.header}>
          <View style={styles.headerTextContainer}>
            <Text style={styles.headerText}>Open</Text>
            <Text style={styles.headerTextSub}>Fashion</Text>
          </View>
          <Image
            style={styles.icon}
            source={require("../assets/icons8-search.png")}
          />
        </View>

        <View style={styles.checkoutTextHeader}>
          <Text style={styles.checkOutHeader}>CHECKOUT</Text>
        </View>

        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.cartContainer}>
            {cartItems.length > 0 ? (
              cartItems.map((item, index) => (
                <View key={index} style={styles.cartItem}>
                  <Image style={styles.productImage} source={item.image} />
                  <View style={styles.cartItemText}>
                    <Text style={styles.itemName}>{item.name}</Text>
                    <Text style={styles.itemDescription}>
                      {item.description}
                    </Text>
                    <Text style={styles.itemPrice}>${item.price}</Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => removeItem(item.id)} // Pass itemId to removeItem
                    style={styles.iconContainer}
                  >
                    <Image
                      style={styles.iconCancel}
                      source={require("../assets/cancel.png")}
                    />
                  </TouchableOpacity>
                </View>
              ))
            ) : (
              <Text style={styles.text}>Your Cart is Empty</Text>
            )}
          </View>
        </ScrollView>

        <View style={styles.checkOutSection}>
          <View style={styles.totalPrice}>
            <Text>EST TOTAL</Text>
            <Text>${totalPrice.toFixed(2)}</Text>
          </View>
          <TouchableOpacity
            style={styles.checkOutButton}
            onPress={handleCheckout}
          >
            <Image
              style={styles.iconTint}
              source={require("../assets/shopping-bag.png")}
            />
            <Text style={styles.checkoutText}>Checkout</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Cart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  subContainer: {
    padding: 10,
    justifyContent: "space-between",
    height: "100%",
  },
  header: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 150,
    alignItems: "center",
  },
  headerTextContainer: {
    flexDirection: "column",
    alignItems: "center",
  },
  icon: {
    width: 26,
    height: 26,
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
  checkoutTextHeader: {
    justifyContent: "center",
    alignItems: "center",
  },
  checkOutHeader: {
    fontSize: 18,
  },
  scrollView: {
    flex: 1,
  },
  cartContainer: {
    marginVertical: 10,
  },
  cartItem: {
    flexDirection: "row",
    alignItems: "start",
    marginBottom: 20,
    paddingVertical: 10,
  },
  productImage: {
    resizeMode: "cover",
    borderRadius: 8,
    marginRight: 10,
  },
  cartItemText: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: "500",
  },
  itemDescription: {
    fontSize: 14,
    marginBottom: 5,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: "bold",
  },
  iconCancel: {
    width: 20,
    height: 20,
    tintColor: "red",
  },
  iconContainer: {
    padding: 10,
  },
  text: {
    textAlign: "center",
    fontSize: 16,
    marginTop: 20,
  },
  checkOutSection: {
    paddingVertical: 10,
    alignItems: "center",
  },
  totalPrice: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    paddingHorizontal: 20,
    width: "100%",
  },
  checkOutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
    width: "100%",
    marginBottom: 10,
  },
  iconTint: {
    width: 22,
    height: 22,
    tintColor: "white",
    marginRight: 10,
  },
  checkoutText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});
