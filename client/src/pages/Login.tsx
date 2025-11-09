import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MessageSquare } from "lucide-react";
import { api } from "../api/client";
import { toast } from "sonner";
import { useUser } from "../context/UserContext";

const Login = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useUser();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await api.post("/users/login", {
      name,
      password,
    });
    if (!res.data.success) {
      toast.error(res.data.message);
    } else {
      toast.success(res.data.message);
      setUser({
        id: res.data.data.id,
        name: res.data.data.name,
      });
      navigate("/");
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

        <div className="bg-card border-4 border-border brutal-shadow-lg p-6 md:p-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">Welcome Back</h2>
          <p className="text-muted-foreground mb-6">Log in to your account</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="font-bold text-base">
                Name
              </Label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Chill Guy"
                className="border-4 border-border brutal-shadow-sm font-medium"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="font-bold text-base">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Something personal"
                className="border-4 border-border brutal-shadow-sm font-medium"
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full font-bold text-lg border-4 border-border brutal-shadow hover:translate-x-1 hover:translate-y-1 transition-transform"
            >
              Log In
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-muted-foreground">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="font-bold text-foreground hover:text-primary transition-colors underline"
              >
                Sign up
              </Link>
            </p>
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

export default Login;
