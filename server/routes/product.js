const express = require('express');
const router = express.Router();
const multer = require('multer');
const { Product } = require('../models/Product');

const { auth } = require('../middleware/auth');

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    if (ext !== '.jpg' || ext !== '.png') {
      return cb(req.status(400).end('only jpg, png are allowed'), false);
    }
    cb(null, true);
  },
});

let upload = multer({ storage: storage }).single('file');

//=================================
//             Product
//=================================

router.post('/uploadImage', auth, (req, res) => {
  // after getting that Image from client
  // we need to save it inside Node Server
  // Multer library
  upload(req, res, (err) => {
    if (err) return res.json({ success: false, err });
    return res.json({
      success: true,
      filePath: res.req.file.path,
      fileName: res.req.file.filename,
    });
  });
});

router.post('/', (req, res) => {
  // 받아온 파일 정보들을 DB에 넣어준다.
  const product = new Product(req.body);
  product.save((err) => {
    if (err) {
      return res.status(400).json({ success: false, err });
    }
    return res.status(200).json({ success: true });
  });
});

router.post('/products', (req, res) => {
  // Products collection에 들어있는 모든 상품 정보 가져오기.
  let limit = req.body.Limit ? parseInt(req.body.Limit) : 10;
  let skip = req.body.Skip ? parseInt(req.body.Skip) : 0;
  let findArgs = {};
  // console.log(`route /products limit: ${limit}, skip: ${skip}`);
  let term = req.body.searchTerm;

  for (let key in req.body.filters) {
    if (req.body.filters[key].length > 0) {
      console.log('key: ', key);
      if (key === 'price') {
        findArgs[key] = {
          // Greater than equal
          $gte: req.body.filters[key][0],
          // Less than equal
          $lte: req.body.filters[key][1],
        };
      } else {
        findArgs[key] = req.body.filters[key];
      }
    }
  }

  // console.log(`findArgs: ${JSON.stringify(findArgs)}`);
  if (term) {
    Product.find(findArgs)
      // .find({ $text: { $search: term } })
      .find({ title: { $regex: term } })
      .populate('writer')
      .skip(skip)
      .limit(limit)
      .exec((err, productInfo) => {
        if (err) return res.status(400).json({ success: false, err });
        return res.status(200).json({
          success: true,
          productInfo,
          postSize: productInfo.length,
        });
      });
  } else {
    Product.find(findArgs)
      .populate('writer')
      .skip(skip)
      .limit(limit)
      .exec((err, productInfo) => {
        if (err) return res.status(400).json({ success: false, err });
        return res.status(200).json({
          success: true,
          productInfo,
          postSize: productInfo.length,
        });
      });
  }
});

module.exports = router;
