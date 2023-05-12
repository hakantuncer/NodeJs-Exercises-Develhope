var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
import Joi from "joi";
import pgPromise from "pg-promise";
const db = pgPromise()(
  "postgres://postgres:postgres@localhost:5432/TestServer"
);
const setupDB = () =>
  __awaiter(void 0, void 0, void 0, function* () {
    yield db.none(`
  DROP TABLE IF EXISTS planets;

  CREATE TABLE planets (
    id SERIAL NOT NULL PRIMARY KEY,
    name TEXT NOT NULL
    );
  `);
    yield db.none(`INSERT INTO planets (name) VALUES ('Earth')`);
    yield db.none(`INSERT INTO planets (name) VALUES ('Mars')`);
  });
setupDB();
const getAll = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const planets = yield db.many(`SELECT * FROM planets;`);
    res.status(200).json(planets);
  });
const getOneById = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const planet = yield db.oneOrNone(
      `SELECT * FROM planets WHERE id=$1;`,
      Number(id)
    );
    res.status(200).json(planet);
  });
const planetsSchema = Joi.object({
  name: Joi.string().required(),
});
const createOne = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.body;
    const newPlanet = { name };
    const validateNewPlanet = planetsSchema.validate(newPlanet);
    if (validateNewPlanet.error) {
      return res.status(400).json({
        msg: validateNewPlanet.error.details[0].message,
      });
    } else {
      yield db.none(`INSERT INTO planets (name) VALUES ($1)`, name);
      res.status(201).json({
        msg: "Planet created successfully!",
      });
    }
  });
const updateOneById = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { name } = req.body;
    yield db.none(`UPDATE planets SET name=$2 WHERE id=$1`, [id, name]);
    res.status(201).json({
      msg: "Planet Updated successfully!",
    });
  });
const deleteOneById = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    yield db.none(`DELETE FROM planets WHERE id=$1`, Number(id));
    res.status(200).json({
      msg: "Planet deleted successfully!",
    });
  });
export { getAll, getOneById, createOne, updateOneById, deleteOneById };
