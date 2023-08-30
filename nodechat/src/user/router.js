const { Router } = require("express");
const controller = require("./controller");

const router = Router();

//sample APIs
// router.get("/", controller.getAllUsers);
// router.get("/:id", controller.getUserByID);
// router.post("/addUser", controller.addUser);
// router.post("/deleteUser", controller.deleteUser);
// router.post("/updateUser", controller.updateUser);

//chat APIs
router.post("/signin", controller.userRegister);
router.post("/login", controller.userLogin);
//router.post("/add/chat", controller.addChat);
//router.get("/all/chats", controller.allUsersChat);
router.get("/data/signin", controller.usersData);
router.post("/person/to/person/chat", controller.personToPersonChat);
router.post("/get/chats/between", controller.getPersonToPersonChat);
router.post("/delete/chat", controller.deleteChat);
module.exports = router;
