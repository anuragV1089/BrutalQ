import { Request, Response } from "express";
import { pgClient } from "../config/databse";

class RouterController {
  async getPost(req: Request, res: Response) {
    const result = await pgClient.query(
      `SELECT p.*, json_build_object('id', u.id, 'name', u.name) AS posted_by, COUNT(r.id) AS reply_count, COALESCE(json_agg(json_build_object('id', r.id, 'content', r.content, 'created_at', r.created_at)) FILTER (WHERE r.id IS NOT NULL), '[]') AS replies FROM posts p LEFT JOIN replies r ON p.id = r.replied_on LEFT JOIN users u ON p.posted_by = u.id GROUP BY p.id, u.id ORDER BY p.id;
`
    );
    const data = result.rows;
    res.json({ success: true, data: data });
  }

  async createPost(req: Request, res: Response) {
    const { question, description } = req.body;
    console.log(req.body);
    const result = await pgClient.query(
      `INSERT INTO posts (posted_by, question, description) VALUES ($1, $2, $3) RETURNING *`,
      [req.session.userId, question, description]
    );
    const data = result.rows[0];
    res.json({
      success: true,
      data: data,
      message: "Post created successfully",
    });
  }

  async getSinglePost(req: Request, res: Response) {
    const { id: post_id } = req.params;

    const result = await pgClient.query(`SELECT * FROM posts WHERE id=$1`, [
      post_id,
    ]);
    if (result.rows.length == 0) {
      res
        .status(404)
        .json({ success: false, message: `Post has been deleted!` });
    }
    const data = result.rows[0];
    res.json({ success: true, data: data, message: "Post returned" });
  }

  async upvotePost(req: Request, res: Response) {
    const { id: post_id } = req.params;

    const result = await pgClient.query(
      `UPDATE posts SET upvotes = upvotes+1 WHERE id=$1 RETURNING upvotes`,
      [post_id]
    );

    if (result.rows.length == 0) {
      res
        .status(404)
        .json({ success: false, message: "This post doesn't exist" });
    }

    const data = result.rows[0];

    res.json({ success: true, data: data, message: "Upvoted!" });
  }
}

export default new RouterController();
