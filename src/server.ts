import express from "express";
import routes from "./routes/index";

const app = express();

app.use(express.json());

app.get("/", (request, response) => response.json({ message: "GoBarber" }));

app.listen(3333, () => {
  console.log("Server Started");
});
