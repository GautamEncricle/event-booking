import dotenv from "dotenv";
import http from "http";
import errorHandler from "./src/middlewares/error.middleware.js";

import connect from "./src/configs/db.js";
import app from "./app.js";

dotenv.config();

const PORT = process.env.PORT || 3000;

const server = http.createServer(app);

connect()
  .then(() => {
    server.listen(PORT, () => {
      console.log(`🚀 server is running on port http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.log(`Error occurred: ${error}`);
  });
