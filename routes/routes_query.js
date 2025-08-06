const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer(); // dùng để xử lý file từ multipart/form-data

const queryController = require("../controllers/query");

// Route tìm kiếm bằng văn bản
router.post("/search", queryController.getPredictedFrames);

// Route tìm kiếm bằng ảnh
router.post(
  "/search/image",
  upload.single("file"),
  queryController.searchByImage
);

// Route tìm kiếm bằng clip
router.post(
  "/search/clip",
  upload.single("file"),
  queryController.searchByClip
);

// Route phân tích highlight
router.post(
  "/analyze/highlight",
  upload.single("file"),
  queryController.analyzeHighlights
);

module.exports = router;
