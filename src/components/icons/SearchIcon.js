import React from 'react'

export default function SearchIcon({ fill = '#B1ADB9', ...props }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 47.707 47.707"
      width={22}
      height={22}
      strokeWidth={2}
      {...props}
    >
      <defs />
      <g transform="translate(-1272 -1799)">
        <path
          className="a"
          d="M39.049,39.049,56,56"
          transform="translate(1263 1790)"
          stroke={fill}
        />
        <circle
          className="a"
          cx="17"
          cy="17"
          r="17"
          transform="translate(1273 1800)"
          fill="none"
          stroke={fill}
          // fill={fill}
        />
      </g>
    </svg>
  )
}
