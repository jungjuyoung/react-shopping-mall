import React, { useEffect, useState } from 'react';
import { FaCode } from 'react-icons/fa';
import axios from 'axios';
import { Icon, Col, Card, Row, Button } from 'antd';
import Meta from 'antd/lib/card/Meta';
import ImageSlider from '../../utils/ImageSlider';

function LandingPage() {
  const [Products, setProducts] = useState([]);
  const [Skip, setSkip] = useState(0);
  const [Limit, setLimit] = useState(4);
  const [PostSize, setPostSize] = useState(0);

  useEffect(() => {
    let body = {
      Skip,
      Limit,
    };
    getProducts(body);
  }, []);

  const getProducts = (body) => {
    axios.post('/api/product/products', body).then((res) => {
      if (res.data.success) {
        if (body.loadMore) {
          setProducts([...Products, ...res.data.productInfo]);
        } else {
          setProducts(res.data.productInfo);
        }
        setPostSize(res.data.postSize);
      } else {
        alert('상품들을 가져오는데 실패 했습니다.');
      }
    });
  };

  const loadeMoreHandler = (e) => {
    let skip = Skip + Limit;
    let body = {
      Skip: skip,
      Limit,
      loadMore: true,
    };
    getProducts(body);
    setSkip(skip);
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
          clear: 'both',
          paddingTop: '10px',
          textAlign: 'center',
        }}
      >
        {/* <button>더보기</button> */}
        {PostSize >= Limit && (
          <Button onClick={loadeMoreHandler}>더보기</Button>
        )}
      </div>
    </div>
  );
}

export default LandingPage;
