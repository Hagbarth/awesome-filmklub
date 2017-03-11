import React, { PropTypes } from 'react';

const ProgressRow = ({ children, progress }) => <tr
    style={
      progress
        ? {
            background: (
              `linear-gradient(to right, #45C99B ${progress}%, #FFF ${progress}%)`
            )
          }
        : null
    }
  >{children}</tr>;

ProgressRow.propTypes = {
  children: PropTypes.node,
  progress: PropTypes.number
};

export default ProgressRow;
