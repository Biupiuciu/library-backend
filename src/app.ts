import express from "express";
import bodyParser from "body-parser";
import router from "../route";
import dotenv from "dotenv";

//Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 3000; // If no environment variable is set, use the default value 3000

app.use(bodyParser.json()); //for parsing JSON requests

// Routes
app.use(router);

// Start the server
app.listen(port, () => {
  console.log(`Server is running`);
});
