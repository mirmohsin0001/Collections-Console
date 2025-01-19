import React, { useState, useEffect } from 'react';

function App() {
  const [collections, setCollections] = useState([]);
  const [selectedCollection, setSelectedCollection] = useState(null);
  const [collectionData, setCollectionData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const response = await fetch('https://your-backend-url/api/collections'); 
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
          const response = await fetch(`https://your-backend-url/api/data/${selectedCollection}`);
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

  return (
    <div>
      <h1>Collections</h1>
      <ul>
        {collections.map((collection) => (
          <li key={collection} onClick={() => handleCollectionSelect(collection)}>
            {collection}
          </li>
        ))}
      </ul>

      {selectedCollection && (
        <div>
          <h2>Data from {selectedCollection}</h2>
          <ul>
            {collectionData.map((item) => (
              <li key={item._id}> 
                {/* Display the data from the selected collection here */}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;