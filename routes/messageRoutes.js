const express = require("express")
const router = express.Router();

const {addMessage, updateMessage, deleteMessage, getMessage, getAllMessages} = require("../controllers/messageControllers")


router.post("/addMessage", addMessage)
router.post("/getAllMessages", getAllMessages)
router.post("/getMessage/:id", getMessage)
router.post("/updateMessage/:id", updateMessage)
router.post("/deleteMessage/:id", deleteMessage)

module.exports = router