// Static content data to replace Prismic CMS
export const siteSettings = {
  site_title: "Gust - Creative Agency",
  meta_description: "We create stop-scrollers and memorable campaigns",
  favicon: "/assets/favicon.ico"
}

export const navigation = {
  links: [
    { label: "L'AGENCE", href: "/agence" },
    { label: "NOS OFFRES", href: "/nos-offres" },
    { label: "WORK", href: "/work" },
    { label: "CONTACT", href: "/contact" }
  ]
}

export const homePageContent = {
  hero: {
    title: "We create stop-scrollers.",
    titleBold: true,
    primaryText: "NOUS CRÉONS DES",
    secondaryText: "STOP-SCROLLERS",
    description: "L'attention, l'essentiel pour les marques. Avec la fragmentation des audiences et la saturation publicitaire, capter l'attention est désormais le critère clé de réussite d'une campagne.",
    mission: "Notre mission : vous permettre de capter vos audiences",
    cta: {
      text: "Notre travail →",
      link: "/work",
      isBold: true
    },
    media: {
      url: "/assets/media/gust_showreel_landing.webm",
      type: "video"
    }
  },
  mediaText: {
    title: "We create stop-scrollers.",
    titleBold: true,
    description: [
      "L'attention, l'essentiel pour les marques. Avec la fragmentation des audiences et la saturation publicitaire, capter l'attention est désormais le critère clé de réussite d'une campagne.",
      "Notre mission : vous permettre de capter vos audiences afin de délivrer votre message de marque."
    ],
    cta: {
      text: "Notre travail",
      link: "/work"
    },
    media: [
      {
        type: "image",
        url: "/assets/media/instagram_ui.png",
        alt: "Instagram UI"
      }
    ]
  }
}


export const workData = {
  projects: [
    {
      uid: "les-secrets-de-loly",
      title: "Les secrets de Loly",
      client: "OPI",
      tags: ["Production", "Influence"],
      data: {
        secteurs: [
          { label: "Beauty" },
          { label: "Lifestyle" }
        ],
        cover: {
          url: "/assets/media/cases_studies/cover/LSL_cover 2.png",
          alt: "Les secrets de Loly cover",
          width: 800,
          height: 600
        },
        preview_video: {
          url: "/assets/media/cases_studies/Les%20secrets%20de%20loly.mp4"
        }
      }
    },
    {
      uid: "vestiaire-collective",
      title: "Vestiaire Collective",
      client: "VESTIAIRE COLLECTIVE", 
      tags: ["Influence"],
      data: {
        secteurs: [
          { label: "Fashion" },
          { label: "E-commerce" }
        ],
        cover: {
          url: "/assets/media/cases_studies/cover/VestiaireCo_cover 2.png",
          alt: "Vestiaire Collective cover",
          width: 800,
          height: 600
        },
        preview_video: {
          url: "/assets/media/cases_studies/Vestiaire_Collective.mp4"
        }
      }
    },
    {
      uid: "showroom-prive",
      title: "Showroom Privé",
      client: "SHOWROOM PRIVÉ",
      tags: ["Célébrité", "Production"],
      data: {
        secteurs: [
          { label: "Fashion" },
          { label: "Celebrity" }
        ],
        cover: {
          url: "/assets/media/cases_studies/cover/Faustine_cover 2.png",
          alt: "Showroom Privé cover",
          width: 800,
          height: 600
        },
        preview_video: {
          url: "/assets/media/cases_studies/ShowroomBy-Faustine.mp4"
        }
      }
    }
  ]
}

export const footerContent = {
  copyright: "© 2024 Gust Creative Agency",
  links: [
    { label: "Mentions légales", href: "/mentions-legales" },
    { label: "Contact", href: "/contact" }
  ]
}
