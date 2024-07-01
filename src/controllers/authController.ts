import { Request, Response } from "express";
import { User } from "../entites/user";
import jwt from "jsonwebtoken";

const registerUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    console.log(req.body);
    const user = new User();
    user.name = name;
    user.email = email;
    user.password = password;

    await user.save();

    res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating user" });
  }
};
const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ massage: "Email and password are required" });
  }

  try {
    const user = await User.findOneBy({ email });
    if (!user) {
      return res.status(400).json({ massage: " Invalid email or password" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ massage: " Invalid email or password" });
    }

    const token = jwt.sign(
      { id: user.id },
      "23YRT23OU13IRUY34TI2U3RO13T2U4YI3I23I1267851907436253105274665312473546250376345203237564052673453640367504254735Y9T4UIOREHTRIGJFBSLKVDAIURHETBJKNFLSVEOEHRVEBJNFKMFJJOIEWUNDKVMIWEJGHUBFJNKMIOQGEWYUVHIJOKELMNWGDBHJNKBWRFUHINJKWRBUOJNWBLVBHYJKNRIWJUHBWIER",
      {
        expiresIn: "1h",
      }
    );
    return res.json({ token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: " Error logging in", error });
  }
};

export { registerUser, loginUser };
