import UserModel from "../models/UserModel.js"

const UsersController = {
    getList: async (req, res) => {
        try {
          const Users = await UserModel.find();//ללא סינון
          res.json(Users);
        } catch (e) {
          res.status(400).json({ message: e.message });
        }
      },
    
      getById: async (req, res) => {
        try {
          const User = await UserModel.findById(req.params.id);//שליפה לפי מזהה
          res.json(User);
        } catch (e) {
          res.status(400).json({ message: e.message });
        }
      },
    
      add: async (req, res) => {
    const { name, email, password } = req.body; // פירוק המשתנים מהבקשה
    const user = new UserModel({
        name: name,
        email: email,
        password: password
    });
    try {
      const newUser = await user.save(); // שימור המשתמש החדש
      res.json(newUser);
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
},

        
    
      update: async (req, res) => {
        const { id } = req.params;
        try {
          const upUserdUser = await UserModel.findByIdAndUpdate(id, req.body, {
            new: true,
          });//עדכון לפי מזהה
          res.json(upUserdUser);
        } catch (e) {
          res.status(400).json({ message: e.message });
        }
      },
    
      delete: async (req, res) => {
        const { id } = req.params;
        try {
          const deleted = await UserModel.findByIdAndDelete(id);//מחיקה לפי מזהה
          res.json(deleted);
        } catch (e) {
          res.status(400).json({ message: e.message });
        }
      },
};
export default UsersController;