import './PagingBar.css';
export const PagingBar = ({
    paginationButtonHandler, 
    pageNumber
}) => {
    let buttonHandler = e=>paginationButtonHandler(e.target.value);
    return (
        <div className="paging-bar-parent">
            <div className='paging-bar-child' id='paging-bar-label'>
                <p>Page {pageNumber}</p>
            </div>
            <div className='paging-bar-child' id='paging-bar-buttons'>
                <button onClick={buttonHandler} value='first'>First</button>
                <button onClick={buttonHandler} value='back'>Back</button>
                <button onClick={buttonHandler} value='next'>Next</button>
                <button onClick={buttonHandler} value='last'>Last</button>
            </div>
        </div>
    )
}