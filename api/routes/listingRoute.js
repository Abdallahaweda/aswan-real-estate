import express from "express";
import {
  createListing,
  deleteListing,
  updateListing,
  showListing,
  getListings,
} from "../controllers/listingController.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.post("/create", verifyToken, createListing);
router.delete("/delete/:id", verifyToken, deleteListing);
router.post("/update/:id", verifyToken, updateListing);
router.get("/show/:id", showListing);
router.get("/get", getListings);
export default router;
