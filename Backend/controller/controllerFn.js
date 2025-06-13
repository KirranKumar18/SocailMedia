import message from "../config/model/messages.js";


export const fetchChats = async(req,res)=>{

    try {
        const Chats = await message.find({})                                        // DB QUERY
        res.status(200).json({success:true, message:"retrived all the values"})
        console.log(Chats)
    } catch (error) {
        console.log(" error while fetching "+error.message)
        res.status(500).json({success: false, message :"ur missing some feild"})
    }
}

export const saveChats = async (req,res)=>{

    const messageBody = req.body
    if( !messageBody.Grpid || !messageBody.Sender || !messageBody.Message || !messageBody.image){     
      
        console.log("here its hit")
        return res.status(400).json({success: false, message :"ur missing some feild"})
    }
    const newMessage = new message(messageBody)

    try {
        await newMessage.save();
        res.status(201).json({success:true, message: `data added ${newMessage}`})
        console.log("chats sent to db succesfully")

    } catch (error) {
            console.log("ther is this error "+ error.message)
            res.status(500).json({success: false, message :"Server error"})
    }
    
}