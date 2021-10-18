import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

const Table = ({ id, sizeA, sizeB, style }) => {
  if (id === 'table-') {
    return (<div></div>);
  }
  return (
    <NavLink to="/table">
      <div id={id} style={style}>
        <span>Recommended</span>
        <span>Table Size:</span>
        <span>{sizeA}</span>
        <span>{sizeB}</span>
      </div>
    </NavLink>
  );
};

Table.propTypes = {
  id: PropTypes.string,
  sizeA: PropTypes.string,
  sizeB: PropTypes.string,
  style: PropTypes.object,
};

export default Table;
