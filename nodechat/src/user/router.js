const { Router } = require("express");
const controller = require("./controller");

const router = Router();

//sample APIs
router.get("/", controller.getAllUsers);
router.get("/:id", controller.getUserByID);
router.post("/addUser", controller.addUser);
router.post("/deleteUser", controller.deleteUser);
router.post("/updateUser", controller.updateUser);

//chat APIs
router.post("/signin", controller.userRegister);
router.post("/login", controller.userLogin);
router.post("/add/chat", controller.addChat);
router.get("/chat/personal", controller.userChat);
router.get("/data/login", controller.usersData);

module.exports = router;
