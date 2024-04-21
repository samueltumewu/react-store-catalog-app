import './RunningShoesTable.css';
import { PagingBar } from './PagingBar';

export const RunningShoesTables = ({
  shoesData, 
  shoesDataHeaders, 
  shoesPageResponseStatus, 
  paginationButtonHandler, 
  pageNumber
}) => {    
    let defaultPage = 
      (
        <>
          <h1>Running Shoes Catalog</h1>
          <div className="center-div">
            <table>
              <thead>
                <tr>
                    {shoesDataHeaders.map(header => <th key={header}>{header}</th>)}
                </tr>
              </thead>
              <tbody>
                {
                  shoesData.map((currData, index) => 
                    (<tr key={index}>
                        {
                          Object.values(currData).map((cell, index) => 
                            <td key={index}>{cell}</td>
                          )
                        }
                      </tr>
                    ))
                }
              </tbody>
            </table>
            
            <PagingBar 
              paginationButtonHandler={paginationButtonHandler} 
              pageNumber={pageNumber}/>
          </div>         
        </>
      )

    let notFoundTable = (
      <>
        <h1>No table found</h1>
      </>
    )
    
    switch (shoesPageResponseStatus) {
      case 200:
        return shoesData.length > 1 ? defaultPage : notFoundTable
      default:
        return notFoundTable
    }
}