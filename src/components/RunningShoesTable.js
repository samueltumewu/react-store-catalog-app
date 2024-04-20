import React, {useState, useEffect} from "react";
import axios from 'axios';
import './RunningShoesTable.css';

export const RunningShoesTables = () => {
    const [shoesData, setShoesData] = useState([]);
    const [isSuccessState, setIsSuccessState] = useState(false);
    const [responseHeaders, setResponseHeaders] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get('https://store-catalog-app-1-0-0-snapshot.onrender.com/shoes?page=2');
            console.log(Object.keys(response.data))
            const API_RESPONSE_DATA = response.data;
            setIsSuccessState(API_RESPONSE_DATA.success);
            if (API_RESPONSE_DATA.success) {
              setShoesData(API_RESPONSE_DATA.data);
              setResponseHeaders(Object.keys(API_RESPONSE_DATA.data[0]));
            } 
            // console.log(`shoesData: ${API_RESPONSE_DATA}`)
            // console.log(`shoesData: ${Object.keys(shoesData[0])}`)
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };

        fetchData();


      },[])

    return (
        <>
            <h1>hello</h1>
            <p>{responseHeaders.filter(e => Object.keys(e) != 'id')}</p>
            <div className="center-div">
            <table>
              <thead>
                <tr>
                    {responseHeaders.map(header => <th key={header}>{header}</th>)}
                </tr>
              </thead>
              <tbody>
                {
                  shoesData.map((currData, index) => (
                      <tr key={index}>
                        {
                          Object.values(currData).map(
                            (cell, index) => <td key={index}>{cell}</td>
                          )
                        }
                      </tr>
                      ))
                }
              </tbody>
            </table>
            </div>         
            
            {/* <p>{shoesData}</p> */}
            {/* {shoesData.map((value)=><p>{value.size}</p>)} */}
        </>
    );
}