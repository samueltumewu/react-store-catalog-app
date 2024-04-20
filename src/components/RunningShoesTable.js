import './RunningShoesTable.css';

export const RunningShoesTables = ({shoesData, shoesDataHeaders, shoesPageResponseStatus}) => 
{    
    let defaultPage = 
      (
        <>
          <h1>hello</h1>
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
      case 400:
        return notFoundTable
      case -1:
        return <p>Loading...</p>
      default:
        return <p>WHOAAA</p>
    }
}