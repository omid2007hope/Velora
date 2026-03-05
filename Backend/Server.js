// © 2026 Omid Teimory. All rights reserved.
// Signature: OmidTeimory-2026
const app = require("./app");
const connectDB = require("./database/MongoDB");

connectDB()
  .then(() => {
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to database:", err);
    process.exit(1);
  });


