import React, { useState } from 'react';
import { Typography, Button, Form, message, Input, Icon } from 'antd';
import FileUpload from '../../utils/FileUpload';
import Axios from 'axios';

const { Title } = Typography;
const { TextArea } = Input;

const Continents = [
  { key: 1, value: 'Africa' },
  { key: 2, value: 'Europe' },
  { key: 3, value: 'Asia' },
  { key: 4, value: 'North America' },
  { key: 5, value: 'South America' },
  { key: 6, value: 'Australia' },
  { key: 7, value: 'Antarctica' },
];

function UploadProductPage(props) {
  const [TitleValue, setTitleValue] = useState('');
  const [DescriptionValue, setDescriptionValue] = useState('');
  const [PriceValue, setPriceValue] = useState(0);
  const [ContinentValue, setContinentValue] = useState(1);
  const [Images, setImages] = useState([]);

  const onTitleChange = (e) => {
    setTitleValue(e.currentTarget.value);
  };

  const onDescriptionChange = (e) => {
    setDescriptionValue(e.currentTarget.value);
  };
  const onPriceChange = (e) => {
    setPriceValue(e.currentTarget.value);
  };
  const onContinentsSelectChange = (e) => {
    setContinentValue(e.currentTarget.value);
  };
  const updateImages = (newImages) => {
    setImages(newImages);
  };

  const onSubmit = (e) => {
    console.log('@@@ onSubmit 실행');
    e.preventDefault();
    if (
      !TitleValue ||
      !DescriptionValue ||
      !PriceValue ||
      !ContinentValue ||
      !Images
    ) {
      return alert('모든 값을 채워넣어주세요!');
    }
    const body = {
      // 로그인된 사람의 ID
      writer: props.user.userData._id,
      title: TitleValue,
      description: DescriptionValue,
      price: PriceValue,
      dontinents: ContinentValue,
      images: Images,
    };
    // 서버에 채운 값들을 request로 보낸다
    Axios.post('/api/product', body).then((res) => {
      if (res.data.success) {
        alert('상품 업로드에 성공 했습니다.');
        props.history.push('/');
      } else {
        alert('상품 업로드에 실패 했습니다.');
      }
    });
  };
  return (
    <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <Title level={2}>Upload Travel Product</Title>
      </div>
      <Form onSubmit={onSubmit}>
        <FileUpload refreshFunction={updateImages} />
        <br />
        <br />
        <label>Title</label>
        <Input onChange={onTitleChange} value={TitleValue} />
        <br />
        <br />
        <label>Description</label>
        <TextArea
          onChange={onDescriptionChange}
          value={DescriptionValue}
        ></TextArea>
        <br />
        <br />
        <label>Prices($)</label>
        <Input
          onChange={onPriceChange}
          min={0}
          value={PriceValue}
          type="number"
        />

        <br />
        <br />
        <select onChange={onContinentsSelectChange} value={ContinentValue}>
          {Continents.map((item) => (
            <option key={item.key} value={item.key}>
              {item.value}
            </option>
          ))}
        </select>
        <br />
        <br />
        <Button htmlType="submit">Submit</Button>
      </Form>
    </div>
  );
}

export default UploadProductPage;
