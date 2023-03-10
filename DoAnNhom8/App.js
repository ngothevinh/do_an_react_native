import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './src/screens/Home';
import MyCart from './src/screens/MyCart';
import ProductInfo from './src/screens/ProductInfo';
import Register from './src/screens/Register';
import Login from './src/screens/Login';
const App = () => {
 
  const Stack = createNativeStackNavigator();

  return (
   <NavigationContainer>
      <Stack.Navigator
          screenOptions={{
              headerShown: false,
            }}
        >
        <Stack.Screen name="Login" component={Login}   />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Home" component={Home}   />
        <Stack.Screen name="ProductInfo" component={ProductInfo}   />
        <Stack.Screen name="MyCart" component={MyCart}   />
        
      </Stack.Navigator>
   </NavigationContainer>
  )
}
export default App;
