const audiences = [
  "Web3 companies and protocols",
  "Digital asset firms",
  "Tokenization and RWA platforms",
  "DeFi protocols",
  "Exchanges and trading businesses",
  "Institutional digital asset companies",
  "Fintechs entering digital assets",
];

export function W3AudienceSection() {
  return (
    <section aria-labelledby="w3-audience-heading" className="py-24 lg:py-32 bg-card/30">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="section-cluster max-w-3xl mx-auto text-center mb-12">
          <span className="label-mono text-primary mb-4 block">Who It Is For</span>
          <h2 id="w3-audience-heading" className="section-heading">
            Built for companies selling something complex
          </h2>
          <p className="text-lg text-muted-foreground mt-6">
            Our work suits organisations whose product needs explaining and whose buyers need convincing — where credibility, clarity and accuracy matter more than volume.
          </p>
        </div>

        <ul className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
          {audiences.map((item) => (
            <li
              key={item}
              className="border border-border bg-card px-5 py-3 rounded-lg text-sm text-muted-foreground"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
