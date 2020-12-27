import React, { useEffect, useState } from 'react';
import { FaCode } from 'react-icons/fa';
import axios from 'axios';
import { Icon, Col, Card, Row } from 'antd';
import Meta from 'antd/lib/card/Meta';

function LandingPage() {
  const [Products, setProducts] = useState([]);

  useEffect(() => {
    axios.post('/api/product/products').then((res) => {
      if (res.data.success) {
        setProducts(res.data.productInfo);
      } else {
        alert('상품들을 가져오는데 실패 했습니다.');
      }
    });
  }, []);

  const renderCards = Products.map((product, index) => {
    console.log('product', product);

    return (
      <Col lg={6} md={8} xs={24} key={index}>
        <Card
          cover={<img src={`http://localhost:5000/${product.images[0]}`} />}
        >
          <Meta title={product.title} description={`$${product.price}`} />
        </Card>
      </Col>
    );
  });

  return (
    // <>
    //   <div className="app">
    //     <FaCode style={{ fontSize: '4rem' }} />
    //     <br />
    //     <span style={{ fontSize: '2rem' }}>Let's Start Coding!</span>
    //   </div>
    //   <div style={{ float: 'right' }}>
    //     Thanks For Using This Boiler Plate by John Ahn
    //   </div>
    // </>
    <div style={{ width: '75%', margin: '3rem auto' }}>
      <div style={{ textAlign: 'center' }}>
        <h1>
          Let's Travel Anywhere <Icon type="rocket" />
        </h1>
      </div>

      {/* filter */}
      {/* search */}
      {/* cards */}
      <Row gutter={[16, 16]}>{renderCards}</Row>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <button>더보기</button>
      </div>
    </div>
  );
}

export default LandingPage;
