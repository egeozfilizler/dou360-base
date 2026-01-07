import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { toast } from "sonner";

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username:" ", email: "", password: "" });
  const [step, setStep] = useState<"info" | "verify">("info");
  const [userEnteredCode, setUserEnteredCode] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // If the input is "username", strip special characters
    if (e.target.name === "username") {
      const value = e.target.value.replace(/[^a-zA-Z0-9]/g, ""); 
      setFormData({ ...formData, [e.target.name]: value });
    } else {
      // Other fields (fullName, email, password) behave normally
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/send-code`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          email: formData.email,
          password: formData.password 
        }),
      });

      const data = await res.json();
      
      if (!res.ok) throw new Error(data.message);

      toast.success(data.message);
      setStep("verify");

    } catch (error: any) {
            toast.error(error.message || "An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyAndRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, code: userEnteredCode }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message);

      toast.success("Registration successful! Redirecting to sign-in page.");
      setTimeout(() => navigate("/signin"), 2000);

    } catch (error: any) {
      toast.error(error.message || "Registration failed.");
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
              <h1 className="text-2xl font-bold mb-2">Create Account</h1>
              <p className="text-muted-foreground">{step === "info" ? "Join the DOU360 experience" : "Verify your email"}</p>
            </div>
            
            {step === "info" ? (
              <form onSubmit={handleSendCode} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Username</label>
                  <input 
                    required 
                    name="username" 
                    type="text" 
                    value={formData.username} 
                    onChange={handleChange} 
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary" 

                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">School Email</label>
                  <input required name="email" type="email" onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Password</label>
                  <input required name="password" type="password" onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary" />
                </div>
                <button disabled={loading} type="submit" className="w-full btn-primary">
                  {loading ? "Processing..." : "Send Verification Code"}
                </button>
              </form>
            ) : (
              <form onSubmit={handleVerifyAndRegister} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Verification Code</label>
                  <input required type="text" placeholder="XXXXXX" value={userEnteredCode} onChange={(e) => setUserEnteredCode(e.target.value)} className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary text-center tracking-widest text-xl" />
                </div>
                <button disabled={loading} type="submit" className="w-full btn-primary">
                  {loading ? "Saving..." : "Complete Registration"}
                </button>
                <button type="button" onClick={() => setStep("info")} className="w-full text-sm text-muted-foreground hover:underline mt-2">Go Back</button>
              </form>
            )}
            <p className="text-center text-muted-foreground text-sm mt-6">Already have an account? <Link to="/signin" className="text-primary hover:underline">Sign in</Link></p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default SignUp;