import "./App.css";
import { useEffect, useState } from "react";
import bakeryItem from './components/BakeryItem.js';
import bakeryData from "./assets/bakery-data.json";


/* ####### DO NOT TOUCH -- this makes the image URLs work ####### */
bakeryData.forEach((bakeryItem) => {
  bakeryItem.image = process.env.PUBLIC_URL + "/" + bakeryItem.image;
});
/* ############################################################## */

function App() {
  // TODO: use useState to create a state variable to hold the state of the cart
  /* add your cart state code here */

  const [data, setData] = useState(bakeryData);
  const [cart, setCart] = useState([]); 

  const loadData = () => {
    setData([...bakeryData]);
  }

  useEffect(() => {
    console.log('component loaded', data.length)
    loadData();
  }, []) 

  useEffect(() => {
    console.log('cart changed: ', cart.length)
    console.log('data: ', data.length)
  }, [cart, data])

  const addToCart = (bakeryItem) => {
    console.log('adding to cart:', bakeryItem)

    setCart(prev_cart =>
      [...prev_cart, bakeryItem]
        .filter(price => bakeryItem.price < 5))
  }

  const bakeryItemsJSX = data.map((bakeryItem, index) => (
    <div key={index}>
      <p>{`Bakery Item ${index}, ${bakeryItem.description}, ${bakeryItem.price}`}</p>
      <button onClick={() => addToCart(bakeryItem)}>Add to Cart</button>
    </div>
  ));

const cartJSX = cart.length === 0 ? <p>Cart is empty</p>
: cart.map((item, index) => <p key={index}>{item.name}: $ {item.price}</p>)

return (
  <div className="App">
    <h1>My Bakery</h1> {/* TODO: personalize your bakery (if you want) */}
      {cartJSX}
    {bakeryItemsJSX}

    <button onClick={() => {
      console.log('filtering data')
      setData(prev_data => prev_data.filter((bakeryItem, index) => index % 2 === 0))
    }}>filter</button>

    <button onClick={() => {
      console.log('restoring data')
      setData(bakeryData) // original data
    }}>clear</button>

    <div>
      <h2>Cart</h2>
      {/* TODO: render a list of items in the cart */}
    </div>
  </div>
);
}

export default App;
