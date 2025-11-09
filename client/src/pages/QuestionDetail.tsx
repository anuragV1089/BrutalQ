import { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { ArrowBigUp, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ReplyCard, Reply } from "@/components/ReplyCard";
import { AddReplyForm } from "@/components/AddReplyForm";
import { toast } from "sonner";
import { Question } from "@/components/QuestionCard";
import { useUser } from "@/context/UserContext";
import { api } from "@/api/client";

const QuestionDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state: questionProp } = useLocation();
  const [question, setQuestion] = useState<Question | null>(questionProp);
  const [replies, setReplies] = useState<Reply[]>([]);
  const { user } = useUser();

  async function fetchReplies() {
    const res = await api.get(`/replies/${question.id}`);
    if (!res.data.success) {
      toast.error(res.data.message);
    } else {
      const data: Reply[] = res.data.data.map((ele) => {
        return {
          id: ele.id,
          posted_by: ele.posted_by,
          content: ele.content,
          createdAt: ele.created_at,
          author: ele.user.name,
          replied_on: question.id,
        };
      });
      console.log(data);
      setReplies([...data]);
    }
  }

  useEffect(() => {
    fetchReplies();
    setQuestion(question);
  }, []);

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
    setQuestion({ ...question, upvotes });
    toast.success("Upvoted!");
  };

  const handleAddReply = async (content: string) => {
    const res = await api.post(`/replies/${question.id}`, { content });
    if (res.data.success) {
      setReplies([...replies, res.data.data]);
      toast.success("Reply posted!");
    }
    if (question) {
      setQuestion({ ...question, replyCount: question.replyCount + 1 });
    }
  };

  if (!question) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold">Loading...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Button
          onClick={() => navigate("/")}
          variant="outline"
          className="mb-6 font-bold border-4 border-border brutal-shadow-sm hover:translate-x-0.5 hover:translate-y-0.5 transition-transform"
        >
          <ArrowLeft className="h-4 w-4 mr-2" strokeWidth={3} />
          Back to Questions
        </Button>

        <div className="bg-card border-4 border-border brutal-shadow-lg p-8 mb-8">
          <h1 className="text-3xl font-bold mb-4">{question.question}</h1>
          <p className="text-foreground mb-6 text-lg leading-relaxed">
            {question.description}
          </p>

          <div className="flex items-center gap-4">
            <Button
              onClick={() => {
                handleUpvote(question.id);
              }}
              variant="outline"
              className="border-4 border-border brutal-shadow-sm hover:translate-x-0.5 hover:translate-y-0.5 transition-transform font-bold w-full sm:w-auto"
            >
              <ArrowBigUp className="h-5 w-5 mr-2" strokeWidth={3} />
              {question.upvotes} Upvotes
            </Button>

            <span className="text-sm text-muted-foreground">
              Posted on {new Date(question.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>
        <div className="bg-card border-4 border-border brutal-shadow-lg p-6 mb-4">
          <h3 className="text-xl font-bold mb-4">Add Your Reply</h3>
          <AddReplyForm onSubmit={handleAddReply} />
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-bold">{replies.length} Replies</h2>

          <div className="space-y-4">
            {replies.map((reply) => (
              <ReplyCard key={reply.id} reply={reply} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionDetail;
