import express from 'express';
import {imagesUpload} from "../multer";
import {MessageWithoutId} from "../types";
import fileDb from "../fileDb";

const messagesRouter = express.Router();

messagesRouter.get('/', async (req, res) => {
    const messages = await fileDb.getItems();
    return res.json(messages);
});

messagesRouter.post('', imagesUpload.single('image'), async (req, res) => {

    const author = req.body.author;
    const message = req.body.message;

    if (message.trim()) {
        const messageData: MessageWithoutId = {
            author: author.trim() ? author : 'Anonymous',
            message,
            image: req.file ? req.file.filename : null,
        };
        await fileDb.addItem(messageData);
    } else {
        return res.status(404).json({"error": "Message must be present in the request"});
    }

});

export default messagesRouter;