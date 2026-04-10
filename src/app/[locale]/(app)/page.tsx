import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getFeaturedAbstract, getDashboardAbstracts, getAllAbstracts } from "@/lib/data";
import { SOURCE_VARIANT } from "@/types";
import { SectionHeader, Badge } from "@/components/ui";
import { AbstractListItem, StatsCard } from "@/components/content";
import { getTranslations } from "next-intl/server";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();
  return {
    title: `${t("app.name")} — ${t("app.tagline")}`,
    description: `${t("app.tagline")} — ${t("app.institution")}`,
  };
}

export default async function DashboardPage() {
  const t = await getTranslations();
  const [featured, secondary, allAbstracts] = await Promise.all([
    getFeaturedAbstract(),
    getDashboardAbstracts(),
    getAllAbstracts(),
  ]);
  const archiveItems = allAbstracts.filter((a) => !a.featured).slice(0, 4);
  const [card2, card3, card4] = secondary;

  if (!featured) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
        <span className="material-symbols-outlined text-5xl text-outline mb-4">library_books</span>
        <h2 className="font-headline text-2xl font-bold text-on-surface mb-2">{t("empty.noPublications")}</h2>
        <p className="text-on-surface-variant">{t("empty.noPublicationsDesc")}</p>
      </div>
    );
  }

  return (
    <>
      {/* Hero Header */}
      <header className="mb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="font-label text-sm uppercase tracking-widest text-secondary font-bold mb-2 block">
              {t("hero.subtitle")}
            </span>
            <h1 className="font-headline text-4xl md:text-5xl font-extrabold text-on-surface tracking-tight max-w-2xl leading-tight">
              {t("hero.title")}
            </h1>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge variant="outlined-primary">{t("hero.badges.ajpmr")}</Badge>
            <Badge variant="outlined-secondary">{t("hero.badges.minerva")}</Badge>
          </div>
        </div>
      </header>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">

        {/* Featured Card — col-span-8 */}
        <article className="md:col-span-8 bg-surface-container-lowest border border-outline-variant/20 rounded-xl editorial-shadow overflow-hidden group cursor-pointer hover:border-primary/30 transition-all duration-300">
          <Link href={featured.href} className="flex flex-col md:flex-row h-full">
            <div className="md:w-2/5 relative min-h-[240px]">
              <Image
                src={`https://placehold.co/800x480/e8f5ff/006591?text=${encodeURIComponent(featured.journal)}`}
                alt={featured.imageAlt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 40vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent" />
            </div>
            <div className="p-8 md:w-3/5 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <Badge variant="filled-primary" size="sm">{t("dashboard.featured")} {featured.journal}</Badge>
                  <span className="text-on-surface-variant text-xs font-medium">{featured.publishedAtLabel}</span>
                </div>
                <h2 className="font-headline text-2xl font-bold text-on-surface mb-4 leading-snug group-hover:text-primary transition-colors">
                  {featured.title}
                </h2>
                <p className="text-on-surface-variant leading-relaxed text-sm line-clamp-3 mb-6">
                  {featured.excerpt}
                </p>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-outline-variant/20">
                <span className="font-bold text-sm text-primary">{featured.journal}</span>
                <span className="text-primary font-bold text-sm flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  {t("actions.readSummary")}
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </span>
              </div>
            </div>
          </Link>
        </article>

        {/* Side Card — col-span-4 */}
        {card2 && (
          <article className="md:col-span-4 bg-surface-container-lowest border border-outline-variant/20 rounded-xl editorial-shadow p-6 flex flex-col justify-between hover:border-secondary transition-all cursor-pointer">
            <Link href={card2.href} className="flex flex-col h-full justify-between">
              <div>
                <div className="mb-4 text-xs font-bold text-secondary tracking-wider flex justify-between items-center">
                  <span>{card2.journal}</span>
                  <span>{new Date(card2.publishedAt).getFullYear()}</span>
                </div>
                <h3 className="font-headline text-lg font-bold text-on-surface mb-3">{card2.title}</h3>
                <p className="text-on-surface-variant text-sm leading-relaxed line-clamp-4">{card2.excerpt}</p>
              </div>
              <div className="mt-6 flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center">
                  <span className="material-symbols-outlined text-secondary text-sm">bookmark</span>
                </span>
                <span className="text-xs font-bold text-secondary">{t("dashboard.saveToLibrary")}</span>
              </div>
            </Link>
          </article>
        )}

        {/* Accent Card 1 — col-span-4 */}
        {card3 && (
          <article className="md:col-span-4 bg-surface-container-low rounded-xl p-6 flex flex-col border-l-4 border-primary hover:shadow-md transition-all cursor-pointer">
            <Link href={card3.href} className="flex flex-col h-full">
              <span className="text-[10px] font-extrabold uppercase text-primary mb-2">{card3.journal}</span>
              <h3 className="font-headline text-lg font-bold text-on-surface mb-3">{card3.title}</h3>
              <p className="text-on-surface-variant text-sm leading-relaxed line-clamp-3 mb-4">{card3.excerpt}</p>
              <div className="mt-auto pt-4 flex justify-between items-center">
                <span className="text-xs font-bold text-primary">{card3.journal}</span>
                <span className="text-[10px] text-on-surface-variant">{card3.publishedAtShort}</span>
              </div>
            </Link>
          </article>
        )}

        {/* Accent Card 2 — col-span-4 */}
        {card4 && (
          <article className="md:col-span-4 bg-surface-container-lowest border border-outline-variant/20 rounded-xl editorial-shadow p-6 group cursor-pointer">
            <Link href={card4.href} className="flex flex-col h-full">
              <div className="flex items-center gap-2 mb-4">
                <span className="material-symbols-outlined text-secondary filled">verified</span>
                <span className="text-xs font-bold text-secondary">{card4.journal}</span>
              </div>
              <h3 className="font-headline text-lg font-bold text-on-surface mb-3 leading-tight">{card4.title}</h3>
              <p className="text-on-surface-variant text-sm leading-relaxed line-clamp-3">{card4.excerpt}</p>
              <div className="mt-6 flex justify-between items-center text-xs text-outline">
                <span>{card4.journal}</span>
                <span className="material-symbols-outlined text-sm text-secondary">open_in_new</span>
              </div>
            </Link>
          </article>
        )}

        {/* Stats Card — col-span-4 */}
        <StatsCard
          icon="analytics"
          title={t("dashboard.impactTitle")}
          description={t("dashboard.impactDescription")}
          stats={[
            { value: "4.8", label: "AJPM&R" },
            { value: "3.9", label: "MINERVA" },
          ]}
        />
      </div>

      {/* Abstracts archive list */}
      <section className="mt-20">
        <SectionHeader
          title={t("dashboard.archiveTitle")}
          action={{ label: t("actions.viewAll"), href: "/buscar", icon: "history" }}
        />
        <div className="space-y-4">
          {archiveItems.map((a) => (
            <AbstractListItem
              key={a.id}
              source={a.journal}
              sourceVariant={SOURCE_VARIANT[a.journal]}
              date={a.publishedAtShort}
              title={a.title}
              tags={a.tags}
              href={a.href}
            />
          ))}
        </div>
      </section>
    </>
  );
}
