import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import TablePagination from '@mui/material/TablePagination';

import './RunningShoesTable.css';

export const RunningShoesTables = ({
  shoesData, 
  shoesDataHeaders, 
  shoesPageResponseStatus, 
  pageNumber,
  setPageNumber,
  perPage,
  setPerPage,
  countPagination
}) => {
    // PAGING
    const handleChangePage = (event, newPage) => {
      setPageNumber(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
      setPerPage(parseInt(event.target.value, 10));
      setPageNumber(0);
    };

    // JSX Elements
    let tableDefaultPage = (
        <TableContainer component={Paper}>
        <Table size='small' sx={{ minWidth: 500 }} aria-label="simple table">
          <TableHead 
            sx={{
              bgcolor: '#94f2c8'
            }}
          >
            <TableRow>
              {shoesDataHeaders.map(header => 
                <TableCell 
                  key={header} 
                  sx={{ 
                    fontWeight: 'bold'
                  }}
                >
                  {header}
                </TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {
              shoesData.map((currData, index) => (
                <TableRow key={currData.id} sx={{'&:nth-of-type(even)': {backgroundColor: '#b8d6c9'}}}
                >
                  {
                    Object.values(currData).map((cell) => 
                      <TableCell>{cell}</TableCell>
                    )
                  }
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
        </TableContainer>
    );

    return (
      <Box
        sx={{
          mx: 'auto',
          p: 3,
          m: 3,
          bgcolor: '#ddede6',
          borderRadius: 2,
          textAlign: 'center',
          fontSize: '0.875rem',
          fontWeight: '700',
        }}
      >
        <h3>Running Shoes Catalog</h3>
        {tableDefaultPage}
        <TablePagination
          rowsPerPageOptions={[5,10,15,20,50,100]}
          component="div"
          count={countPagination}
          page={pageNumber}
          onPageChange={handleChangePage}
          rowsPerPage={perPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>
    )
}