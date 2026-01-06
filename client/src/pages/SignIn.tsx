import { Link } from "react-router-dom";
import { Layout } from "@/components/Layout";

const SignIn = () => {
  return (
    <Layout>
      <section className="pt-32 pb-20 min-h-screen flex items-center">
        <div className="container-custom">
          <div className="max-w-md mx-auto bg-card border border-border rounded-2xl p-8">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold mb-2">Welcome Back</h1>
              <p className="text-muted-foreground">Sign in to your account</p>
            </div>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input type="email" className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Password</label>
                <input type="password" className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary" />
              </div>
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2"><input type="checkbox" className="rounded" /> Remember me</label>
                <a href="#" className="text-primary hover:underline">Forgot password?</a>
              </div>
              <button type="submit" className="w-full btn-primary">Sign In</button>
            </form>
            <p className="text-center text-muted-foreground text-sm mt-6">Don't have an account? <Link to="/signup" className="text-primary hover:underline">Sign up</Link></p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default SignIn;