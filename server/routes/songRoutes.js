const router = require("express").Router()
const ApiController = require("../controllers/ApiController")

router.get("/:category", ApiController.getSongs)

module.exports = router