const chatModel = require("../../model/chatModel");
const commentModel = require("../../model/commentModel");

jwt = require("../../helpers/jwt");

module.exports = {

  // comment using socket io

  async chatMessages(replay) {
    const io = replay;
    io.use(jwt.verifySocketUserToken);
    io.on("connection", (socket) => {
        console.log(socket);
      console.log(socket.jwtUSER,'user');
      socket.on("chat", async (chat) => {
        console.log(chat,);
        console.log(socket?.handshake?.query?.roomid);
        
        chatModel.updateOne({_id:socket?.handshake?.query?.roomid},{$push:{
            messages:{text:chat,sender:socket.jwtUSER,time:Date.now()}
        }}).then(async(chat)=>{
            let chatMessages = await chatModel
                .findOne({ _id: socket?.handshake?.query?.roomid })
                .populate("messages.sender")
            io.emit("chat", chatMessages);
        })  
      });
    });
  },
};
