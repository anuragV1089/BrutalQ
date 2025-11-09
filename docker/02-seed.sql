-- ============================
--  DATABASE SEEDING
-- ============================

-- 👤 Seed Users
INSERT INTO users (name, password)
VALUES
  ('Anurag Verma', 'hashed_password_1'),
  ('Riya Singh', 'hashed_password_2'),
  ('Aman Sharma', 'hashed_password_3')
ON CONFLICT DO NOTHING;

-- 📝 Seed Posts
INSERT INTO posts (posted_by, question, description, upvotes)
VALUES
  (1, 'How to learn PostgreSQL?', 'I am new to SQL databases. Any good resources?', 3),
  (2, 'What is Docker Compose?', 'Can someone explain how docker-compose manages multiple containers?', 5),
  (3, 'Tips for mastering TypeScript?', 'What’s the best way to go beyond basics and use TS effectively?', 2)
ON CONFLICT DO NOTHING;

-- 💬 Seed Replies
INSERT INTO replies (posted_by, replied_on, content)
VALUES
  (2, 1, 'Start with the official PostgreSQL tutorial and use pgAdmin for practice!'),
  (3, 1, 'Check out freecodecamp and W3Schools SQL sections.'),
  (1, 2, 'Docker Compose is great for managing multi-container environments. Read the official docs!'),
  (3, 3, 'Build a project using TypeScript + React — that’s the best practice.'),
  (2, 3, 'Type challenges repo on GitHub is amazing!')
ON CONFLICT DO NOTHING;
