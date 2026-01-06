import { Link } from "react-router-dom";
import { Layout } from "@/components/Layout";

const SignUp = () => {
  return (
    <Layout>
      <section className="pt-32 pb-20 min-h-screen flex items-center">
        <div className="container-custom">
          <div className="max-w-md mx-auto bg-card border border-border rounded-2xl p-8">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold mb-2">Create Account</h1>
              <p className="text-muted-foreground">Start your free trial today</p>
            </div>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Full Name</label>
                <input type="text" className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input type="email" className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Password</label>
                <input type="password" className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary" />
              </div>
              <label className="flex items-start gap-2 text-sm"><input type="checkbox" className="rounded mt-1" /><span className="text-muted-foreground">I agree to the <a href="#" className="text-primary hover:underline">Terms</a> and <a href="#" className="text-primary hover:underline">Privacy Policy</a></span></label>
              <button type="submit" className="w-full btn-primary">Create Account</button>
            </form>
            <p className="text-center text-muted-foreground text-sm mt-6">Already have an account? <Link to="/signin" className="text-primary hover:underline">Sign in</Link></p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default SignUp;