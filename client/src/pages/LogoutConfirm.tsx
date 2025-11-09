import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MessageSquare, LogOut } from "lucide-react";
import { api } from "../api/client";
import { toast } from "sonner";
import { useUser } from "../context/UserContext";

const LogoutConfirm = () => {
  const { clearUser } = useUser();
  const navigate = useNavigate();
  const handleLogout = async () => {
    const res = await api.get("/users/logout");
    if (res.data.success) {
      toast.success(res.data.message);
      clearUser();
      navigate("/");
    } else {
      toast.error(res.data.message);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Link
          to="/"
          className="flex items-center justify-center gap-3 mb-8 group"
        >
          <div className="bg-primary p-3 border-4 border-border brutal-shadow group-hover:translate-x-1 group-hover:translate-y-1 transition-transform">
            <MessageSquare
              className="h-8 w-8 text-primary-foreground"
              strokeWidth={3}
            />
          </div>
          <h1 className="text-3xl font-bold">BrutalQ</h1>
        </Link>

        <div className="bg-card border-4 border-border brutal-shadow-lg p-6 md:p-8 text-center">
          <div className="bg-destructive/10 border-4 border-border p-4 md:p-6 mb-6 inline-block">
            <LogOut
              className="h-12 w-12 md:h-16 md:w-16 text-destructive"
              strokeWidth={3}
            />
          </div>

          <h2 className="text-3xl font-bold mb-3">Log Out?</h2>
          <p className="text-muted-foreground mb-8 text-lg">
            Are you sure you want to log out of your account?
          </p>

          <div className="space-y-4">
            <Button
              onClick={handleLogout}
              variant="destructive"
              className="w-full font-bold text-lg border-4 border-border brutal-shadow hover:translate-x-1 hover:translate-y-1 transition-transform"
            >
              Yes, Log Out
            </Button>

            <Link to="/" className="block">
              <Button
                variant="outline"
                className="w-full font-bold text-lg border-4 border-border brutal-shadow hover:translate-x-1 hover:translate-y-1 transition-transform"
              >
                Cancel
              </Button>
            </Link>
          </div>
        </div>

        <div className="mt-6 text-center">
          <Link
            to="/"
            className="text-muted-foreground hover:text-foreground font-medium transition-colors"
          >
            ← Back to questions
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LogoutConfirm;
