import { Router } from "express";
const router = Router();
import login from "../controllers/login";
import user from "../controllers/user";


//signup
router.post("/login", login.login);

// show all users
router.get("/user", user.showAll);

// show details
// router.get("/user/:userId", user.idUser);



module.exports = router;
