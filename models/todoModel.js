const pool=require('../config/db');
const getTodos = async () => {
  const result = await pool.query('SELECT * FROM todos ORDER BY id ASC');
  return result.rows;
};
const addTodo=async (title,description)=>{
    const result=await pool.query('INSERT INTO todos (title,description) VALUES ($1,$2) RETURNING *',[title,description]);
    return result.rows;
}

const updateTodo=async (id,completed)=>{
    const result=await pool.query('UPDATE todos SET completed=$1 WHERE id=$2 RETURNING *',[completed,id]);
    return result.rows;
}

const deleteTodo=async (id)=>{
    const result=await pool.query('DELETE FROM todos WHERE id=$1 RETURNING *',[id]);
    return result.rowCount;
}
module.exports={getTodos,addTodo,updateTodo,deleteTodo};