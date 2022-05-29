import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now() + ".jpg");
  },
});

export const saveProfile = (req, res) => {
  res.json("hii Working...");
  const uploadImages = multer({ storage: storage }).single("myImage");
  uploadImages(req, res, async (err) => {
    console.log(req.file, req.body);
  });
};
