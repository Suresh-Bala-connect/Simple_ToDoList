const express=require('express')
const cors=require('cors')
const dotenv=require('dotenv')
dotenv.config();

const DB=require('./db')
DB();
const app=express();
app.use(express.json())
app.use(cors())

const to_control=require('./controller/todo_controller')

app.get('/',(req,res)=>{
    res.send("Hi This is Server code")
})

app.post('/cre_todo',to_control.create);
app.get('/get-list',to_control.getLists);
app.put('/update_todo/:list_head',to_control.updata_todo)
app.delete('/delete_todo/:id',to_control.del_todo)

const PORT=process.env.PORT || 5015;

app.listen(PORT,()=>{
    console.log(`Server Created at the Port Number Of ${PORT}`)
})
