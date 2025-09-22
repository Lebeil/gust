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
    primaryText: "NOUS CRÉONS DES",
    secondaryText: "STOP-SCROLLERS",
    description: "**We create stop-scrollers.**\n\nL'attention, l'essentiel pour les marques. Avec la fragmentation des audiences et la saturation publicitaire, capter l'attention est désormais le critère clé de réussite d'une campagne.\n\nNotre mission : vous permettre de capter vos audiences afin de délivrer votre message de marque.\n\n**Notre travail →**",
    mission: "",
    media: {
      url: "/assets/media/gust_showreel_landing.webm",
      type: "video"
    }
  },
  mediaText: {
    title: "We create stop-scrollers.",
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
      uid: "project-1",
      title: "Project 1",
      description: "Description of project 1",
      image: "/assets/media/LIVRES.png",
      category: "Brand"
    },
    {
      uid: "project-2", 
      title: "Project 2",
      description: "Description of project 2", 
      image: "/assets/media/LIVRES_2.png",
      category: "Digital"
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
