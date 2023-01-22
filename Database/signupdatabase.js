var mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://kashan:kashan654321@cluster0.c6v8zv7.mongodb.net/?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
);
mongoose.set("strictQuery", false);
mongoose.connection.on("connected", () => {
  console.log("Sign Up Mongoose Connected Succesfully !");
});

mongoose.connection.on("disconnected", () => {
  console.log("Mongoos Finally Disconnected Ther Is'nt any Network");
  process.exit(1);
});

var userSchema = new mongoose.Schema({
  username: String,
  email: String,
  phone: Number,
  password: String,
  confPassword: String,
});
var imageSchema = new mongoose.Schema({
  image : {
    data : Buffer,
    contentType: String,
  }
});
var SignUpUserModel = mongoose.model("School Sign Up Data Base", userSchema);
var imageModel = mongoose.model("ImageData Base", imageSchema);

module.exports = {
  SignUpUserModel: SignUpUserModel,
  imageModel: imageModel,
};
