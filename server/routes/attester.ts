import express from "express";
import { getAttester, listAttester } from "../controller/attester";

export const router = express.Router();

router.route("/").get(listAttester);
router.route("/:id").get(getAttester);
