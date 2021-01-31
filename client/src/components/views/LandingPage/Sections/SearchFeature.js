import React, { useState } from 'react';
import { Input } from 'antd';

const { Search } = Input;

function SearchFeature(props) {
  const [SearchTerms, setSearchTerms] = useState('');

  const onChangeSearch = (e) => {
    setSearchTerms(e.currentTarget.value);
    props.refreshFunction(e.currentTarget.value);
  };

  return (
    <div>
      <Search
        style={{ width: 200 }}
        placeholder="input search text"
        onChange={onChangeSearch}
        value={SearchTerms}
      />
    </div>
  );
}

export default SearchFeature;
