import * as TaskDao from "./models/taskDao"
import { any } from "joi";

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
       query: "SELECT * FROM ToDoList r WHERE r.completed=@completed",
       parameters: [
         {
           name: "@completed",
           value: true
         }
       ]
     };
  
     const items = this.taskDao.find(querySpec);
     return items;
   }
  
   async addTask(req:any, res:any) {
     //const item = req.body;
     const item = req.payload;
  
     this.taskDao.addItem(item);
     res.redirect("/");
   }
  
   async updateTask(req:any, res:any) {
     //const completedTasks = Object.keys(req.body);
     //const tasks = new Array();
     const item = req.payload;
     this.taskDao.updateItem(item);

     //completedTasks.forEach(task => {
     //  tasks.push(this.taskDao.updateItem(task));
     //});
  
     //await Promise.all(tasks);
       res.redirect("/");
   }
  

  async deleteTask(req:any,res:any) {
      const item = req.payload;
      this.taskDao.deleteItem(item);
  }
}
  export {TaskList};
  //module.exports = TaskList;