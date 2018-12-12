import * as TaskDao from "./models/taskDao"

class TaskList {
    /**
     * Handles the various APIs for displaying and managing tasks
     * @param {TaskDao} taskDao
    */
   taskDao: TaskDao.TaskDao;
   constructor(taskDao: TaskDao.TaskDao) {
   this.taskDao = taskDao;
   }
   async showTasks(req:any, res:any) {
     const querySpec = {
       query: "SELECT * FROM root r WHERE r.completed=@completed",
       parameters: [
         {
           name: "@completed",
           value: false
         }
       ]
     };
  
     const items = this.taskDao.find(querySpec);
     res.render("index", {
       title: "My ToDo List ",
       tasks: items
     });
   }
  
   async addTask(req:any, res:any) {
     //const item = req.body;
     const item = req.payload;
  
     this.taskDao.addItem(item);
     res.redirect("/");
   }
  
   async completeTask(req:any, res:any) {
     const completedTasks = Object.keys(req.body);
     const tasks = new Array();
  
     completedTasks.forEach(task => {
       tasks.push(this.taskDao.updateItem(task));
     });
  
     //await Promise.all(tasks);
       res.redirect("/");
   }
  }
  
  export {TaskList};
  //module.exports = TaskList;