import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { Components } from "react-markdown";

interface MarkdownContentProps {
  content: string;
}

const components: Components = {
  h1: ({ children }) => (
    <h2 className="text-2xl md:text-3xl font-bold mt-10 mb-4 text-foreground">
      {children}
    </h2>
  ),
  h2: ({ children }) => (
    <h2 className="text-2xl md:text-3xl font-bold mt-10 mb-4 text-foreground">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="text-xl md:text-2xl font-semibold mt-8 mb-3 text-foreground">
      {children}
    </h3>
  ),
  h4: ({ children }) => (
    <h4 className="text-lg md:text-xl font-semibold mt-6 mb-2 text-foreground">
      {children}
    </h4>
  ),
  p: ({ children }) => (
    <p className="text-base md:text-lg leading-relaxed mb-5 text-foreground/90">
      {children}
    </p>
  ),
  ul: ({ children }) => (
    <ul className="list-disc list-outside ml-6 mb-5 space-y-2 text-foreground/90">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="list-decimal list-outside ml-6 mb-5 space-y-2 text-foreground/90">
      {children}
    </ol>
  ),
  li: ({ children }) => (
    <li className="text-base md:text-lg leading-relaxed pl-1">{children}</li>
  ),
  blockquote: ({ children }) => (
    <blockquote className="border-l-4 border-primary/50 pl-5 py-1 my-6 italic text-muted-foreground bg-secondary/20 rounded-r-lg">
      {children}
    </blockquote>
  ),
  code: ({ className, children }) => {
    const isInline = !className;
    if (isInline) {
      return (
        <code className="font-mono text-sm bg-secondary/60 text-primary px-1.5 py-0.5 rounded">
          {children}
        </code>
      );
    }
    return (
      <code className="font-mono text-sm">{children}</code>
    );
  },
  pre: ({ children }) => (
    <pre className="font-mono text-sm bg-secondary/80 border border-border/50 rounded-lg p-4 mb-5 overflow-x-auto">
      {children}
    </pre>
  ),
  a: ({ href, children }) => (
    <a
      href={href}
      target={href?.startsWith("http") ? "_blank" : undefined}
      rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
      className="text-primary hover:text-primary/80 underline underline-offset-2 transition-colors"
    >
      {children}
    </a>
  ),
  strong: ({ children }) => (
    <strong className="font-semibold text-foreground">{children}</strong>
  ),
  em: ({ children }) => <em className="italic">{children}</em>,
  hr: () => <hr className="border-border/50 my-8" />,
  img: ({ src, alt }) => (
    <img
      src={src}
      alt={alt || ""}
      className="rounded-lg my-6 max-w-full h-auto"
      loading="lazy"
    />
  ),
  table: ({ children }) => (
    <div className="overflow-x-auto mb-5">
      <table className="w-full border-collapse border border-border/50 text-sm">
        {children}
      </table>
    </div>
  ),
  th: ({ children }) => (
    <th className="border border-border/50 bg-secondary/40 px-4 py-2 text-left font-semibold">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="border border-border/50 px-4 py-2">{children}</td>
  ),
};

export function MarkdownContent({ content }: MarkdownContentProps) {
  return (
    <article className="max-w-3xl">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {content}
      </ReactMarkdown>
    </article>
  );
}
