import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getAbstractById, getAllAbstracts } from "@/lib/data";
import { SOURCE_VARIANT } from "@/types";
import { Badge, Button, MetadataItem, Chip } from "@/components/ui";

type Props = { params: { id: string } };

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = params;
  const article = await getAbstractById(id);
  if (!article) return { title: "No encontrado — Fisiatría UCN" };

  return {
    title: `${article.title} — Fisiatría UCN`,
    description: article.excerpt,
    openGraph: {
      type: "article",
      title: article.title,
      description: article.excerpt,
      publishedTime: article.publishedAt,
      authors: article.authors,
      tags: article.keywords,
    },
  };
}

export default async function AbstractDetailPage({ params }: Props) {
  const { id } = params;
  const article = await getAbstractById(id);
  if (!article) notFound();

  const color = SOURCE_VARIANT[article.journal];

  return (
    <>
      {/* Inline top bar with back arrow — overrides AppShell default */}
      <div className="fixed top-0 w-full z-50 bg-white/90 glass-nav shadow-sm border-b border-outline-variant">
        <div className="flex items-center justify-between px-6 py-4 max-w-screen-xl mx-auto">
          <a href="/" className="text-primary active:scale-95 transition-transform duration-200" aria-label="Volver">
            <span className="material-symbols-outlined">arrow_back</span>
          </a>
          <span className="font-headline font-bold tracking-tight text-lg truncate max-w-xs">
            Detalle
          </span>
          <a href="/buscar" className="p-2 rounded-full hover:bg-surface-container transition-colors" aria-label="Buscar">
            <span className="material-symbols-outlined text-on-surface-variant">search</span>
          </a>
        </div>
      </div>

      {/* JSON-LD structured data for Google Scholar / academic indexing */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ScholarlyArticle",
            name: article.title,
            author: article.authors.map((name) => ({ "@type": "Person", name })),
            datePublished: article.publishedAt,
            identifier: { "@type": "PropertyValue", propertyID: "doi", value: article.doi },
            isPartOf: { "@type": "Periodical", name: article.journal },
            keywords: article.keywords.join(", "),
            abstract: article.excerpt,
            url: `https://fisiatria.ucn.cl${article.href}`,
          }),
        }}
      />

      <main className="pt-24 pb-32 px-6 max-w-4xl mx-auto">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 mb-8 overflow-hidden whitespace-nowrap" aria-label="Migas de pan">
          <a href="/" className="text-on-surface-variant font-label text-sm hover:text-primary transition-colors">
            Inicio
          </a>
          <span className="material-symbols-outlined text-outline text-xs">chevron_right</span>
          <a href="/buscar" className="text-on-surface-variant font-label text-sm hover:text-primary transition-colors">
            Publicaciones
          </a>
          <span className="material-symbols-outlined text-outline text-xs">chevron_right</span>
          <span className="text-primary font-label text-sm font-semibold truncate">{article.journal}</span>
        </nav>

        <article className="space-y-10">
          {/* Article header */}
          <header className="space-y-6">
            <div className="flex flex-wrap gap-3">
              {article.peerReviewed && (
                <Badge variant="filled-primary" size="sm">REVISADO POR PARES</Badge>
              )}
              {article.openAccess && (
                <Badge variant="outlined-secondary" size="sm">Acceso Abierto</Badge>
              )}
            </div>

            <h1 className="font-headline font-extrabold text-4xl md:text-5xl text-on-surface leading-tight tracking-tight">
              {article.title}
            </h1>

            <div className="flex flex-col gap-4">
              <p className="font-body text-lg text-on-surface leading-relaxed font-medium">
                {article.authors.join(", ")}
              </p>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
                <MetadataItem icon="calendar_today">Publicado: {article.publishedAtLabel}</MetadataItem>
                <MetadataItem icon="link">DOI: {article.doi}</MetadataItem>
                <MetadataItem icon="auto_stories">{article.journal}</MetadataItem>
              </div>
            </div>
          </header>

          {/* Action Bar */}
          <div className="flex items-center justify-between py-4 border-y border-outline-variant">
            <div className="flex gap-4">
              <Button variant="primary" size="md" icon="bookmark" iconPosition="left">
                Guardar
              </Button>
              <Button variant="secondary" size="md" icon="share" iconPosition="left">
                Compartir
              </Button>
            </div>
            <Button variant="ghost" size="sm" icon="download" iconPosition="left">
              PDF
            </Button>
          </div>

          {/* Featured Image */}
          <div className="relative w-full aspect-video rounded-3xl overflow-hidden editorial-shadow bg-surface-container-low">
            <Image
              src={`https://placehold.co/1280x720/${color === "primary" ? "e8f5ff/F7931D" : "e1f0fb/006591"}?text=${encodeURIComponent(article.journal)}`}
              alt={article.imageAlt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 896px"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent" />
          </div>

          {/* Abstract body */}
          <section className="space-y-8 py-4">
            <div className="flex items-center gap-4">
              <h2 className="font-headline font-bold text-2xl text-on-surface">Resumen</h2>
              <div className="h-[2px] flex-grow bg-surface-container-high rounded-full" />
            </div>
            <div className="font-body text-lg text-on-surface leading-[1.8] space-y-6">
              {article.body.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          </section>

          {/* Keywords */}
          <section className="p-8 bg-surface-container-low rounded-3xl space-y-4 border border-outline-variant">
            <h3 className="font-label font-bold text-sm uppercase tracking-widest text-on-surface-variant">
              Palabras Clave
            </h3>
            <div className="flex flex-wrap gap-2">
              {article.keywords.map((kw) => (
                <Chip key={kw} variant="keyword">{kw}</Chip>
              ))}
            </div>
          </section>

          {/* Journal footer */}
          <footer className="pt-8 border-t border-outline-variant flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-secondary filled">verified</span>
              <span className="text-sm font-bold text-on-surface-variant">
                Fuente verificada — índice de impacto &gt;3.5
              </span>
            </div>
            <Button variant="ghost" size="sm" trailingArrow>
              Ver Diario Original
            </Button>
          </footer>
        </article>
      </main>
    </>
  );
}
