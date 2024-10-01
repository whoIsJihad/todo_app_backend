const { json } = require("express");
const Todo = require("../models/todoModel");
const getTodos = async (req, res) => {
  try {
    const todos = await Todo.getTodos();
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addTodo = async (req, res) => {
  const { title, description } = req.body;
  try {
    const newTodo = await Todo.addTodo(title, description);
    res.status(201).json(newTodo);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateTodo= async(req,res)=> {
    const {id}=req.params;
    const {completed}=req.body;

    try{
        const updatedTodo=await Todo.updateTodo(id,completed)
        res.status(200).json(updatedTodo)
    }
    catch(error){
        res.status(500).json({message:error.message})
    }
}

const deleteTodo=async (req,res)=>{
    const {id}=req.params;
    try{
        const deletedCount=Todo.deleteTodo(id);
        if(deletedCount>0){
            res.status(200).json({message:"To do deleted"});

        }
        else {
            res.status(404).json({message:"To do not found"})
        }

    }
    catch(error){
        res.status(500).json({message:error.message})
    }
}

module.exports={getTodos,addTodo,updateTodo,deleteTodo}