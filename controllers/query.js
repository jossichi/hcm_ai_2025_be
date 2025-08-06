const axios = require("axios");
const FormData = require("form-data");
require("dotenv").config();

const AI_API = process.env.AI_API; // Ví dụ: http://localhost:8000

exports.getPredictedFrames = async (req, res) => {
  const {
    user_query,
    input_type = "video_name",
    input_reference = "text_input",
  } = req.body;

  try {
    const response = await axios.post(
      `${AI_API}/search`,
      { user_query, input_type, input_reference },
      { headers: { "Content-Type": "application/json" } }
    );

    res.json({
      query: user_query,
      results: response.data.results,
    });
  } catch (error) {
    console.error("🔥 Error calling /search:", error.message);
    res.status(500).json({ message: "Lỗi truy vấn AI.", error: error.message });
  }
};

exports.searchByImage = async (req, res) => {
  try {
    const formData = new FormData();
    formData.append("file", req.file.buffer, {
      filename: req.file.originalname,
      contentType: req.file.mimetype,
    });
    formData.append("query", req.body.query || "");

    const response = await axios.post(`${AI_API}/search/image`, formData, {
      headers: formData.getHeaders(),
    });

    res.json(response.data);
  } catch (error) {
    console.error("🔥 Error calling /search/image:", error.message);
    res
      .status(500)
      .json({ message: "Lỗi khi tìm kiếm bằng ảnh.", error: error.message });
  }
};

exports.searchByClip = async (req, res) => {
  try {
    const formData = new FormData();
    formData.append("file", req.file.buffer, {
      filename: req.file.originalname,
      contentType: req.file.mimetype,
    });

    const response = await axios.post(`${AI_API}/search/clip`, formData, {
      headers: formData.getHeaders(),
    });

    res.json(response.data);
  } catch (error) {
    console.error("🔥 Error calling /search/clip:", error.message);
    res
      .status(500)
      .json({ message: "Lỗi khi tìm kiếm clip.", error: error.message });
  }
};

exports.analyzeHighlights = async (req, res) => {
  try {
    const { video_name } = req.body;
    const formData = new FormData();
    formData.append("file", req.file.buffer, {
      filename: req.file.originalname,
      contentType: req.file.mimetype,
    });
    formData.append("video_name", video_name || "");

    const response = await axios.post(`${AI_API}/analyze/highlight`, formData, {
      headers: formData.getHeaders(),
    });

    res.json(response.data);
  } catch (error) {
    console.error("🔥 Error calling /analyze/highlight:", error.message);
    res
      .status(500)
      .json({ message: "Lỗi khi phân tích highlight.", error: error.message });
  }
};
