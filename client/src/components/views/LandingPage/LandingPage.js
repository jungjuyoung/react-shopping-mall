import React, { useEffect, useState } from 'react';
import { FaCode } from 'react-icons/fa';
import axios from 'axios';
import { Icon, Col, Card, Row, Button } from 'antd';
import Meta from 'antd/lib/card/Meta';
import ImageSlider from '../../utils/ImageSlider';
import CheckBox from './Sections/CheckBox';
import RadioBox from './Sections/RadioBox';
import { continents, price } from './Sections/Datas';
import SearchFeature from './Sections/SearchFeature';

function LandingPage() {
  const [Products, setProducts] = useState([]);
  const [Skip, setSkip] = useState(0);
  const [Limit, setLimit] = useState(4);
  const [PostSize, setPostSize] = useState(0);
  const [Filters, setFilters] = useState({
    continents: [],
    price: [],
  });
  const [SearchTerms, setSearchTerms] = useState('');

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
        <Card
          cover={
            <a href={`/product/${product._id}`}>
              <ImageSlider images={product.images} />
            </a>
          }
        >
          <Meta title={product.title} description={`$${product.price}`} />
        </Card>
      </Col>
    );
  });

  const showFiltersResults = (filters) => {
    let body = {
      Skip: 0,
      Limit,
      filters,
    };
    getProducts(body);
    setSkip(0);
  };

  const handlePrice = (value) => {
    const data = price;
    let array = [];

    for (let key in data) {
      if (data[key]._id === parseInt(value, 10)) {
        array = data[key].array;
      }
    }
    return array;
  };

  const handleFilters = (filters, category) => {
    const newFilters = { ...Filters };
    newFilters[category] = filters;

    if (category === 'price') {
      let priceValues = handlePrice(filters);
      newFilters[category] = priceValues;
    }
    showFiltersResults(newFilters);
    setFilters(newFilters);
  };

  const updateSearchTerm = (newSearchTerm) => {
    let body = {
      Skip: 0,
      limit: Limit,
      filters: Filters,
      searchTerm: newSearchTerm,
    };
    setSkip(0);
    setSearchTerms(newSearchTerm);
    getProducts(body);
  };

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
      <Row gutter={[16, 16]}>
        <Col lg={12} xs={24}>
          {/* checkbox */}
          <CheckBox
            list={continents}
            handleFilters={(filters) => handleFilters(filters, 'continents')}
          />
        </Col>
        <Col lg={12} xs={24}>
          {/* Radiobox */}
          <RadioBox
            list={price}
            handleFilters={(filters) => handleFilters(filters, 'price')}
          />
        </Col>
      </Row>

      {/* search */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          margin: '1rem auto',
        }}
      >
        <SearchFeature refreshFunction={updateSearchTerm} />
      </div>

      <Row gutter={[16, 16]}>{renderCards}</Row>

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
