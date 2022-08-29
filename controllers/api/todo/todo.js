const Mongoose = require("mongoose");
const ObjectId = Mongoose.Types.ObjectId;
const Users = require("@models/users/users");
const Constants = require('@constants/index');
const TodoTask = require("@models/todo/todo");
const Responder = require('@service/responder')
const _ = require('lodash');

module.exports = {

   /* * 
    * @api {post} api/toto/create-todo
 * @apiDescription api to Send a list of items to create an order for seller with id = seller_id
 * */
   async CreateTodo(req, res) {
    try{
      const {tasks}= req.body;      
      const userId = req.user?.id;
      const errs = []; const todo = [];
            tasks.forEach((task) => {
                if (!task.title) errs.push(task);
                else todo.push({ title:task.title,description: task.description?task.description:'',priority:task.priority?task.priority:Constants.PRIORITY.LOW})
            })
            if (errs.length) throw new Error("tittle required !");

      let result = await new TodoTask({userId,tasks:todo}).save();
      return Responder.respondWithSuccess(req, res, result, 'Todo created successfully');  
   }
  catch (error) {
    return Responder.respondWithError(req, res, error);
  }
    },

  /* *
 * @api {get} api/toto/get_todos
 * @apiDescription api to fetch  a list of all sellers
 * */

  async GetTodoLists(req, res) {
    try {   
      let result = await TodoTask.findOne({userId: req.user.id,isActive:true});
      return Responder.respondWithSuccess(req, res, result, 'orders fetch successfully'); 
    }
    catch (error) {
      return Responder.respondWithError(req, res, error);
    }

  },
   /* *
 * @api {get} api/toto/remove
 * @apiDescription api to fetch  a list of all sellers
 * */

   async RemoveTodo(req, res) {
    try {   
      let result = await TodoTask.findOne({userId: req.user.id,isActive:true});
      if(!result) return Responder.respondWithCustomError(req, res, 'No todo found !',{});
      result.isActive = false;
      await result.save();
      return Responder.respondWithSuccess(req, res, [], 'Delete successfully'); 
    }
    catch (error) {
      return Responder.respondWithError(req, res, error);
    }

  },
 /* *
 * @api {get} api/todo/update
 * @apiDescription api to fetch the catalog of a seller by seller_id
 * */
 async UpdateTodo(req, res) {
  try{
    const {tasks}= req.body;      
    const userId = req.user?.id;
    const errs = []; const todo = [];
          tasks.forEach((task) => {
              if (!task.title) errs.push(task);
              else todo.push({ title:task.title,description: task.description?task.description:'',priority:task.priority?task.priority:Constants.PRIORITY.LOW})
          })
          if (errs.length) throw new Error("tittle required !");

    let result = await TodoTask.findOne({userId,isActive:true});
    if(!result) return Responder.respondWithCustomError(req, res,'No todo found !!',{});  
    result.tasks=todo;
    await result.save();
    return Responder.respondWithSuccess(req, res, result, 'Todo Update successfully');  
 }
catch (error) {
  return Responder.respondWithError(req, res, error);
}
  },
    
    
   
  };