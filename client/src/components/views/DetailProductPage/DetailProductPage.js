import React, { useEffect } from 'react';
import axios from 'axios';

function DetailProductPage(props) {
  const productId = props.match.params.productId;
  useEffect(() => {
    axios
      .get(`/api/product/products_by_id?id=${productId}&type=single`)
      .then((res) => {
        if (res.data.success) {
          console.log(res.data);
        } else {
          alert('상세정보 가져오기 실패');
        }
      });
  }, []);
  return <div>DetailProductPage</div>;
}

export default DetailProductPage;
