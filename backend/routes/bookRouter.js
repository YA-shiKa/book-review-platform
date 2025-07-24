
const express = require("express");
const bookRouter = express.Router();
const bookController = require("../controllers/bookcontroller"); // fix relative path if needed

bookRouter.post("/", bookController.create);       
bookRouter.get("/", bookController.list);         
bookRouter.get("/:id", bookController.getById);    

module.exports = bookRouter;

