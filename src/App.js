import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import { RunningShoesTables } from './components/RunningShoesTable';

function App() {
  const [shoesData, setShoesData] = useState([]);
  const [shoesDataHeaders, setShoesDataHeaders] = useState([]);
  const [shoesPageResponseStatus, setShoesPageResponseStatus] = useState(-1);
  const [apiResponseError, setApiResponseError] = useState('');

  const resetAllStates = () => {
    setShoesData([]);
    setShoesDataHeaders([]);
    setShoesPageResponseStatus(-1);
    setApiResponseError('');
  }

  useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get('https://store-catalog-app-1-0-0-snapshot.onrender.com/shoes?page=2');
          console.log('response entries: ' )
          console.log(Object.entries(response))
          const API_RESPONSE_DATA = response.data;
          setShoesPageResponseStatus(response.status)
          if (API_RESPONSE_DATA.success) {
            setShoesData(API_RESPONSE_DATA.data);
            setShoesDataHeaders(Object.keys(API_RESPONSE_DATA.data[0]));
          } 
        } catch (error) {
          console.error('Error fetching data:', error.message);
          setApiResponseError(error.message);
        }
      };
      fetchData();
      return resetAllStates()
    },[])

  let appPage = (
      <div className="App">
            <div>
              <RunningShoesTables 
                shoesData={shoesData} 
                shoesDataHeaders={shoesDataHeaders} 
                shoesPageResponseStatus={shoesPageResponseStatus}/>
            </div>
      </div>
  )

  if(shoesPageResponseStatus!=-1) {
    return appPage;
  } else {
    return (
      <>
        <p>{apiResponseError}</p>
        {!apiResponseError && 
          <div className='center-p-in-div'>
            <p>Wait a moment...<br />Our backend service on a free container is still starting haha😅</p>
            <p>Maybe take 1-3 minutes...</p>
          </div>}
      </>
    )
  }
}

export default App;
