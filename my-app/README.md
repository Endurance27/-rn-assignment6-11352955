ADD TO CART FUNCTIONALITY

The addItem function is used to add items to the cart. When an item is pressed, the addItem function is called with the item as an argument. This function checks if the item already exists in the cart using the some method. If the item does not exist, it is added to the cart by updating the cartItems state.

const addItem = useCallback((item) => {
  setCartItems((prevCartItems) => {
    const itemExists = prevCartItems.some((cartItem) => cartItem.id === item.id);
    if (!itemExists) {
      return [...prevCartItems, item];
    }
    return prevCartItems;
  });
}, []);

DISPLAYING THE LIST ITEMS

The list of items is displayed using a FlatList component. The data prop is set to the items array, which is imported from the ../Mock/Items file. The renderItem prop is a function that returns a TouchableOpacity component for each item in the list. When an item is pressed, the addItem function is called with the item as an argument.

<FlatList
  data={items}
  key={numColumns}
  renderItem={({ item }) => (
    <TouchableOpacity onPress={() => addItem(item)}>
      <View style={styles.productContainer}>
        {/* item details */}
      </View>
    </TouchableOpacity>
  )}
  columnWrapperStyle={styles.columnWrapper}
  keyExtractor={(item) => item.id}
  numColumns={numColumns}
  showsVerticalScrollIndicator={false}
/>

CART ITEMS STORAGE

The cart items are stored in the device's storage using AsyncStorage. When the component mounts, the getCartItems function is called to retrieve the stored cart items and update the cartItems state. When the cartItems state changes, the saveCartItems function is called to save the updated cart items to the storage.

NAVIGATION TO CART SCREEN

When the shopping bag icon is pressed, the app navigates to the Cart screen, passing the cartItems and removeItem functions as props. The removeItem function is used to remove items from the cart.

<TouchableOpacity
  onPress={() => navigation.navigate("Cart", { cartItems, removeItem })}
>
  <Image
    style={styles.icon}
    source={require("../assets/shopping-bag.png")}
  />
</TouchableOpacity>

IMPORTANT NOTES

Make sure to import the items array from the correct file.
The addItem and removeItem functions are memoized using useCallback to prevent unnecessary re-renders.
The cartItems state is updated using the setCartItems function, which is called with a callback function that returns the updated cart items.
The AsyncStorage functions are called with try-catch blocks to handle any errors that may occur.
![alt text](<assets/Screenshot 2024-07-03 at 5.58.57 PM.png>)






Cart Component 

Overview
The Cart component is a React Native component that displays a user's shopping cart. It retrieves the cart items from AsyncStorage and allows the user to remove items from the cart. The component also calculates the total price of the items in the cart and provides a checkout button.

Features
Retrieves cart items from AsyncStorage
Displays cart items with product image, name, description, and price
Allows user to remove items from the cart
Calculates the total price of the items in the cart
Provides a checkout button

Props
route: The route object passed from the navigation system
navigation: The navigation object passed from the navigation system


State
cartItems: An array of cart items, initialized to an empty array


Effects
useEffect with initCartItems function: Retrieves cart items from AsyncStorage and sets the cartItems state

useEffect with saveCartItems function: Saves the cartItems state to AsyncStorage

useCallback with removeItem function: Removes an item from the cartItems state
![alt text](<assets/Screenshot 2024-07-03 at 6.32.09 PM.png>)
![alt text](<assets/Screenshot 2024-07-03 at 6.31.56 PM.png>)

