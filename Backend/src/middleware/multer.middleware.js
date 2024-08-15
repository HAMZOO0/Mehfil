import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, res, cb) {
    cb(null, "./public");
  },

  filename: function (req, res, cb) {
    cb(nill, file.originalname);
  },
});

export const upload = multer({ storage });

// more about multer
// https://github.com/expressjs/multer
