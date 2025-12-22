const clients = [
  { name: "Google", letter: "G" },
  { name: "Microsoft", letter: "M" },
  { name: "Amazon", letter: "A" },
  { name: "Meta", letter: "F" },
  { name: "Apple", letter: "A" },
  { name: "Netflix", letter: "N" },
];

export function Clients() {
  return (
    <section className="section-padding">
      <div className="container-custom">
        <div className="text-center mb-10">
          <p className="text-muted-foreground">
            Trusted by leading companies worldwide
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {clients.map((client, index) => (
            <div
              key={client.name}
              className="flex items-center justify-center h-20 bg-muted/50 rounded-xl hover:bg-muted transition-colors animate-fade-in"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className="flex items-center gap-2 text-muted-foreground">
                <span className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center font-bold text-lg">
                  {client.letter}
                </span>
                <span className="font-medium hidden sm:inline">{client.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}