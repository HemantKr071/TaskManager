import multer from 'multer';

const storage = multer.diskStorage({
  destination: 'src/uploads/',
  filename: (_, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const fileFilter = (req,file, cb) => {
  if (file.mimetype === 'application/pdf') cb(null, true);
  else cb(new Error('Only PDF files are allowed!!'), false);
};


const upload = multer({ storage, fileFilter, limits: { files: 3 } });

export default upload; 