const axios = require("axios");

exports.getPredictedFrames = async (req, res) => {
  const { user_query } = req.body;

  try {
    const response = await axios.post(
      `${process.env.AI_API}/search`,
      { user_query },
      { headers: { "Content-Type": "application/json" } }
    );

    const results = response.data.results;

    res.json({
      query: user_query,
      results,
    });
  } catch (error) {
    console.error("🔥 Error calling Python API:", error.message);
    res.status(500).json({
      message: "Không thể xử lý truy vấn từ hệ thống AI.",
      error: error.message,
    });
  }
};
