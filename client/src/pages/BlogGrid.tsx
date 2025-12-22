import { Link } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { Calendar, User } from "lucide-react";

const posts = [
  { id: 1, title: "10 Tips for Building a Successful Startup", excerpt: "Learn the essential strategies that can help your startup thrive.", category: "Business", author: "Sarah Johnson", date: "Dec 15, 2024" },
  { id: 2, title: "The Future of Web Development in 2025", excerpt: "Explore the emerging trends and technologies shaping web development.", category: "Technology", author: "Michael Chen", date: "Dec 12, 2024" },
  { id: 3, title: "Design Principles for Better User Experience", excerpt: "Discover the key design principles that create exceptional experiences.", category: "Design", author: "Emily Davis", date: "Dec 10, 2024" },
  { id: 4, title: "How to Scale Your Business Effectively", excerpt: "Strategic approaches to growing your business sustainably.", category: "Business", author: "Sarah Johnson", date: "Dec 8, 2024" },
  { id: 5, title: "Understanding Modern JavaScript Frameworks", excerpt: "A deep dive into React, Vue, and other popular frameworks.", category: "Technology", author: "Michael Chen", date: "Dec 5, 2024" },
  { id: 6, title: "Building a Strong Brand Identity", excerpt: "Essential steps to create a memorable brand.", category: "Design", author: "Emily Davis", date: "Dec 3, 2024" },
];

const BlogGrid = () => {
  return (
    <Layout>
      <section className="pt-32 pb-20">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Blog</h1>
            <p className="text-muted-foreground">Insights, tips, and stories from our team</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <Link key={post.id} to={`/blog/${post.id}`} className="group bg-card border border-border rounded-2xl overflow-hidden card-hover">
                <div className="aspect-video bg-gradient-to-br from-primary/20 to-purple-400/20" />
                <div className="p-6">
                  <span className="text-xs text-primary font-medium uppercase">{post.category}</span>
                  <h3 className="font-outfit font-semibold text-lg mt-2 mb-3 group-hover:text-primary transition-colors">{post.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4">{post.excerpt}</p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1"><User className="w-4 h-4" />{post.author}</div>
                    <div className="flex items-center gap-1"><Calendar className="w-4 h-4" />{post.date}</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default BlogGrid;