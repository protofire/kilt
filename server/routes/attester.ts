import express from "express";
import {
  getAttester,
  listAttester,
  createAttester,
} from "../controller/attester";

export const router = express.Router();

router.route("/").get(listAttester).post(createAttester);
router.route("/:id").get(getAttester);

