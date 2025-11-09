import { MessageSquare, LogIn, UserPlus } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useUser } from "../context/UserContext";

interface NavbarProps {
  onAddQuestion: () => void;
}

export const Navbar = ({ onAddQuestion }: NavbarProps) => {
  const { user } = useUser();
  return (
    <nav className="border-b-4 border-border bg-card brutal-shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="bg-primary p-2 border-4 border-border brutal-shadow-sm group-hover:translate-x-1 group-hover:translate-y-1 transition-transform">
            <MessageSquare
              className="h-6 w-6 text-primary-foreground"
              strokeWidth={3}
            />
          </div>
          <h1 className="text-2xl font-bold tracking-tight hidden sm:block">
            BrutalQ
          </h1>
        </Link>

        <div className="flex items-center gap-3">
          <Button
            onClick={onAddQuestion}
            className="font-bold border-4 border-border brutal-shadow hover:translate-x-1 hover:translate-y-1 transition-transform"
          >
            <span className="hidden sm:inline">Ask Question</span>
            <span className="sm:hidden">Ask</span>
          </Button>

          {user ? (
            <Link to="/logout">
              <Button
                variant="outline"
                className="font-bold border-4 border-border brutal-shadow hover:translate-x-1 hover:translate-y-1 transition-transform"
              >
                <LogIn className="h-4 w-4 sm:mr-2" strokeWidth={3} />
                <span className="hidden sm:inline">Log Out</span>
              </Button>
            </Link>
          ) : (
            <>
              <Link to="/login">
                <Button
                  variant="outline"
                  className="font-bold border-4 border-border brutal-shadow hover:translate-x-1 hover:translate-y-1 transition-transform"
                >
                  <LogIn className="h-4 w-4 sm:mr-2" strokeWidth={3} />
                  <span className="hidden sm:inline">Log In</span>
                </Button>
              </Link>

              <Link to="/signup">
                <Button
                  variant="secondary"
                  className="font-bold border-4 border-border brutal-shadow hover:translate-x-1 hover:translate-y-1 transition-transform"
                >
                  <UserPlus className="h-4 w-4 sm:mr-2" strokeWidth={3} />
                  <span className="hidden sm:inline">Sign Up</span>
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};
