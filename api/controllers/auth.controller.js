import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import {errorHandler} from "../utils/error.js";

export const signup = async(req, res, next)=>{
    const { username, email, password } = req.body;
    const hashedpassword = await bcryptjs.hash(password, 12);
    const newUser = User({username, email, password: hashedpassword});
    try{
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
    }
    catch(error){
        next(error);
    }
}

export const signin = async(req, res, next) => {
    const { email, password } = req.body;
    try {
      const validUser = await User.findOne({ email }); //with findone we can find the first user with the email
      if (!validUser) {
        return next(errorHandler(404, "User not found"));
      }
      const validPassword = await bcryptjs.compare(password, validUser.password);
      if (!validPassword) {
        return next(errorHandler(401, "Wrong credentials"));
      }
      const { password: pass, ...rest } = validUser._doc; //we destructure the password from the user object and the rest. This _doc remove the unneccesary things
      const token = jwt.sign(
        { id: validUser._id, email: validUser.email },
        process.env.JWT_SECRET
      );
      let expiryDate = new Date(Date.now() + 60 * 60 * 3000);
      res
        .cookie("access_token", token, { httpOnly: true, expires: expiryDate})
        .status(200)
        .json(rest); 
    } catch (error) {
      next(error);
    }
}
