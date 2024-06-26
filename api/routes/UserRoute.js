import Express from "express";
import {
  deleteUser,
  getUserLists,
  test,
  updateUser,
  getUser
} from "../controllers/UserController.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = Express.Router();

router.get("/test", test);
router.post("/update/:id", verifyToken, updateUser);
router.delete("/delete/:id", verifyToken, deleteUser);
router.get("/lists/:id", verifyToken, getUserLists);
router.get("/:id",verifyToken,getUser)
export default router;
