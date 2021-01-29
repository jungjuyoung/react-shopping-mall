import React from 'react';
import { Input } from 'antd';
import {Search} = Input;

function SearchFeature() {
  const onSearch = (e) => {};
  return (
    <div>
      <Search
        placeholder="input search text"
        allowClear
        enterButton="Search"
        size="large"
        onSearch={onSearch}
      />
    </div>
  );
}

export default SearchFeature;
