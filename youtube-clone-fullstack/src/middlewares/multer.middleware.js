import multer from "multer";

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, "./public/temp");
//     },
//     filename: function (req, file, cb) {
//         // making uniqueSuffix name
//         // const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9);
//         // cb(null, file.fieldname + "-" + uniqueSuffix);

//         // orignal name used because we will directly after some time upload on cloudinary
//         cb(null, file.originalname);
//     },
// });

// export const upload = multer({ storage, });

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, "./public/uploads");
  },
  filename: function (req, file, cb) {
      cb(null, file.originalname);
  },
});

export const upload = multer({ storage });
