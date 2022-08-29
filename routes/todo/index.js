const express = require("express");
const router = express.Router();
const todoController = require("@controllers/api/todo/todo");
const Validation = require('@validation/index')
const Responder = require('@service/responder')
const Auth = require('@middleware/Auth');

router.use(Auth)

router.post("/add",Validation.todoValidation(), Responder.validate.bind(Responder),todoController.CreateTodo.bind(todoController));
router.get("/gettodo",todoController.GetTodoLists.bind(todoController));
router.delete("/remove", todoController.RemoveTodo.bind(todoController));
router.put("/update", Validation.todoValidation(), Responder.validate.bind(Responder),todoController.UpdateTodo.bind(todoController));



module.exports = router;
