import express from "express";
import morgan from "morgan";
import "dotenv/config";

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(morgan("dev"));

app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});

app.get("/api/planets", (req, res) => {
  res.status(200).json(planets);
});

type Planet = {
  id: number;
  name: string;
};

type Planets = Planet[];

let planets: Planets = [
  {
    id: 1,
    name: "Earth",
  },
  {
    id: 2,
    name: "Mars",
  },
];
