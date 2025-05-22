import User from "../models/User.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'


export const signUp = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
    );

    // Send token as HTTP-only cookie and user info in response
    return res
      .cookie('token', token, {
        httpOnly: true,
      })
      .status(201)
      .json({
        msg: 'Signed Up Successfully',
        user,
      });
  } catch (err) {
    console.error(err);
    return res.status(401).json({
      error: 'Error while Signing Up',
    });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  
  const user = await User.findOne({ email });
  
  if (!user || !(await bcrypt.compare(password, user.password))) {
    
    return res.status(401).json({ msg: 'Invalid credentials' });
  }
  const token = jwt.sign({ 
    id: user._id, 
    role: user.role }, 
    process.env.JWT_SECRET);
  
   return res.cookie("token", token, {
      httpOnly: true,
    })
    .status(200)
    .json({ user,message: "Logged in successfully" });
};

export const getUsers = async (req,res) =>{
    
    const users = await User.find().select('-password'); // get all details excluding password
    res.json(users);

}
export const deleteUser = async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.status(204).json({
    msg:"User deleted Successfully"
  });
};