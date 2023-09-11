const { Router } = require("express");
const controller = require("./controller");

const router = Router();

//chatApplication APIs
router.post("/signin", controller.userRegister);
router.post("/login", controller.userLogin);
router.get("/data/signin", controller.usersData);
router.post("/person/to/person/chat", controller.personToPersonChat);
router.post("/get/chats/between", controller.getPersonToPersonChat);
router.post("/delete/chat", controller.deleteChat);
module.exports = router;
