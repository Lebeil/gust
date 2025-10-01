"use client"

import HoverVideoCard from "@/components/HoverVideoCard"

const SERVICES = [
  { label: "Influence", tags: ["Influence"] },
  { label: "Célébrité", tags: ["Célébrité", "Celebrity", "Celebrité", "Celebrité"] },
  { label: "Production", tags: ["Production"] },
  { label: "Social", tags: ["Social", "Social média", "Social Media"] },
  { label: "UGC", tags: ["UGC", "Ugc"] },
]

function matchesService(itemTags = [], serviceTags = []) {
  const norm = (v) => (v || "").toLowerCase()
  const set = new Set(itemTags.map(norm))
  return serviceTags.some((t) => set.has(norm(t)))
}

export default function MobileServiceRows({ items = [] }) {
  return (
    <div className="block md:hidden">
      <div className="px-[var(--tw-4)] pb-[var(--tw-24)]">
        {SERVICES.map((service) => {
          const serviceItems = items.filter((it) => matchesService(it.tags || [], service.tags))
          if (serviceItems.length === 0) return null

          return (
            <div key={service.label} className="mb-8">
              <div className="text-white/90 font-extrabold text-lg mb-3 px-1">
                {service.label}
              </div>
              <div
                className="flex gap-4 overflow-x-auto snap-x snap-mandatory"
                style={{ WebkitOverflowScrolling: "touch", scrollbarWidth: "none" }}
              >
                {serviceItems.map((item, idx) => (
                  <div key={idx} className="snap-start flex-shrink-0">
                    <HoverVideoCard
                      href={item.href}
                      title={item.title}
                      posterSrc={item.posterSrc}
                      className="block overflow-hidden bg-white/5 rounded-[20px] w-[328px] h-[246px]"
                    />
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}


