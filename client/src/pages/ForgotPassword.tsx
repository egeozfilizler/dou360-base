import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { toast } from "sonner"; 

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<"email" | "reset">("email");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // Step 1: Request Code
  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      toast.success(data.message);
      setStep("reset");
    } catch (error: any) {
      toast.error(error.message || "An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Reset Password
  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code, newPassword }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      toast.success("Password reset successfully! Redirecting to login...");
      setTimeout(() => navigate("/signin"), 2000);
    } catch (error: any) {
      toast.error(error.message || "Failed to reset password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <section className="pt-32 pb-20 min-h-screen flex items-center">
        <div className="container-custom">
          <div className="max-w-md mx-auto bg-card border border-border rounded-2xl p-8">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold mb-2">Forgot Password</h1>
              <p className="text-muted-foreground">
                {step === "email" ? "Enter your email to receive a reset code" : "Enter the code and your new password"}
              </p>
            </div>

            {step === "email" ? (
              <form onSubmit={handleSendCode} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input 
                    required 
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary" 
                    placeholder="XXXXXXX@dogus.edu.tr" 
                  />
                </div>
                <button disabled={loading} type="submit" className="w-full btn-primary">
                  {loading ? "Sending..." : "Send Code"}
                </button>
              </form>
            ) : (
              <form onSubmit={handleResetPassword} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Verification Code</label>
                  <input 
                    required 
                    type="text" 
                    value={code} 
                    onChange={(e) => setCode(e.target.value)} 
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary text-center tracking-widest text-xl" 
                    placeholder="XXXXXX" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">New Password</label>
                  <input 
                    required 
                    type="password" 
                    value={newPassword} 
                    onChange={(e) => setNewPassword(e.target.value)} 
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary" 
                    placeholder="Enter new password" 
                  />
                </div>
                <button disabled={loading} type="submit" className="w-full btn-primary">
                  {loading ? "Processing..." : "Reset Password"}
                </button>
              </form>
            )}
            
            <div className="mt-6 text-center">
              <Link to="/signin" className="text-sm text-muted-foreground hover:underline">Back to Sign In</Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ForgotPassword;