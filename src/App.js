import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import { RunningShoesTables } from './components/RunningShoesTable';

function App() {
  const BASE_URL = 'https://store-catalog-app-1-0-0-snapshot.onrender.com/';
  const [shoesData, setShoesData] = useState([]);
  const [shoesDataHeaders, setShoesDataHeaders] = useState([]);
  const [shoesPageResponseStatus, setShoesPageResponseStatus] = useState(-1);
  const [apiResponseError, setApiResponseError] = useState('');

  // pagination
  const [pageNumber, setPageNumber] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [countPagination, setCountPagination] = useState(0);

  // HTTP Handling
  const fetchData = async () => {
    try {
      let urlGet = `${BASE_URL}/shoes?page=${pageNumber}&per_page=${perPage}`
      const response = await axios.get(urlGet);
      const API_RESPONSE_DATA = response.data;
      setShoesPageResponseStatus(response.status)
      if (API_RESPONSE_DATA.success) {
        setShoesData(API_RESPONSE_DATA.data);
        setShoesDataHeaders(Object.keys(API_RESPONSE_DATA.data[0]));
        setCountPagination(API_RESPONSE_DATA.count);
      } 
      console.log(JSON.stringify(shoesData, null, 4))
    } catch (error) {
      console.error('Error fetching data:', error.message);
      setApiResponseError(error.message);
    }
  };

  const putQuantity = async (content, quantity) => {
    let isSuccess = false;
    const rollbackQuantityValue = content.quantity;
    const shoesId = content.id;
    try {
      let urlPutQuantity = `${BASE_URL}/shoes/id/${shoesId}/quantity/${quantity}`
      // const configHeaders = { headers: {'Content-Type': 'application/json'} };
      const response = await axios.put(urlPutQuantity);
      isSuccess = response.data.success;
      // console.log(JSON.stringify(response, null, 4));
    } catch (error) {
      console.error('Error http put:', error);
      isSuccess = error.response.response.data.success;
      setApiResponseError(error.message);
    } finally {
      console.log('<<putQuantity Result: ' + isSuccess);
      if (!isSuccess) {
        setShoesData(shoes => shoes.map(item =>
          item.id === content.id ? { ...item, 'quantity': rollbackQuantityValue } : item
        ))
        console.debug(`<<rollback done`)
      }
      return isSuccess;
    }
  };

  const resetAllStates = () => {
    setShoesData([]);
    setShoesDataHeaders([]);
    setShoesPageResponseStatus(-1);
    setApiResponseError('');
  }

  const modifyQuantity = (action, rowData) => {
    let currentQuantity = Number(rowData.quantity);
    let currentId = Number(rowData.id);
    switch(action) {
      case 'increment':
        currentQuantity++;
        setShoesData(shoes => {
          return shoes.map(item =>
            item.id === currentId ? { ...item, 'quantity': currentQuantity } : item
          )
        })
        putQuantity(rowData, currentQuantity)
        break;
      case 'decrement':
        if (currentQuantity > 0) {
          currentQuantity--;
          setShoesData(shoes => {
            return shoes.map(item =>
              item.id === currentId ? { ...item, 'quantity': currentQuantity } : item
            )
          })
          putQuantity(rowData, currentQuantity)
        } else {
          console.log("Decrement action invalid to be invoked!")
        }
        break;
      default:
        break;
    }
  }

  useEffect(() => {
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
                countPagination={countPagination}
                modifyQuantity={modifyQuantity}/>
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
