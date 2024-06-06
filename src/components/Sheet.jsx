import React from 'react';

const Sheet = ({ children, className }) => {
  return (
    <div className={`sheet ${className}`}>
      {children}
    </div>
  );
};

export default Sheet;
