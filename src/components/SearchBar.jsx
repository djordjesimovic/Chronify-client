import React from 'react'

const SearchBar = () => {
  return (
    <div className='w-full flex justify-center items-center'>
        <input className='w-full px-3 py-1 rounded-2xl outline-0 bg-white' type="text" placeholder='Search' />
    </div>
  )
}

export default SearchBar