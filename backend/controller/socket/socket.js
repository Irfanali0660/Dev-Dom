const commentModel = require("../../model/commentModel");

jwt = require("../../helpers/jwt");

module.exports = {
  async chatMessages(io_liveChats) {
    const io = io_liveChats;
    io.use(jwt.verifySocketUserToken);
    io.on("connection", (socket) => {
      console.log(socket.jwtUSER._id);
      socket.on("message", async (message) => {
        console.log(message, "message");
        console.log(socket?.handshake?.query?.id);
        let comment = await commentModel.findOne({
          postId: socket?.handshake?.query?.id,
        });
        if (!comment) {
          const newComment = new commentModel({
            postId: socket?.handshake?.query?.id,
            comment: [
              {
                userId: socket.jwtUSER._id,
                message: message,
              },
            ],
          });
          (await newComment.save())
            .populate("comment.userId")
            .then(async (data) => {
              let message = await commentModel
                .findOne({ postId: socket?.handshake?.query?.id })
                .populate("comment.userId")
                .sort({ "comment.date": -1 });
              io.emit("new-message", message);
              console.log("success");
            });
        } else {
          let newComment = {
            userId: socket.jwtUSER._id,
            message: message,
          };
          console.log("else");
          commentModel
            .updateOne(
              { postId: socket?.handshake?.query?.id },
              { $push: { comment: newComment } }
            )
            .then(async (data) => {
              let message = await commentModel
                .findOne({ postId: socket?.handshake?.query?.id })
                .populate("comment.userId")
                .sort({ "comment.date": -1 });
              console.log(message);
              io.emit("new-message", message);
            })
            .catch((error) => {
              console.log(error);
            });
        }
      });
    });
  },
};
