const messageModel = require("../models/messages.model");

const getToken = (sender, receiver) => {
    const key = [sender, receiver].sort().join("_");
    return key;
}

const saveMessages = async({ from, to, message, time }) => {
    const token = getToken(from, to);
    const data = {
        from, message, time
    }
    messageModel.updateOne({ userToken: token }, {
        $push: { message: data }
    }, (err, res) => {
        if (err) console.error(err);
        console.log('메세지가 생성되었습니다.');
    })
}


const fetchMessages = async (io, sender, receiver) => {
    const token = getToken(sender, receiver);
    const foundToken = await messageModel.findOne({ userToken: token });
    if(foundToken) {
        io.to(sender).emit('stored-messages', { messages: foundToken.messages });
    }else{
        const data = {
            userToken: token, 
            messages: []
        }
        const message = new messageModel(data);
        const savedMessage = message.save();
        if(savedMessage) {
            console.log('메세지가 생성되었습니다.')
        }else{
            console.log('메세지 생성 중 에러가 발생했습니다.')
        }
    }
}

module.exports = {
    saveMessages,
    fetchMessages,
}

