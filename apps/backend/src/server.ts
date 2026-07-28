const app = require("./app").default || require("./app");

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`🚍 LiveOpt API is running on http://localhost:${PORT}`);
});