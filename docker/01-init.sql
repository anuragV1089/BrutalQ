-- ============================
--  DATABASE INITIALIZATION
-- ============================

-- 1️⃣ USERS TABLE
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  password TEXT NOT NULL
);

-- 2️⃣ POSTS TABLE
CREATE TABLE IF NOT EXISTS posts (
  id SERIAL PRIMARY KEY,
  posted_by INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  question TEXT NOT NULL,
  description TEXT NOT NULL,
  upvotes INT DEFAULT 0
);

-- 3️⃣ REPLIES TABLE
CREATE TABLE IF NOT EXISTS replies (
  id SERIAL PRIMARY KEY,
  posted_by INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  replied_on INT NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
  content TEXT NOT NULL
);

-- 🧩 Helpful Indexes
CREATE INDEX IF NOT EXISTS idx_posts_posted_by ON posts(posted_by);
CREATE INDEX IF NOT EXISTS idx_replies_posted_by ON replies(posted_by);
CREATE INDEX IF NOT EXISTS idx_replies_replied_on ON replies(replied_on);
