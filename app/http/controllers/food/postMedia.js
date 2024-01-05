const upload = require('../../../../utils/multer');
const uploadToCloudinary = require('../../../../utils/cloundinary');

const postMedia = async (req, res) => {
  console.log(upload);
  upload.array('image', 10)(req, res, async (err) => {
    console.log(err);
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    try {
      const pictureFiles = req.files;
      const result = pictureFiles?.map((picture) =>
        uploadToCloudinary(picture),
      );

      const imageResponse = await Promise.all(result);

      const imageList = imageResponse.reduce((acc, item) => {
        return acc.concat([item.url]);
      }, []);

      return res.status(201).json({
        imageList: imageList,
      });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  });
};

module.exports = postMedia;
