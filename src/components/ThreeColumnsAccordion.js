"use client"
import { useState } from 'react';

// Component that displays the 3-columns section with accordion hover effect
export default function ThreeColumnsAccordion({ progress = 0 }) {
  const [hoveredColumn, setHoveredColumn] = useState(null);
  
  // Force logos to be hidden - they should not appear after iPhone page
  const logoOpacity = 0;

  const columns = [
    {
      id: 'think',
      title: 'We think.',
      verticalTitle: 'We think.',
      items: ['Influence', 'Social Media', 'UGC'],
      description: 'Accompagnement expert avec une stratégie reposant sur des objectifs tangibles.'
    },
    {
      id: 'connect',
      title: 'We connect.',
      verticalTitle: 'We connect.',
      items: ['Influence', 'Celebrity', 'UGC'],
      description: 'Trouver le carrefour d\'audience le plus propice pour votre campagne.'
    },
    {
      id: 'produce',
      title: 'We produce.',
      verticalTitle: 'We produce.',
      items: ['Production', 'Influence', 'UGC'],
      description: 'Créer l\'asset le plus efficace pour diffuser votre message tout en stimulant la mémorisation.'
    }
  ];

  return (
    <section 
      className="relative w-full h-full overflow-hidden" 
      aria-label="We think We connect We produce"
    >
      {/* Grid with 3 columns */}
      <div className="absolute inset-0 flex h-full">
        {columns.map((column, index) => (
          <div
            key={column.id}
            className={`relative h-full transition-all duration-500 ease-in-out cursor-pointer ${
              hoveredColumn === column.id 
                ? 'flex-grow-[2]' 
                : hoveredColumn 
                  ? 'flex-grow-[0.5]' 
                  : 'flex-grow'
            }`}
            style={{ 
              flex: hoveredColumn === column.id ? '2' : hoveredColumn ? '0.5' : '1',
              transition: 'flex 0.5s ease-in-out'
            }}
            onMouseEnter={() => setHoveredColumn(column.id)}
            onMouseLeave={() => setHoveredColumn(null)}
          >
            {/* Border separator */}
            {index > 0 && (
              <div className="absolute left-0 top-0 bottom-0 w-px bg-white/20"></div>
            )}

            {/* Content container */}
            <div className="relative h-full flex items-center justify-center p-8">
              {/* Vertical title (shown when not hovered) */}
              <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
                hoveredColumn === column.id ? 'opacity-0' : 'opacity-100'
              }`}>
                <div className={`transform ${
                  index === 0 ? '-rotate-90' : index === 2 ? '-rotate-90' : '-rotate-90'
                } whitespace-nowrap`}>
                  <h2 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold tracking-wider">
                  {column.verticalTitle}
                </h2>
                </div>
              </div>

              {/* Expanded content (shown when hovered) */}
              <div className={`relative z-10 text-white transition-all duration-500 ${
                hoveredColumn === column.id 
                  ? 'opacity-100 transform translate-y-0' 
                  : 'opacity-0 transform translate-y-10 pointer-events-none'
              }`}>
                <div className="max-w-2xl mx-auto">
                  <h2 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-10">
                    {column.title}
                  </h2>
                  
                  <div className="space-y-5 mb-12">
                    {column.items.map((item, i) => (
                      <div key={i} className="flex items-center">
                        <span className="mr-4 text-2xl md:text-3xl">→</span>
                        <span className="text-2xl md:text-3xl font-bold">{item}</span>
                      </div>
                    ))}
                  </div>
                  
                  <p className="text-xl md:text-2xl leading-relaxed opacity-90">
                    {column.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom logos band - completely hidden after iPhone page */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-20 flex items-center justify-start px-8 overflow-hidden z-10"
        style={{
          opacity: logoOpacity,
          display: logoOpacity === 0 ? 'none' : 'flex',
          transform: `translateY(${logoOpacity < 0.1 ? '10px' : '0px'})`,
          transition: 'opacity 0.3s ease-out, transform 0.3s ease-out'
        }}
      >
        <div className="flex items-center gap-8 md:gap-12">
          {[
            "/images/showroom privé.svg",
            "/images/Nestlé.svg", 
            "/images/orange logo.svg",
            "/images/parions sport.svg",
            "/images/coca cola.svg",
            "/images/verbaudet.svg",
            "/images/vestiaire collective.svg",
            "/images/cyberghost vpn.svg"
          ].map((logo, i) => (
            <img
              key={i}
              src={logo}
              alt="Client logo"
              className="h-10 md:h-12 object-contain filter brightness-0 invert opacity-70 hover:opacity-100 transition-opacity duration-300"
            />
          ))}
        </div>
      </div>
    </section>
  )
}
