import multer from "multer";
import _default from "validator";

const storage = multer.diskStorage({
  filename:  (req, file, cb) => {
    cb(null, file.originalname)
  },
});


const upload = multer({storage})

export default upload;