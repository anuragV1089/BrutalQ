# [BrutalQ]

> A full-stack application with a React frontend, Node.js backend, and PostgreSQL database. The entire app is containerized with Docker and runs with a single command.

This project is fully containerized and includes a pre-seeded database, allowing you to get up and running in just a few minutes.

---

## 🚀 Tech Stack

* **Frontend:** React (built with Vite)
* **Backend:** Node.js (with Express)
* **Database:** PostgreSQL
* **Containerization:** Docker & Docker Compose

---

## 🏁 Getting Started

### Prerequisites

* You must have [**Docker**](https://www.docker.com/get-started) and **Docker Compose** installed on your machine.
* [**Git**](https://git-scm.com/) (for cloning the repo)

### 🚀 Quick Start

1.  **Clone the Repository**
    ```bash
    git clone [https://github.com/](https://github.com/)[your-github-username]/[your-repo-name].git
    cd [your-repo-name]
    ```

2.  **Create Your Environment File**
    This project uses an `.env.example` file. Copy it to create your local `.env` file.
    ```bash
    cp .env.example .env
    ```
    > **Important:** Open the new `.env` file and fill in any necessary values (like secrets or passwords). The defaults from `.env.example` will work for local development.

3.  **Build & Run with Docker Compose**
    This one command builds the frontend and backend images, starts all three containers (frontend, backend, db), and runs the database seed scripts.
    ```bash
    docker compose up --build
    ```
    * Use the `-d` flag to run in detached (background) mode: `docker compose up --build -d`

4.  **Access Your Application**
    * **Frontend:** [http://localhost:3000](http://localhost:3000)
    * **Backend API:** [http://localhost:4000](http://localhost:4000)

To stop the application, run:
```bash
docker compose down
