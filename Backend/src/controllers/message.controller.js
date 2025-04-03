import User from "../models/user.model.js";
import Message from "../models/message.model.js";
 
export const getUsersForSidebar = async(req, res) => {
    try {
        const loggedInUser = req.user._id;
        const filteredUsers = await User.find({_id:{$ne:loggedInUser}}).select("-password");
        
        res.status(200).json(filteredUsers);
        
    } catch (error) {
        console.error("Error in getUsersForSidebar controller:", error);
        res.status(500).json({message: "Internal Server Error"});
    }
};

export const getMessages = async(req, res) => {
    try {
        const {id:userToChatId} = req.params;
        const myId = req.user._id;

        const messages = await Message.find({
           $or:[
            {sendrId:myId, reciverId:userToChatId}, 
            {sendrId:userToChatId, reciverId:myId}
        ] 
        })

        res.status(200).json(messages);
    } catch (error) {
        console.log("Error in getMessages controller", error.message);
        res.status(500).json({message: "Internal Server Error"});
    }
};

export const sendMessage = async(req, res) => {
    try {
        const {text, image} = req.body;
        const {id:receiverId} = req.params;
        const senderId = req.user._id;

        let imageUrl;
        if(image){
            const uploadedResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadedResponse.secure_url;
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image:imageUrl,
        });

        await newMessage.save();

        res.status(201).json(newMessage);
        
    } catch (error) {
        console.log("Error in sendMessage controller", error.message);
        res.status(500).json({message: "Internal Server Error"});
    }
};