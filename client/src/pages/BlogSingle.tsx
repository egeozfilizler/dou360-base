import { Link, useParams } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { ArrowLeft, Calendar, User, Tag } from "lucide-react";

const BlogSingle = () => {
  const { id } = useParams();
  return (
    <Layout>
      <article className="pt-32 pb-20">
        <div className="container-custom max-w-4xl">
          <Link to="/blog" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8">
            <ArrowLeft className="w-4 h-4" /> Back to Blog
          </Link>
          <div className="aspect-video bg-gradient-to-br from-primary/20 to-purple-400/20 rounded-2xl mb-8" />
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
            <span className="flex items-center gap-1"><User className="w-4 h-4" /> Sarah Johnson</span>
            <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> Dec 15, 2024</span>
            <span className="flex items-center gap-1"><Tag className="w-4 h-4" /> Business</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-6">Blog Post #{id}</h1>
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="text-muted-foreground text-lg leading-relaxed mb-6">This is a sample blog post content. In a real application, you would fetch the actual content based on the post ID.</p>
            <p className="text-muted-foreground leading-relaxed mb-6">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</p>
            <h2 className="text-2xl font-bold mt-8 mb-4">Key Takeaways</h2>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-6">
              <li>Important point number one</li>
              <li>Another crucial insight</li>
              <li>Final key takeaway</li>
            </ul>
          </div>
        </div>
      </article>
    </Layout>
  );
};

export default BlogSingle;