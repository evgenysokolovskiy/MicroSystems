import React from 'react'
// Antd
import { Input } from 'antd'
const { Search } = Input

export const SearchComponent = () => {
    return (
        <Search
            className="search"
            placeholder="input search text"
            style={{ width: 200 }}
            onSearch={value => console.log(value)}
            enterButton
        />
    )
}