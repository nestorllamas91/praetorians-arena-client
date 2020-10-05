import React from 'react';
import styles from '$root/components/games/pagination/styles';

import Pagination from 'react-bootstrap/Pagination';

import { v4 as uuidv4 } from 'uuid';

export default function PaginationBar(props) {
  const pageNumbers = [];
  for (let pageNumber = 1; pageNumber <= props.numPages; pageNumber++) {
    pageNumbers.push(pageNumber);
  }
  return (
    <div className="pagination">
      <Pagination>
        {pageNumbers.map(pageNumber => (
          <Pagination.Item
            key={uuidv4()}
            id={pageNumber}
            active={pageNumber === props.currentPage}
            onClick={props.handlePageSelection}
          >
            {pageNumber}
          </Pagination.Item>
        ))}
      </Pagination>
      <style jsx>{styles}</style>
    </div>
  );
}
