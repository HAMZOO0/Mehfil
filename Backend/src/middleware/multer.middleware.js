import multer from "multer";
import path from "path";
import fs from "fs";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = path.join(__dirname, 'public');
    console.log(`Uploading to: ${uploadPath}`);
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },

  filename: function (req, file, cb) {
    console.log(`Saving file: ${file.originalname}`);
    cb(null, file.originalname);
  },
});

export const upload = multer({ storage });
