import './App.css';
import Card from './components/Card'
import { useState, useEffect } from 'react';

function App() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("https://my-json-server.typicode.com/Codeinwp/front-end-internship-api/posts")
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [])

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {

    const posts = [];

    for (let i = 0; i < items.length; ++i) {
      posts.push(
        <Card items={items[i]} key={i}/>);
    }

    return (
      <div className="App">
      <div className="AppContainer">
        <div className="Frame">
        {posts}
        </div>
      </div>
     </div>
    );
  }
}

export default App;
