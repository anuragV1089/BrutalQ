import { ArrowBigUp, MessageCircle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export interface Question {
  id: number;
  question: string;
  description: string;
  upvotes: number;
  posted_by: string;
  replyCount: number;
  createdAt: string;
}

interface QuestionCardProps {
  question: Question;
  onUpvote: (id: number) => void;
}

export const QuestionCard = ({ question, onUpvote }: QuestionCardProps) => {
  const navigate = useNavigate();
  return (
    <div className="bg-card border-4 border-border brutal-shadow hover:translate-x-1 hover:translate-y-1 transition-transform p-6">
      <div
        onClick={() => {
          navigate(`/question/${question.id}`, { state: question });
        }}
        className="block"
      >
        <h2 className="text-xl font-bold mb-2 hover:text-primary transition-colors">
          {question.question}
        </h2>
        <p className="text-muted-foreground mb-4 line-clamp-2">
          {question.description}
        </p>
      </div>

      <div className="flex items-center gap-4">
        <Button
          onClick={(e) => {
            e.preventDefault();
            onUpvote(question.id);
          }}
          variant="outline"
          size="sm"
          className="border-4 border-border brutal-shadow-sm hover:translate-x-0.5 hover:translate-y-0.5 transition-transform font-bold"
        >
          <ArrowBigUp className="h-4 w-4 mr-1" strokeWidth={3} />
          {question.upvotes}
        </Button>

        <Button
          variant="outline"
          size="sm"
          className="border-4 border-border brutal-shadow-sm hover:translate-x-0.5 hover:translate-y-0.5 transition-transform font-bold"
          onClick={() => {
            navigate(`/question/${question.id}`, { state: question });
          }}
        >
          <MessageCircle className="h-4 w-4 mr-1" strokeWidth={3} />
          {question.replyCount}
        </Button>

        <span className="text-sm text-muted-foreground ml-auto">
          {new Date(question.createdAt).toLocaleDateString()}
        </span>
      </div>
    </div>
  );
};
