const express = require('express');
const router = express.Router();
const multer = require('multer');

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
  upload((req, res, err) => {
    if (err) return res.json({ success: false, err });
    return res.json({
      success: true,
      filePath: res.req.file.path,
      fileName: res.req.file.filename,
    });
  });
});

module.exports = router;
