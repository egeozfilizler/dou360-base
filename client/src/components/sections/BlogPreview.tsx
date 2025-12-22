import { Link } from "react-router-dom";
import { ArrowRight, Calendar, User } from "lucide-react";

const posts = [
  {
    id: 1,
    title: "10 Tips for Building a Successful Startup",
    excerpt: "Learn the essential strategies that can help your startup thrive in today's competitive market.",
    category: "Business",
    author: "Sarah Johnson",
    date: "Dec 15, 2024",
  },
  {
    id: 2,
    title: "The Future of Web Development in 2025",
    excerpt: "Explore the emerging trends and technologies shaping the future of web development.",
    category: "Technology",
    author: "Michael Chen",
    date: "Dec 12, 2024",
  },
  {
    id: 3,
    title: "Design Principles for Better User Experience",
    excerpt: "Discover the key design principles that create exceptional user experiences.",
    category: "Design",
    author: "Emily Davis",
    date: "Dec 10, 2024",
  },
];

export function BlogPreview() {
  return (
    <section className="section-padding bg-muted/30">
      <div className="container-custom">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
          <div>
            <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
              Latest News
            </span>
            <h2 className="text-3xl md:text-4xl font-bold">
              From Our Blog
            </h2>
          </div>
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-primary hover:underline font-medium"
          >
            View All Posts
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Blog Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post, index) => (
            <Link
              key={post.id}
              to={`/blog/${post.id}`}
              className="group bg-card border border-border rounded-2xl overflow-hidden card-hover animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Image Placeholder */}
              <div className="aspect-video bg-gradient-to-br from-primary/20 to-purple-400/20" />
              
              <div className="p-6">
                <span className="text-xs text-primary font-medium uppercase tracking-wider">
                  {post.category}
                </span>
                <h3 className="font-outfit font-semibold text-lg text-foreground mt-2 mb-3 group-hover:text-primary transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                  {post.excerpt}
                </p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    {post.author}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {post.date}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}