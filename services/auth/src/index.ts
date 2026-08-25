import express from 'express';

const app = express();
const PORT = process.env.PORT || 4000;

app.get("/health", (req, res) => {
  res.json({ status: "ok", service: "auth" });
});

app.listen(PORT, () => {
  console.log(`Auth service running on port ${PORT}`);
});