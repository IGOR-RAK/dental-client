import React from 'react';

const Spinner = ({ width = 50, height = 50, color = '#000' }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid"
      style={{ background: 'none', display: 'block', margin: 'auto' }}
    >
      <circle cx="50" cy="50" fill="none" stroke={color} strokeWidth="8" r="35" strokeDasharray="164.93361431346415 56.97787143782138">
        <animateTransform
          attributeName="transform"
          type="rotate"
          repeatCount="indefinite"
          dur="1s"
          values="0 50 50;360 50 50"
          keyTimes="0;1"
        />
      </circle>
    </svg>
  );
};

export default Spinner;
