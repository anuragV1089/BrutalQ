import { useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { QuestionCard, Question } from "@/components/QuestionCard";
import { AddQuestionDialog } from "@/components/AddQuestionDialog";
import { toast } from "sonner";
import { api } from "../api/client";
import { AxiosResponse } from "axios";
import { useUser } from "@/context/UserContext";

const Index = () => {
  const { user } = useUser();
  async function fetchPosts() {
    const res: AxiosResponse = await api.get("/posts");
    const data = res.data.data.map((ele) => {
      return {
        id: ele.id,
        question: ele.question,
        description: ele.description,
        upvotes: ele.upvotes,
        posted_by: ele.posted_by.name,
        replyCount: ele.reply_count,
        createdAt: ele.created_at,
      };
    });
    setQuestions([...data]);
  }

  useEffect(() => {
    fetchPosts();
  }, []);

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([]);

  const handleAddQuestion = async (question: string, description: string) => {
    if (!user) {
      toast.error("Please log in first!");
      return;
    }
    const newQuestion = {
      id: 5,
      question,
      description,
      upvotes: 0,
      replyCount: 0,
      posted_by: user.name,
      createdAt: new Date().toISOString(),
    };
    const res = await api.post("/posts", {
      ...newQuestion,
    });
    if (res.data.success) {
      toast.success("New Question added successfully!");
      setQuestions([newQuestion, ...questions]);
    } else {
      toast.error(res.data.message);
    }
  };

  const handleUpvote = async (id: number) => {
    if (!user) {
      toast.error("Please log in first!");
      return;
    }
    const res = await api.post(`/posts/${id}/upvote`, {});
    if (!res.data.success) {
      toast.error(res.data.message);
      return;
    }
    const upvotes = res.data.data.upvotes;
    setQuestions(
      questions.map((q) => (q.id === id ? { ...q, upvotes: upvotes } : q))
    );
    toast.success("Upvoted!");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar
        onAddQuestion={() => {
          if (!user) {
            toast.error("Please Log in first!");
            return;
          }
          setIsAddDialogOpen(true);
        }}
      />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Ask. Answer. Learn.
          </h1>
          <p className="text-xl text-muted-foreground">
            A bold Q&A platform where your questions get real answers.
          </p>
        </div>

        <div className="grid gap-6">
          {questions.map((question) => (
            <QuestionCard
              key={question.id}
              question={question}
              onUpvote={handleUpvote}
            />
          ))}
        </div>
      </main>

      <AddQuestionDialog
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        onSubmit={handleAddQuestion}
      />
    </div>
  );
};

export default Index;
