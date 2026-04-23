const VALUE_POINTS = [
  {
    title: "Curated essentials",
    description:
      "We keep the assortment focused, so each collection feels easier to browse and more relevant to everyday outfits.",
  },
  {
    title: "Style that layers well",
    description:
      "The products are chosen to mix with one another, making it simple to build looks around clothing, watches, and accessories.",
  },
  {
    title: "Fast, practical shopping",
    description:
      "Clear categories, direct product paths, and straightforward merchandising help shoppers move from discovery to checkout quickly.",
  },
];

const SHOPPING_GUIDES = [
  {
    title: "Start with the homepage",
    description:
      "Use the hero section and category previews to orient yourself, then jump into the product grid when you know the style lane you want to explore.",
  },
  {
    title: "Compare by collection",
    description:
      "New arrivals, men, women, watches, and accessories each have their own path, which makes it easier to narrow your search without losing context.",
  },
  {
    title: "Build outfits with intent",
    description:
      "Choose pieces that work across the same color palette or silhouette family so your cart feels coordinated instead of random.",
  },
  {
    title: "Return for updates",
    description:
      "Fresh product drops and seasonal edits give repeat visitors a reason to check back often for new outfit combinations and statement pieces.",
  },
];

const FAQS = [
  {
    question: "What makes Velora different?",
    answer:
      "Velora focuses on a smaller, more intentional fashion edit. That means fewer distractions, cleaner category paths, and products that are easier to coordinate into one wardrobe.",
  },
  {
    question: "What kinds of products can I shop here?",
    answer:
      "The catalog centers on clothing, watches, and accessories for men and women, with a separate flow for new arrivals and category-specific browsing.",
  },
  {
    question: "Is Velora meant for everyday wear?",
    answer:
      "Yes. The store is built around wearable pieces that can move through work, weekends, and travel without requiring a completely different style every time you dress.",
  },
];

export default function SeoContent() {
  return (
    <section className="border-b-2 border-amber-950 bg-orange-50 px-4 py-12 sm:px-6 lg:px-16 lg:py-8">
      <div className="w-100 space-y-12">
        <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
          <div className="space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-amber-800">
              Why Velora
            </p>
            <h2 className="text-3xl font-bold text-amber-950 sm:text-4xl">
              Designed for a wardrobe that works every day
            </h2>
            <p className="text-base leading-7 text-amber-900">
              Velora is built for people who want style without clutter. The
              homepage guides you toward the collections most shoppers care
              about first: clothing that feels current, watches that add a
              little edge, and accessories that pull the whole look together.
            </p>
            <p className="text-base leading-7 text-amber-900">
              Instead of overwhelming you with a giant wall of products, the
              store emphasizes a cleaner path through the catalog. That makes it
              easier to compare options, spot new arrivals, and find pieces that
              can stay in rotation rather than sit in the back of the closet.
            </p>
            <p className="text-base leading-7 text-amber-900">
              The experience is intentionally direct. Product discovery starts
              with visual category cards, continues through curated watch and
              deal sections, and ends with support-focused details that help
              customers feel confident before they click buy.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
            {VALUE_POINTS.map((point) => (
              <article
                key={point.title}
                className="rounded-2xl border-2 border-amber-950 bg-orange-100 p-5 shadow-sm"
              >
                <h3 className="text-lg font-semibold text-amber-950">
                  {point.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-amber-900">
                  {point.description}
                </p>
              </article>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border-2 border-amber-950 bg-orange-100 p-6 shadow-sm sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-amber-800">
            Shopping guide
          </p>
          <h2 className="mt-2 text-2xl font-bold text-amber-950 sm:text-3xl">
            How shoppers can move through Velora
          </h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {SHOPPING_GUIDES.map((item) => (
              <article
                key={item.title}
                className="rounded-2xl border border-amber-950/20 bg-orange-50 p-5"
              >
                <h3 className="text-lg font-semibold text-amber-950">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-amber-900">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border-2 border-amber-950 bg-orange-100 p-6 shadow-sm sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-amber-800">
            Frequently asked questions
          </p>
          <h2 className="mt-2 text-2xl font-bold text-amber-950 sm:text-3xl">
            Frequently Asked Questions About Shopping Velora
          </h2>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {FAQS.map((faq) => (
              <article key={faq.question} className="space-y-2">
                <h3 className="text-lg font-semibold text-amber-950">
                  {faq.question}
                </h3>
                <p className="text-sm leading-6 text-amber-900">{faq.answer}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
