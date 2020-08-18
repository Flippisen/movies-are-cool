import React from 'react';
import Pagination from '@material-ui/lab/Pagination';   

interface Props {
    currentPage: number;
    maxPages: number;
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

export default (props: Props) => {
    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        props.setCurrentPage(value);
    }

    return <div>
        <Pagination count={props.maxPages} page={props.currentPage} onChange={handlePageChange}></Pagination>
    </div>
}