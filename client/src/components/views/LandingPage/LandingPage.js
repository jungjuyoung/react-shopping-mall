import React, { useEffect, useState } from 'react';
import { FaCode } from 'react-icons/fa';
import axios from 'axios';
import { Icon, Col, Card, Row } from 'antd';
import Meta from 'antd/lib/card/Meta';
import ImageSlider from '../../utils/ImageSlider';

function LandingPage() {
  const [Products, setProducts] = useState([]);
  const [Skip, setSkip] = useState(0);
  const [Limit, setLimit] = useState(6);

  useEffect(() => {
    let body = {
      Skip,
      Limit,
    };
    axios.post('/api/product/products', body).then((res) => {
      if (res.data.success) {
        setProducts(res.data.productInfo);
      } else {
        alert('상품들을 가져오는데 실패 했습니다.');
      }
    });
  }, []);

  const loadeMoreHandler = (e) => {
    console.log(e);
  };

  const renderCards = Products.map((product, index) => {
    return (
      <Col lg={6} md={8} xs={24} key={index}>
        <Card cover={<ImageSlider images={product.images} />}>
          <Meta title={product.title} description={`$${product.price}`} />
        </Card>
      </Col>
    );
  });

  return (
    <div
      style={{
        width: '75%',
        margin: '3rem auto',
      }}
    >
      <div style={{ textAlign: 'center' }}>
        <h1>
          Let's Travel Anywhere <Icon type="rocket" />
        </h1>
      </div>

      {/* filter */}

      <Row gutter={[16, 16]}>{renderCards}</Row>

      {/* search */}
      {/* cards */}
      <div
        style={{
          display: 'block',
          textAlign: 'center',
        }}
      >
        {/* <button>더보기</button> */}
        <button onclick={loadeMoreHandler}>더보기</button>
      </div>
    </div>
  );
}

export default LandingPage;
