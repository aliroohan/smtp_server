import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
// import mail from "./controllers/mail.js";
import mail2 from "./controllers/mail2.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send("Hello World");
});

// app.use("/mail", mail);
app.use("/mail2", mail2);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});