// Backend/server.js
const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const { Server } = require("socket.io");

dotenv.config();

const app = express();
const server = http.createServer(app);

// Setup Socket.IO
const io = new Server(server, {
  cors: { origin: "*" },
});

// Middlewares
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB connected"))
.catch(err => console.error("❌ MongoDB error:", err));

// Define Message Schema
const messageSchema = new mongoose.Schema({
  groupId: String,
  sender: String,
  text: String,
  timestamp: {
    type: Date,
    default: Date.now,
  }
});
const Message = mongoose.model("Message", messageSchema);

// === Socket.IO Logic ===
io.on("connection", (socket) => {
  console.log("🟢 User connected:", socket.id);

  socket.on("joinGroup", (groupId) => {
    socket.join(groupId);
    console.log(`User joined group: ${groupId}`);
  });

  socket.on("sendMessage", async ({ groupId, sender, text }) => {
    const msg = new Message({ groupId, sender, text });
    await msg.save();

    // Emit the message to users in the group
    io.to(groupId).emit("newMessage", msg);
  });

  socket.on("disconnect", () => {
    console.log("🔴 User disconnected:", socket.id);
  });
});

// === HTTP fallback route (optional) ===
app.get("/", (req, res) => {
  res.send("✅ Chat server running");
});

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});



//io.to(groupId).emit("newMessage", msg);
