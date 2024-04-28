import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import { RunningShoesTables } from './components/RunningShoesTable';

function App() {
  const [shoesData, setShoesData] = useState([]);
  const [shoesDataHeaders, setShoesDataHeaders] = useState([]);
  const [shoesPageResponseStatus, setShoesPageResponseStatus] = useState(-1);
  const [apiResponseError, setApiResponseError] = useState('');

  // pagination
  const [pageNumber, setPageNumber] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [countPagination, setCountPagination] = useState(0);

  const resetAllStates = () => {
    setShoesData([]);
    setShoesDataHeaders([]);
    setShoesPageResponseStatus(-1);
    setApiResponseError('');
  }

  useEffect(() => {
      const fetchData = async () => {
        try {
          let urlGet = `https://store-catalog-app-1-0-0-snapshot.onrender.com/shoes?page=${pageNumber}&per_page=${perPage}`
          const response = await axios.get(urlGet);
          const API_RESPONSE_DATA = response.data;
          setShoesPageResponseStatus(response.status)
          if (API_RESPONSE_DATA.success) {
            setShoesData(API_RESPONSE_DATA.data);
            setShoesDataHeaders(Object.keys(API_RESPONSE_DATA.data[0]));
            setCountPagination(API_RESPONSE_DATA.count);
          } 
        } catch (error) {
          console.error('Error fetching data:', error.message);
          setApiResponseError(error.message);
        }
      };
      fetchData();
      return resetAllStates()
    },[pageNumber, perPage])

  let appPage = (
      <div className="App">
            <div>
              <RunningShoesTables 
                shoesData={shoesData} 
                shoesDataHeaders={shoesDataHeaders} 
                shoesPageResponseStatus={shoesPageResponseStatus}
                pageNumber={pageNumber}
                setPageNumber={setPageNumber}
                perPage={perPage}
                setPerPage={setPerPage}
                countPagination={countPagination}/>
            </div>
      </div>
  )

  if(shoesPageResponseStatus!==-1) {
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
