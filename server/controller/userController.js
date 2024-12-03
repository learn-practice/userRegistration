const User = require("../model/userModel.js");
const upload = require("../middleware/multer.js");
//get user
const getUser = async(req,res)=>{
    try {
        const user = await User.find();
        if(!user)
        {
            res.status(404).json({message:"data not found"});
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({message:error.message});
        console.log("error in getUser",error,message);
    }
}
// registration

const registration = async (req, res) => {
  try {
    const { name, email, phoneNumber } = req.body;
    const profileImage = req.file ? req.file.path : null;
    if (name == "" || email == "" || phoneNumber == "") {
      res.status(404).json({ message: "all feild are menditary" });
    }
    const user = await User.findOne({ email });
    if (user) {
      res.json({ message: "user alredy exist" });
    } else {
      const newUser = new User({ name, email, phoneNumber, profileImage });
      await newUser.save();
      res.status(200).json({ message: "user register successfully" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log("error in registration");
  }
};

//delete user
const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const user =await User.findById(userId);
    if (!user) {
      res.status(404).json({ message: "user not found" });
    }

    await User.findByIdAndDelete(userId);
    res.status(200).json({ message: "user delted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log("error in delete user", error);
  }
};

//update user
const updateUser = async (req, res) => {
  try {
    const { name, email, phoneNumber } = req.body;
    const profileImage = req.file ? req.file.path : null;
    const userId = req.params.id;
    let user = await User.findById(userId);
    if (!user) {
      res.status(404).json({ message: "user not found" });
    }
    user.name = name || user.name;
    user.email = email || user.name;
    user.phoneNumber = phoneNumber || user.phoneNumber;
    if (profileImage) {
      user.profileImage = profileImage;
    }
    user = await user.save();
    res.status(200).json({ message: "user updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log("error in update user", error.message);
  }
};

module.exports = {getUser, registration, deleteUser, updateUser };
