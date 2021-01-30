import React, { useState } from 'react';
import { Input, Space } from 'antd';

const { Search } = Input;

function SearchFeature(props) {
  const [serachTerm, setSerachTerm] = useState('');
  const onSearch = (e) => {
    setSerachTerm(e.currentTarget.value);
    props.refreshFunction(e.currentTarget.value);
  };

  return (
    <div>
      <Search
        style={{ width: 200 }}
        placeholder="input search text"
        onSearch={onSearch}
        value={serachTerm}
      />
    </div>
  );
}

export default SearchFeature;
