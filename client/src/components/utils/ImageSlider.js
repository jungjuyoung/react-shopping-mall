import React from 'react';
import { Carousel } from 'antd';

function ImageSlider(props) {
  // console.log(`props: ${JSON.stringify(props)}`);
  return (
    <div>
      <Carousel autoplay>
        {props.images.map((image, index) => (
          <div key={index}>
            <img
              style={{
                width: '100%',
                maxHeight: '150px',
                objectFit: 'cover',
              }}
              src={`http://localhost:5000/${image}`}
              alt="productImage"
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
}

export default ImageSlider;
