import LinkModel from "../models/LinkModel.js"
import UserModel from "../models/UserModel.js";
const LinksController = {
    getList: async (req, res) => {
        try {
            const Links = await LinkModel.find();//ללא סינון
            res.json(Links);
        } catch (e) {
            res.status(400).json({ message: e.message });
        }
    },

    getById: async (req, res) => {
        try {
            const Link = await LinkModel.findById(req.params.id);//שליפה לפי מזהה
            res.json(Link);
        } catch (e) {
            res.status(400).json({ message: e.message });
        }
    },

    add: async (req, res) => {
        const { originalUrl, userId } = req.body;
        try {
            // מציאת המשתמש על פי ה-ID שלו
            const user = await UserModel.findById(userId);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            console.log('User found:', user);

            const newLink = await LinkModel.create({ originalUrl });

            // הוספת הלינק החדש למערך של הלינקים של המשתמש
            user.links.push(newLink);
            await user.save();

            res.json(newLink);
        } catch (e) {
            res.status(400).json({ message: e.message });
        }
    },



    update: async (req, res) => {
        const { id } = req.params;
        try {
            const upLinkdLink = await LinkModel.findByIdAndUpdate(id, req.body, {
                new: true,
            });//עדכון לפי מזהה
            res.json(upLinkdLink);
        } catch (e) {
            res.status(400).json({ message: e.message });
        }
    },

    delete: async (req, res) => {
        const { id } = req.params;
        try {
            const deleted = await LinkModel.findByIdAndDelete(id);//מחיקה לפי מזהה
            res.json(deleted);
        } catch (e) {
            res.status(400).json({ message: e.message });
        }
    },

    redirectLink: async (req, res) => {
        try {
            const link = await LinkModel.findById(req.params.id);
            if (!link) {
                return res.status(404).send();
            }
            let targetParamValue = null;
            console.log(link.targetParamName)
            console.log(req.query[link.targetParamName])

            if (link.targetParamName && req.query.hasOwnProperty(link.targetParamName)) {
                targetParamValue = req.query[link.targetParamName];
            }

            link.clicks.push({
                ipAddress: req.connection.remoteAddress,  
                insertedAt: new Date,
                targetParamValue: targetParamValue
            });

            await link.save();
            res.redirect(link.originalUrl);
        } catch (error) {
            res.status(500).send(error);
        }
    }
};
export default LinksController;