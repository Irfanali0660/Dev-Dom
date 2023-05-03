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
      socket.on("replay", async (replay) => {
        console.log(replay, "replay");
        console.log(socket?.handshake?.query?.id);
        let newreplay = {
            replayuserId: socket.jwtUSER._id,
            message: replay.message,
            date:Date.now()
          };
         commentModel.updateOne({_id:replay.commentId},{ $push: { replay: { $each: [ newreplay ], $position: 0 } } })
         .then(async (data) => {
            let replay = await commentModel
              .find({ postId: socket?.handshake?.query?.id })
              .populate('userId')
              .populate("replay.replayuserId")
              .sort({ "date": -1 });
            console.log(replay,'replay result');
            io.emit("new-replay", replay);
          })
      });
    });
  },
};
