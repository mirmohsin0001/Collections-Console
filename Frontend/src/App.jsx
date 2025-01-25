import React, { useState, useEffect } from 'react';
import './App.css'
import downArrow from './assets/downArrow.png'
import upArrow from './assets/upArrow.png'


function App() {
  const [collections, setCollections] = useState([]);
  const [selectedCollection, setSelectedCollection] = useState(null);
  const [collectionData, setCollectionData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const response = await fetch('https://collections-console.onrender.com/api/collections');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const collectionNames = await response.json();
        setCollections(collectionNames);
      } catch (err) {
        console.error('Fetch collections error:', err);
        setError('Error fetching collections.');
      } finally {
        setLoading(false);
      }
    };

    fetchCollections();
  }, []);

  useEffect(() => {
    if (selectedCollection) {
      const fetchData = async () => {
        try {
          const response = await fetch(`https://collections-console.onrender.com/api/data/${selectedCollection}`);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          setCollectionData(data);
        } catch (err) {
          console.error('Fetch data error:', err);
          setError('Error fetching data from collection.');
        }
      };

      fetchData();
    }
  }, [selectedCollection]);

  const handleCollectionSelect = (collectionName) => {
    setSelectedCollection(collectionName);
  };

  if (loading) {
    return <div>Loading collections...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth'
    });
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  return (
    <div>
      <img width={32} onClick={scrollToBottom} className='scrollDownBtn' src={downArrow} alt="img" />
      <img width={32} onClick={scrollToTop} className='scrollUpBtn' src={upArrow} alt="img" />
      <h1>Collections</h1>
      <div>
        {collections.map((collection) => (
          <button key={collection} onClick={() => handleCollectionSelect(collection)}>
            {collection}
          </button>
        ))}
      </div>

      {selectedCollection && (
        <div>
          <h2>Data from {selectedCollection}</h2>
          <ol>
            {collectionData.map((item) => (
              <li key={item._id}>
                {Object.entries(item).map(([key, value]) => (
                  <div key={key}>
                    <strong>{key}:</strong> {JSON.stringify(value)} {/* Stringify for complex values */}
                  </div>
                ))}
                <br />
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}

export default App;