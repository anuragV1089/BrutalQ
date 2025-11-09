import { Request, Response } from "express";
import { pgClient } from "../config/databse";
import bcrypt from "bcrypt";
import ExpressError from "../config/errorHandler";

class UserController {
  async signup(req: Request, res: Response) {
    console.log(req.body);
    const { name, password } = req.body;

    const existingUser = await pgClient.query(
      `SELECT * FROM users where name = $1`,
      [name]
    );
    if (existingUser.rows.length > 0) {
      throw new ExpressError("User Already exists!", 400);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pgClient.query(
      `INSERT INTO users (name, password) VALUES ($1, $2) RETURNING *`,
      [name, hashedPassword]
    );

    const user = result.rows[0];
    req.session.userId = user.id;
    req.session.userName = user.name;
    res.json({
      success: true,
      data: user,
      message: `Sign up in successfully!`,
    });
  }

  async login(req: Request, res: Response) {
    const { name, password } = req.body;

    const result = await pgClient.query(`SELECT * FROM users WHERE name=$1`, [
      name,
    ]);
    const user = result.rows[0];
    if (!user) {
      res.json({ success: false, message: `User ${name} does not exist` });
    }

    const match = bcrypt.compare(password, user.password);
    if (!match) {
      return res.json({ success: false, message: "Invalid Credentials" });
    }

    req.session.userId = user.id;
    req.session.userName = user.name;
    res.json({
      success: true,
      data: user,
      message: `Login for ${name} successful!`,
    });
  }

  async logout(req: Request, res: Response) {
    req.session.destroy((err) => {
      if (err) return res.json({ success: false, message: `Logout failed` });

      res.clearCookie("sid");
      res.json({ success: true, message: `Logout successful` });
    });
  }

  async me(req: Request, res: Response) {
    const result = await pgClient.query(
      "SELECT id, name FROM users WHERE id = $1",
      [req.session.userId]
    );
    if (result.rows.length == 0) {
      res.json({ success: false, message: `Who are you?` });
    }
    const user = result.rows[0];
    res.json({ success: true, data: user, message: "Welcome my friend!" });
  }
}

export default new UserController();
