import React, { memo } from 'react'

export const Input = memo((props) => {
  console.log(props.name);
  return (
    <input {...props} />
  )
});
