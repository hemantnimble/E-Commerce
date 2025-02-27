'use client'
import React from 'react'

function error({error}:{error:Error}) {
  return (
    <div>error:{error.message}</div>
  )
}

export default error