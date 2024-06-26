import  Express  from "express";
import { google, signOut, signin, signup } from "../controllers/AuthController.js";


const router=Express.Router()

router.post("/signup",signup)
router.post("/signin",signin)
router.post("/google",google)
router.get("/signout",signOut)

export default router;