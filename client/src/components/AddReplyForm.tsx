import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface AddReplyFormProps {
  onSubmit: (content: string) => void;
}

export const AddReplyForm = ({ onSubmit }: AddReplyFormProps) => {
  const [content, setContent] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim()) {
      onSubmit(content);
      setContent("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write your reply..."
        className="border-4 border-border brutal-shadow-sm min-h-[120px] font-medium"
        required
      />
      <Button
        type="submit"
        className="font-bold border-4 border-border brutal-shadow hover:translate-x-1 hover:translate-y-1 transition-transform"
      >
        Post Reply
      </Button>
    </form>
  );
};
