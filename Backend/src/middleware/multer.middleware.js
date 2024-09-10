import multer from "multer";
import path from "path";

// Multer configuration to store files temporarily in the `/tmp` directory
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Use Vercel's writable `/tmp` directory
    cb(null, "/tmp");
  },
  filename: function (req, file, cb) {
    // Create a unique filename using timestamp
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

// Create the Multer upload middleware
export const upload = multer({ storage });
