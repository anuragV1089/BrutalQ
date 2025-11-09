import { Request, Response } from "express";
import { pgClient } from "../config/databse";

class ReplyController {
  async getReplies(req: Request, res: Response) {
    const { id: post_id } = req.params;

    const result = await pgClient.query(
      `SELECT r.id, r.content, r.created_at, json_build_object('id', u.id, 'name', u.name) AS user FROM replies r JOIN users u ON r.posted_by = u.id WHERE r.replied_on = $1 ORDER BY r.created_at ASC;`,
      [post_id]
    );
    if (result.rows.length == 0) {
      res.json({ success: false, message: `No replies yet!` });
      return;
    }

    const data = result.rows;
    res.json({
      success: true,
      data: data,
      message: `All replies on this post!`,
    });
  }

  async addReply(req: Request, res: Response) {
    const { id: post_id } = req.params;
    const { content } = req.body;

    const result = await pgClient.query(
      `INSERT INTO replies (posted_by, replied_on, content) VALUES ($1, $2, $3) RETURNING *`,
      [req.session.userId, post_id, content]
    );
    console.log(result.rows);
    res.json({
      success: true,
      data: result.rows[0],
      message: `Reply posted successfully!`,
    });
  }
}

export default new ReplyController();
