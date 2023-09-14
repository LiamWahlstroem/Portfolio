const multer = require('multer');

const storage = multer.memoryStorage(); // Use memory storage for file buffer
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 100,
  },
});

module.exports = {
  reactStrictMode: true,

  async headers() {
    return [
      {
        source: '/api/uploadImage',
        headers: [
          {
            key: 'content-type',
            value: 'multipart/form-data', // Make sure to specify the content-type
          },
        ],
      },
    ];
  },
};