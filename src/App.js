import './App.css';
import React, { useState, useEffect } from 'react';

import ShoppingForm from './Components/ShoppingForm/ShoppingForm';
import ShoppingList from './Components/ShoppingList/ShoppingList';

const API_URL_PREFIX = "https://node-js-akqk.onrender.com";

function App() {

  const [shoppingList, setShoppingList] = useState([]);

  function loadData() {
        fetch(`${API_URL_PREFIX}/api/list`)
          .then((x) => x.json())
          .then((response) => {
            setShoppingList(response);
          });
  }

  useEffect(loadData, [])

  function addItem(item, quantity) {
    fetch(`${API_URL_PREFIX}/api/list/new`, {
      method: "POST",
      body: JSON.stringify({
        item,
        quantity,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      mode: "cors",
    })
      .then((x) => x.json())
      .then(loadData);
  }

  return (
      <div className='App'>
          <header className='App-header'>
            <h1>Shopping List</h1>
          </header>
          <main>
              <ShoppingForm addItem={addItem}/>
              <ShoppingList items={shoppingList} />
          </main>
      </div>
  )
}

export default App;