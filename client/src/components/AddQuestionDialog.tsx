import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface AddQuestionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (title: string, content: string) => void;
}

export const AddQuestionDialog = ({
  open,
  onOpenChange,
  onSubmit,
}: AddQuestionDialogProps) => {
  const [question, setQuestion] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (question.trim() && description.trim()) {
      onSubmit(question, description);
      setQuestion("");
      setDescription("");
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="border-4 border-border brutal-shadow-lg bg-card sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Ask a Question
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Share your question with the community and get answers!
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title" className="font-bold">
              Question Title
            </Label>
            <Input
              id="title"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="What's your question?"
              className="border-4 border-border brutal-shadow-sm font-medium"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="content" className="font-bold">
              Details
            </Label>
            <Textarea
              id="content"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Provide more context and details..."
              className="border-4 border-border brutal-shadow-sm min-h-[150px] font-medium"
              required
            />
          </div>

          <Button
            type="submit"
            className="w-full font-bold border-4 border-border brutal-shadow hover:translate-x-1 hover:translate-y-1 transition-transform"
          >
            Post Question
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
