import React, { useEffect } from 'react';
import { FaCode } from 'react-icons/fa';
import axios from 'axios';

function LandingPage() {
  useEffect(() => {
    axios.post('/api/product/products').then((res) => {
      if (res.data.success) {
        console.log(res.data);
      } else {
        alert('상품들을 가져오는데 실패 했습니다.');
      }
    });
  }, []);

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
    <div>LandingPage</div>
  );
}

export default LandingPage;
