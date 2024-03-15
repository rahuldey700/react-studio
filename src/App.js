import "./App.css";
import { useEffect, useState } from "react";
import BakeryItem from './components/BakeryItem.js';
import bakeryData from "./assets/bakery-data.json";



/* ####### DO NOT TOUCH -- this makes the image URLs work ####### */
bakeryData.forEach((item) => {
  item.image = process.env.PUBLIC_URL + "/" + item.image;
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

  const addToCart = (item) => {
    console.log('adding to cart:', item)

    setCart(prev_cart => [...prev_cart, item])
  }

  const bakeryItemsJSX = data.map((item, index) => (
    <div key={index}>
      {/* <p>{`Bakery Item ${index}, ${bakeryItem.description}, ${bakeryItem.price}`}</p> */}
      <BakeryItem item={item} />
      <button onClick={() => addToCart(item)}>Add to Cart</button>
    </div>
  ));

const cartJSX = cart.length === 0 ? <p>Cart is empty</p>
: cart.map((item, index) => <p key={index}>{item.name}: $ {item.price}</p>)

return (
  <div className="App">
    {/* {data.map((bakeryItem, index) => (
      <div key={index}>
        <h2>{bakeryItem.name}</h2>
        <p>{bakeryItem.description}</p>
        <p>{bakeryItem.price}</p>
        <img src={bakeryItem.image} alt={bakeryItem.name} />
        <button onClick={() => addToCart(bakeryItem)}>Add to Cart</button>
      </div>
    ))} */}
    <h1>My Bakery</h1> {/* TODO: personalize your bakery (if you want) */}
      {cartJSX}
    {bakeryItemsJSX}

    <button onClick={() => {
      console.log('filtering data')
      setData(prev_data => prev_data.filter((item, index) => index % 2 === 0))
    }}>filter</button>

    <button onClick={() => {
      console.log('restoring data')
      setData(bakeryData) // original data
    }}>clear</button>
  </div>
);
}

export default App;
