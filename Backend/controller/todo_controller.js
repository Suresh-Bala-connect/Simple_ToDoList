const todo_blue_print = require('../model/todo_blue')

exports.create = async (req, res) => {
  try {
    const newData = await todo_blue_print.create(req.body)
    res.status(200).json({ sucess: true, message: "success", data: newData },)
  }
  catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
}

// Get all users
exports.getLists = async (req, res) => {
  try {
    const users = await todo_blue_print.find();
    res.json({ success: true, data: users });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


exports.updata_todo = async (req, res) => {
  try {
    const list_head = req.params.list_head;
    const up_data = await todo_blue_print.findOneAndUpdate(
      { todo_head: list_head },
      req.body,
      { new: true }
    )
    res.status(200).json({ success: true, data: up_data })
  }
  catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}

exports.del_todo = async (req, res) => {
  try {
    const id = req.params.id;
    const up_data = await todo_blue_print.findByIdAndDelete(id)
    res.status(200).json({ success: true, data: up_data })
  }
  catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}