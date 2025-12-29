import React, { useEffect } from "react";
import { useState } from "react";
import './ToDoList.css';
import axios from "axios";
import { resume } from "react-dom/server";
function ToDoList() {

    const [listAct, setlistAct] = useState("")
    const [listDec, setlistDec] = useState("")
    const [listHead, setlistHead] = useState("")
    const [editMode, setEditMode] = useState(false);

    const [listdata, setlistdata] = useState([])

    function handleHead(e) {
        setlistHead(e.target.value)
        // console.log(e.target.value)
    }

    function handleAct(e) {
        setlistAct(e.target.value)
        // console.log(e.target.value)
    }
    function handleDec(e) {
        setlistDec(e.target.value)
        // console.log(e.target.value)
    }

    function addTolist(e) {
        const list_of_data = {
            getHead: listHead,
            getAct: listAct,
            getDec: listDec
        }
        setlistdata([...listdata, list_of_data])
        // console.log("Hi")
        setlistHead("")
        setlistAct("")
        setlistDec("")


        create_list();
    }

    const create_list = async () => {
        try {
            const to_list = { todo_head: listHead, todo_activity: listAct, todo_dec: listDec }
            let result = await axios.post('http://localhost:5015/cre_todo', to_list)
            console.log(result)
            if (result.data.sucess) {
                alert("List Added")
                get_lists();
            }
        }
        catch (err) {
            console.log("failed", err);

        }
    }

    const get_lists = async () => {
        try {
            const res = await axios.get("http://localhost:5015/get-list");
            setlistdata(res.data.data);
        }catch(err){
            console.log("failed to fetch", err);
        }
    }

    const update=async(list_head)=>{
        try{
            const to_list = { todo_activity: listAct, todo_dec: listDec }
            const result = await axios.put(`http://localhost:5015/update_todo/${list_head}`,to_list)
            console.log(result)
            get_lists();
        }
        catch(err){
            console.log("failed to fetch", err)
        }
    }

    const delete_todo_items = async(item)=>{
        console.log(item);
        
         try{
            const result = await axios.delete(`http://localhost:5015/delete_todo/${item._id}`)
            console.log(result)
            get_lists();
        }
        catch(err){
            console.log("failed to fetch", err)
        }
    }

    useEffect(()=>{
        get_lists();
    },[])

    function delete_items(list_del) {
        // const rest_item = listdata.filter(item => {
        //     return (
        //         item.getHead !== list_del
        //     )
        // })
        // // console.log("Hi")
        // setlistdata(rest_item)
        delete_todo_items(list_del)
    }

    function edit_items(item) {
        setlistAct(item.todo_activity);
        setlistDec(item.todo_dec);
        setlistHead(item.todo_head);
        setEditMode(true);
    }


  

    function update_list(list) {
        // const list_of_data = {
        //     getHead: listHead,
        //     getAct: listAct,
        //     getDec: listDec
        // }
        // setlistdata([...listdata, list_of_data])
        // // console.log("Hi")
        // setlistHead("")
        // setlistAct("")
        // setlistDec("")
        update(list)
    }

    return (

        <div className="container">
            <div className="todolist">
                <div className="heading">
                    <h2>To Do List Site</h2>
                </div>

                <div className="listdata">
                    <input type="text" placeholder="Heading"
                        value={listHead}
                        onChange={handleHead}>
                    </input>
                </div>

                <div className="listdata">
                    <input type="text" placeholder="Activity"
                        value={listAct}
                        onChange={handleAct}>
                    </input>
                </div>

                <div className="listdata">
                    <input type="text" placeholder="Activity Descriptions"
                        value={listDec}
                        onChange={handleDec}>
                    </input>
                </div>

                <div className="addList">
                    {
                        editMode ? <button onClick={() => update(listHead)}>Update List</button>
                            :
                            <button onClick={addTolist}>Add List</button>
                    }
                </div>

                {/* Table Creations */}
                <div className="table_list">
                    <table>
                        <thead>
                            <tr>
                                <th>SI.No</th>
                                <th>Head</th>
                                <th>Activity</th>
                                <th>Descriptions</th>
                                <th>Edit</th>
                                <th>Delete</th>
                            </tr>
                        </thead>

                        {<tbody>
                            {
                                listdata.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{item.todo_head}</td>
                                            <td>{item.todo_activity}</td>
                                            <td>{item.todo_dec}</td>
                                            <td><button onClick={() => edit_items(item)}>Edit</button></td>
                                            <td><button onClick={() => delete_items(item)}>Delete</button></td>
                                        </tr>

                                    )
                                })
                            }
                        </tbody>}
                    </table>
                </div>

            </div>

        </div>
    )
}

export default ToDoList;