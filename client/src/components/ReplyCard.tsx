export interface Reply {
  id: string;
  content: string;
  createdAt: string;
  posted_by: number;
  author: string;
  replied_on: number;
}

interface ReplyCardProps {
  reply: Reply;
}

export const ReplyCard = ({ reply }: ReplyCardProps) => {
  return (
    <div className="bg-secondary/20 border-4 border-border brutal-shadow-sm p-4">
      <p className="text-foreground mb-3">{reply.content}</p>
      <div className="flex items-center gap-4 text-sm text-muted-foreground">
        <span className="font-bold">{reply.author}</span>
        <span>{new Date(reply.createdAt).toLocaleDateString()}</span>
      </div>
    </div>
  );
};
