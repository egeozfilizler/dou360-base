const stats = [
  { value: "785+", label: "Happy Brands" },
  { value: "533+", label: "Global Clients" },
  { value: "99%", label: "Success Rate" },
  { value: "150+", label: "Team Members" },
];

export function Counter() {
  return (
    <section className="py-16 bg-primary">
      <div className="container-custom">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="text-center animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="text-4xl md:text-5xl font-bold text-primary-foreground mb-2">
                {stat.value}
              </div>
              <div className="text-primary-foreground/80">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}