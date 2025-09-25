"use client";
import { useState, useEffect, useRef } from "react";

// Dimensions fixes demandées pour chaque card
const CARD_WIDTH = 280; // px (aligné au design fourni)
const CARD_HEIGHT = 440; // px
const GAP_PX = 24; // écart horizontal exact entre les cards

/**
 * Galerie d'images à défilement automatique horizontal
 * Design moderne avec contrôle au survol
 */
export default function AutoScrollGallery({ 
  images = [],
  autoScrollSpeed = 0.02, // conservé pour compatibilité
  visibleImages = 4,
  enableAutoScroll = false, // désactivé: carrousel non scrollable automatiquement
  scrollable = false, // désactivé: pas de défilement à la molette/trackpad
  onSelect = () => {},
  onApiReady
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [progressPercent, setProgressPercent] = useState(0);
  const lastProgressRef = useRef(0);
  const galleryRef = useRef(null);
  const scrollPositionRef = useRef(0);
  const animationFrameRef = useRef(null);
  const lastTimeRef = useRef(0);

  // Source des items: utilise les images fournies, sinon un set par défaut pour garantir un flux continu
  const defaultItems = [
    { title: "Showroom Privé", client: "SHOWROOM PRIVÉ", video: "/assets/media/cases_studies/ShowroomBy-Faustine.mp4", tags: ["Célébrité", "Production"], textColor: "text-white" },
    { title: "Service Civique Solidarité Seniors", client: "WĀJ", video: "/assets/media/cases_studies/Service civique solidarité.mp4", tags: ["Influence", "Social média"], textColor: "text-white" },
    { title: "Parions Sport", client: "PARIONS SPORT", video: "/assets/media/cases_studies/ParionsSport-Avion.mp4", tags: ["Production", "Social média"], textColor: "text-white" },
    { title: "Quick", client: "Quick", video: "/assets/media/cases_studies/Quick.mp4", tags: ["Influence", "Social média"], textColor: "text-white" },
    { title: "Vestiaire Collective", client: "Vestiaire Collective", video: "/assets/media/cases_studies/Vestiaire_Collective.mp4", tags: ["Production", "Social média"], textColor: "text-white" },
  ];
  const baseItems = (Array.isArray(images) && images.length > 0) ? images : defaultItems;
  const totalImages = baseItems.length;
  const MULTI_SET_COUNT = 3; // centre + avant + après pour couvrir l'écran en continu
  const duplicate = true; // valeur par défaut si non passée (compat)
  // Si la prop n'est pas fournie, on lit depuis arguments en runtime
  // eslint-disable-next-line prefer-rest-params
  const props = arguments?.[0] || {};
  const shouldDuplicate = typeof props.duplicate === 'boolean' ? props.duplicate : duplicate;
  const renderItems = shouldDuplicate
    ? Array.from({ length: MULTI_SET_COUNT }).flatMap(() => baseItems)
    : baseItems;

  // Largeur uniforme demandée pour toutes les cards
  const sizePattern = ['uniform'];
  const widthPercentBySize = { small: 24, medium: 24, large: 24 }; // conservé pour compatibilité mais non utilisé pour largeur
  const oneSetWidth = totalImages * CARD_WIDTH + Math.max(totalImages - 1, 0) * GAP_PX; // en px
  const totalTrackWidthPx = renderItems.length * CARD_WIDTH + Math.max(renderItems.length - 1, 0) * GAP_PX;
  const baseOffsetPx = shouldDuplicate ? oneSetWidth * Math.floor(MULTI_SET_COUNT / 2) : 0;

  // API externe (prev/next)
  const getCenterOffsetPx = () => {
    const containerWidth = galleryRef.current?.clientWidth || 0;
    return Math.max(0, (containerWidth - oneSetWidth) / 2);
  };

  const updateTransformAndProgress = () => {
    const containerWidth = galleryRef.current?.clientWidth || 0;
    const centerOffset = Math.max(0, (containerWidth - oneSetWidth) / 2);
    if (!shouldDuplicate) {
      const maxScroll = Math.max(0, oneSetWidth - containerWidth);
      scrollPositionRef.current = Math.max(0, Math.min(scrollPositionRef.current, maxScroll));
    }
    const relativePos = shouldDuplicate
      ? ((scrollPositionRef.current % oneSetWidth) + oneSetWidth) % oneSetWidth + baseOffsetPx
      : scrollPositionRef.current;
    const translate = relativePos - centerOffset;
    const track = galleryRef.current?.querySelector('.gallery-track');
    if (track) track.style.transform = `translateX(-${translate}px)`;
    const currentProgress = (scrollPositionRef.current % oneSetWidth) / oneSetWidth * 100;
    if (Math.abs(currentProgress - lastProgressRef.current) > 0.1) {
      lastProgressRef.current = currentProgress;
      setProgressPercent(currentProgress);
    }
  };

  useEffect(() => {
    if (typeof onApiReady === 'function') {
      const stepPx = CARD_WIDTH + GAP_PX;
      const api = {
        next: () => {
          if (shouldDuplicate) {
            scrollPositionRef.current += stepPx;
          } else {
            const containerWidth = galleryRef.current?.clientWidth || 0;
            const maxScroll = Math.max(0, oneSetWidth - containerWidth);
            scrollPositionRef.current = Math.min(maxScroll, scrollPositionRef.current + stepPx);
          }
          updateTransformAndProgress();
        },
        prev: () => {
          if (shouldDuplicate) {
            scrollPositionRef.current -= stepPx;
          } else {
            scrollPositionRef.current = Math.max(0, scrollPositionRef.current - stepPx);
          }
          updateTransformAndProgress();
        },
      };
      try { onApiReady(api); } catch (_) {}
    }
    // noop cleanup
  }, [onApiReady]);

  // Animation avec requestAnimationFrame pour défilement ultra-smooth
  useEffect(() => {
    if (!enableAutoScroll) return; // pas d'auto-scroll
    const animate = (currentTime) => {
      if (lastTimeRef.current === 0) {
        lastTimeRef.current = currentTime;
      }
      
      const deltaTime = currentTime - lastTimeRef.current;
      lastTimeRef.current = currentTime;

      if (totalImages > 0) {
        // Défilement basé sur le temps réel (60 FPS smooth) - en pixels
        const autoScrollSpeedPx = 0.8; // vitesse légèrement augmentée
        scrollPositionRef.current += autoScrollSpeedPx * (deltaTime / 16);
        
        // Reset seamless quand on a fait un tour complet
        if (scrollPositionRef.current >= oneSetWidth) {
          scrollPositionRef.current = scrollPositionRef.current - oneSetWidth;
        }

        // Mettre à jour le transform directement
        updateTransformAndProgress();

        // Mettre à jour la progression pour la barre
        const currentProgress = (scrollPositionRef.current % oneSetWidth) / oneSetWidth * 100;
        if (Math.abs(currentProgress - lastProgressRef.current) > 0.1) {
          lastProgressRef.current = currentProgress;
          setProgressPercent(currentProgress);
        }
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isHovered, totalImages, visibleImages, autoScrollSpeed, enableAutoScroll]);
  
  // Positionner le track au centre dès le premier rendu pour avoir des cards des deux côtés
  useEffect(() => {
    updateTransformAndProgress();
  }, [baseOffsetPx]);

  // Recentrer sur resize du conteneur
  useEffect(() => {
    const el = galleryRef.current;
    if (!el || typeof ResizeObserver === 'undefined') return;
    const ro = new ResizeObserver(() => updateTransformAndProgress());
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Gestion des événements wheel et trackpad (horizontal + vertical)
  useEffect(() => {
    if (!scrollable) return; // ne capte pas la molette si non scrollable
    const galleryElement = galleryRef.current;
    if (!galleryElement) return;

    const handleWheel = (e) => {
      if (!isHovered) return;
      
      e.preventDefault();
      e.stopPropagation();
      
      // Détecter le mouvement principal (horizontal ou vertical)
      const deltaX = Math.abs(e.deltaX);
      const deltaY = Math.abs(e.deltaY);
      
      let delta = 0;
      let intensity = 1;
      
      // Si mouvement horizontal plus important (swipe trackpad)
      if (deltaX > deltaY) {
        delta = Math.sign(e.deltaX) * 14; // px par tick pour trackpad
        intensity = Math.min(deltaX / 120, 1.0);
      } 
      // Sinon utiliser le mouvement vertical (molette classique)
      else {
        delta = Math.sign(e.deltaY) * 10; // px par tick pour molette
        intensity = Math.min(deltaY / 160, 0.8);
      }
      
      // Mise à jour directe de la position pour éviter les saccades
      const movement = delta * intensity;
      scrollPositionRef.current += movement; // en px
      const oneSetWidth = totalImages * CARD_WIDTH + Math.max(totalImages - 1, 0) * GAP_PX;

      // Mettre à jour le transform immédiatement
      updateTransformAndProgress();

      // Mettre à jour la progression pour la barre
      const currentProgress = (scrollPositionRef.current % oneSetWidth) / oneSetWidth * 100;
      setProgressPercent(currentProgress);
    };

    galleryElement.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      galleryElement.removeEventListener('wheel', handleWheel);
    };
  }, [isHovered, totalImages, visibleImages, scrollable]);

  return (
    <div className="w-full">
      <div 
        ref={galleryRef}
        className="relative overflow-hidden group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          willChange: 'transform',
          backfaceVisibility: 'hidden',
          perspective: '1000px',
          WebkitMaskImage: 'linear-gradient(to right, rgba(0,0,0,0.12) 0px, rgba(0,0,0,1) 48px, rgba(0,0,0,1) calc(100% - 48px), rgba(0,0,0,0.12) 100%)',
          maskImage: 'linear-gradient(to right, rgba(0,0,0,0.12) 0px, rgba(0,0,0,1) 48px, rgba(0,0,0,1) calc(100% - 48px), rgba(0,0,0,0.12) 100%)',
          WebkitMaskRepeat: 'no-repeat',
          maskRepeat: 'no-repeat',
          WebkitMaskSize: '100% 100%',
          maskSize: '100% 100%'
        }}
      >
        {/* Track de la galerie avec images dupliquées pour effet infini */}
        <div 
          className="gallery-track flex items-end"
          style={{
            width: `${totalTrackWidthPx}px`,
            transform: 'translateX(0px)',
            gap: `${GAP_PX}px`,
            willChange: 'transform',
            backfaceVisibility: 'hidden',
            transformStyle: 'preserve-3d'
          }}
        >
          {renderItems.map((image, index) => {
            const size = sizePattern[0];
            return (
              <div
                key={`${index}-${image.url || index}`}
                className="flex-shrink-0"
                style={{ width: `${CARD_WIDTH}px` }}
              >
                <ImageCard image={image} index={index} size={size} onSelect={onSelect} />
              </div>
            );
          })}
        </div>

        {/* Indicateur de statut supprimé selon demande */}

        {/* Fondu géré par mask-image sur le conteneur (aucun overlay, pas de liseré) */}
      </div>
    </div>
  );
}

/**
 * Card de case study avec format vertical comme dans l'image
 */
function ImageCard({ image, index, size, onSelect }) {
  const [isLoaded, setIsLoaded] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  // Hauteur/largeur fixes (pas de classes Tailwind dynamiques pour éviter les problèmes de build)

  // Données de case studies basées sur l'image de référence
  const caseStudy = image && (image.title || image.video)
    ? {
        title: image.title || '',
        client: image.client || '',
        textColor: image.textColor || 'text-white',
        tags: Array.isArray(image.tags) ? image.tags : [],
        video: image.video,
        poster: image.poster
      }
    : { title: '', client: '', textColor: 'text-white', tags: [], video: undefined };

  const videoRef = useRef(null);

  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;
    try {
      if (isHovered) {
        vid.play().catch(() => {});
      } else {
        vid.pause();
        vid.currentTime = 0;
      }
    } catch (_) {}
  }, [isHovered]);

  return (
    <div 
      className={`relative group cursor-pointer overflow-hidden rounded-3xl transform transition-all duration-300 hover:scale-[1.01]`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onSelect?.(caseStudy, index)}
      style={{ width: `${CARD_WIDTH}px`, height: `${CARD_HEIGHT}px` }}
    >
      {/* Vidéo affichée (lecture au survol) */}
      {caseStudy.video && (
        <video
          ref={videoRef}
          src={caseStudy.video}
          poster={caseStudy.poster}
          className="absolute inset-0 w-full h-full object-cover"
          muted
          loop
          playsInline
          preload="metadata"
        />
      )}

      {/* Image de couverture au repos */}
      {caseStudy.poster && (
        <img
          src={caseStudy.poster}
          alt={caseStudy.title || caseStudy.client || 'cover'}
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-0 pointer-events-none"
          loading="lazy"
        />
      )}

      {/* Overlay gradient bas pour lisibilité des badges */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />

      {/* Badges en bas (sans titre ni entête) */}
      <div className="relative z-[1] h-full flex items-end p-5">
        <div className="flex flex-wrap gap-1.5">
          {caseStudy.tags.map((tag, tagIndex) => (
            <span
              key={tagIndex}
              className={`text-[0.7rem] md:text-sm px-3 py-0.5 rounded-lg ${
                caseStudy.textColor === 'text-white'
                  ? 'bg-white/20 text-white backdrop-brightness-50'
                  : 'bg-black/10 text-black'
              }`}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Léger voile au survol */}
      <div className={`absolute inset-0 bg-black/10 transition-opacity duration-300 ${
        isHovered ? 'opacity-100' : 'opacity-0'
      }`} />
    </div>
  );
}
