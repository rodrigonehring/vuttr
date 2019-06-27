import React from 'react'

export default function SearchIcon({ fill = '#B1ADB9', ...props }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={12}
      height={12}
      viewBox="0 0 61.414 61.42"
      {...props}
    >
      <defs />
      <path
        stroke={fill}
        strokeWidth={3}
        d="M80,20.005l-60,60m60,0L20,20"
        transform="translate(-19.292 -19.293)"
      />
    </svg>
  )
}
