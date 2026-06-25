import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Photo gallery of Oikotan events – Joninės midsummer, Užgavėnės, Independence Day Gala, and community celebrations.",
};

const GALLERY_ITEMS = [
  { id: "g1",  label: "Joninės 2024 – Bonfire Night",          emoji: "🔥", bg: "from-amber-400 to-orange-500" },
  { id: "g2",  label: "Independence Day Gala 2024",           emoji: "🇱🇹", bg: "from-rose-400 to-red-500" },
  { id: "g3",  label: "Užgavėnės 2024 – Folk dances",          emoji: "🌏", bg: "from-violet-400 to-purple-500" },
  { id: "g4",  label: "Community Picnic 2023",                 emoji: "🌳", bg: "from-green-400 to-teal-500" },
  { id: "g5",  label: "Joninės 2023 – Wreath weaving",         emoji: "🌿", bg: "from-brand-400 to-brand-600" },
  { id: "g6",  label: "Folklore Performance 2023",             emoji: "💃", bg: "from-pink-400 to-rose-500" },
  { id: "g7",  label: "Kūčios – Christmas Eve 2023",              emoji: "✨", bg: "from-indigo-400 to-blue-500" },
  { id: "g8",  label: "Summer BBQ 2023",                       emoji: "🔥", bg: "from-orange-400 to-amber-500" },
  { id: "g9",  label: "Užgavėnės 2022",                           emoji: "🥞", bg: "from-fuchsia-400 to-pink-500" },
];

export default function GalleryPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      {/* Page header */}
      <header className="mb-12">
        <p className="text-brand-500 text-sm font-semibold uppercase tracking-widest">Memories</p>
        <h1 className="font-display text-4xl sm:text-5xl font-bold text-neutral-900 mt-1">
          Gallery
        </h1>
        <p className="mt-4 max-w-xl text-neutral-600">
          A glimpse into the vibrant celebrations and cherished moments from our events over the years.
        </p>
      </header>

      {/* Grid */}
      <section aria-label="Photo gallery">
        <ul
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"
          role="list"
        >
          {GALLERY_ITEMS.map((item, index) => (
            <li key={item.id} className={index === 0 ? "col-span-2 row-span-2" : ""}>
              <figure
                className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${item.bg} aspect-square w-full flex items-center justify-center group cursor-pointer focus-within:ring-2 focus-within:ring-brand-500 focus-within:ring-offset-2`}
                aria-label={item.label}
              >
                <span className="text-5xl select-none group-hover:scale-110 transition-transform duration-300" aria-hidden="true">
                  {item.emoji}
                </span>
                <figcaption className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent px-4 py-4 text-white text-sm font-medium translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  {item.label}
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </section>

      <p className="mt-10 text-sm text-neutral-500 text-center">
        More photos on our{" "}
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-brand-600 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 rounded">
          Facebook page
        </a>
        {" "}and{" "}
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-brand-600 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 rounded">
          Instagram
        </a>.
      </p>
    </div>
  );
}
