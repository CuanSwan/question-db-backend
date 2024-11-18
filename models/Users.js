import { Schema,model } from "mongoose";

const userSchema = new Schema({
    name: String,
    surname: String,
    email: String,
    course: Object,
    progress: Object,
    password: String,
    createdAt: String,
    token: String
  });
  
  const User = model('User', userSchema);
  export default User;