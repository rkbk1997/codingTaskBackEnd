const express = require('express');
const multer = require('multer');
const router = express.Router();

const PostSchema = require('./../models/post');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix);
  },
});
const upload = multer({ storage: storage });

router.post('/create-post', upload.single('image'), (req, res, next) => {
  PostSchema.create(
    {
      userId: req.body.userId,
      title: req.body.title,
      desc: req.body.desc,
      filePath: req.file.path,
    },
    (err, data) => {
      if (err) {
        res
          .status(500)
          .send({ message: 'Uploading fail, Please try again later' });
      }
      if (data) {
        getPost(req.body.userId, req, res);
      }
    }
  );
});

router.get('/get-user-post', (req, res) => {
  getPost(req.params.id, req, res);
});

const getPost = async (id, req, res) => {
  PostSchema.find({ userId: id }, (err, post) => {
    if (err) {
      res
        .status(500)
        .send({ message: 'Uploading fail, Please try again later' });
    }
    if (post) {
      res
        .status(200)
        .send({ status: 'success', data: post, metadata: post.length });
    }
  });
};

module.exports = router;
