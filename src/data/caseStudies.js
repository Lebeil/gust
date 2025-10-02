// Liste centralisée des case studies utilisée par la page Work et la galerie
// Les chemins correspondent aux fichiers présents dans public/assets/media/cases_studies

const caseStudies = [
  {
    title: "Showroom Privé",
    href: "/assets/media/cases_studies/ShowroomBy-Faustine.mp4",
    posterSrc: "/assets/media/cases_studies/cover/Faustine_cover.png",
    tags: ["Production", "Ad-fluence", "Brand content", "Célébrité"],
    sectors: ["Mode"],
    client: "Showroom Privé",
    category: "Mode & Lifestyle",
    contextTitle: "Contexte",
    context:
      "Avec ses nouvelles éditions ShowroomBY, Showroom Privé souhaitait mettre en avant ses univers mode, beauté, maison & voyage avec une sélection exclusive par différentes personnalités publiques. Pour cette première édition, c'est Faustine Bollaert qui a plongé les communautés dans son dressing.",
    contentTitle: "Contenus",
    content: [
      "2 IGP (dont 1 jeu concours)",
      "3 IGS (de 3 écrans chacune)",
      "12 assets : photos, vidéos, déclinaisons Social Ads",
      "2 drops de 30 produits chacun"
    ],
    impactTitle: "Nos expertises",
    impact:
      "Casting, réseaux de célébrités, gestion opérationnelle, projet réalisé en 1 mois.",
    expertise_details: [
      "Casting",
      "Réseaux de célébrités",
      "Gestion opérationnelle",
      "Projet réalisé en 1 mois"
    ],
    metrics: {
      vues: "1M",
      interactions: "87K",
      traffic: "120%"
    }
  },
  {
    title: "Service Civique Solidarité Seniors",
    href: "/assets/media/cases_studies/Service_civique_solidarité.mp4",
    posterSrc: "/assets/media/cases_studies/cover/SC2S_cover.png",
    tags: ["Influence", "Ad-fluence"],
    sectors: ["Solidarité"],
    client: "SC2S",
    category: "Associatif",
    period: "2023",
    context: "À l'occasion de la Journée Européenne de la Solidarité Intergénérationnelle, le SC2S s'est associée à Elise Heb pour produire un contenu en marque blanche, mettant en avant les missions de l'association à travers le prisme de la relation qu'elle entretient avec Annick, son amie senior.",
    content: [
      "1 Créatrice de contenu engagée et en cohérence avec l'action menée",
      "1 Contenu en marque blanche type Reel Instagram avec amplification média pour recruter auprès du service civique."
    ],
    expertise_details: [
      "Casting influence sur mesure.",
      "Gestion opérationnelle (brief, négociation, contractualisation, monitoring campagne) Production et co-création avec le talent",
      "Conseil et set up média centré"
    ]
  },
  {
    title: "CyberGhost",
    href: "/assets/media/cases_studies/CyberGhost.mp4",
    posterSrc: "/assets/media/cases_studies/cover/CYBERGHOSt_cover.png",
    tags: ["Influence"],
    sectors: ["Technologie"],
    client: "CyberGhost",
    category: "VPN",
    period: "2023",
    contextTitle: "Contexte",
    context: "Depuis plus d'un an, nous accompagnons CyberGhost VPN dans sa conquête du marché des VPN, et ce, au travers d'intégrations Youtube de créateurs français et internationaux.",
    contentTitle: "Contenus",
    content: [
      "Près de 20 intégrations Youtube publiées (et de nombreuses autres en cours de développement)."
    ],
    impactTitle: "Expertises",
    impact: "Casting FR et Inter, gestion opérationnelle (brief, négociations, contractualisation, monitoring campagne, reporting)",
    expertise_details: [
      "Casting FR et Inter",
      "Gestion opérationnelle (brief, négociations, contractualisation, monitoring campagne, reporting)"
    ],
    metrics: {
      audience: "+ 2.7M",
      views: "+ 1.2M",
      emv: "+ 470K€",
      interactions: "+ 52K"
    }
  },
  {
    title: "We Are Etendart",
    href: "/assets/media/cases_studies/We_are_etendart.mp4",
    posterSrc: "/assets/media/cases_studies/cover/WE ARTE ETENDART_cover.png",
    tags: ["Influence", "Brand content", "Événementiel"],
    sectors: ["Sport"],
  },
  {
    title: "Quick - Un jeu concours viral avec GMK",
    href: "/assets/media/cases_studies/Quick.mp4",
    posterSrc: "/assets/media/cases_studies/cover/Quick_cover.png",
    tags: ["Influence", "Ad-fluence"],
    sectors: ["Food & Beverage"],
    client: "Quick",
    category: "Food & Beverage",
    period: "2024",
    intro: "À l’occasion de la rentrée, Quick a lancé une opération d’influence ambitieuse en s’associant à GMK, l’un des créateurs auto les plus suivis en France. Au programme : un double concours sur Instagram et TikTok autour du concept « Le goût de se retrouver », avec 20 PS5 mises en jeu.",
    contextTitle: "Le challenge ?",
    context: "Booster rapidement les communautés Instagram et TikTok de Quick, tout en générant un maximum d’engagement autour de la marque.",
    contentTitle: "Notre solution ?",
    content: [
      "Une stratégie social media sur-mesure, pensée pour la viralité",
      "Nous avons imaginé un dispositif d’influence simple et ultra efficace : un TikTok engageant, un carrousel Instagram, des stories teasing et des bonus exclusifs pour maximiser la portée.",
      "Du casting à la stratégie média, en passant par la gestion opérationnelle et le reporting, chaque levier a été activé pour atteindre et dépasser les objectifs fixés."
    ],
    impactTitle: "Le résultat ?",
    impact: "+130K abonnés générés sur TikTok et Instagram, bien au-delà de l’objectif initial. Une opération à fort impact qui prouve qu’un bon insight, un bon talent et une exécution fluide peuvent faire toute la différence.",
  },
  {
    title: "Orange",
    href: "/assets/media/cases_studies/Orange.mp4",
    posterSrc: "/assets/media/cases_studies/cover/Orange_cover.png",
    tags: ["Influence", "Brand content", "Événementiel"],
    sectors: ["Sport"],
    client: "Orange",
    category: "Partenariat JOP Paris 2024",
    period: "2024",
    intro: "Dans le cadre de son partenariat avec les Jeux Olympiques et Paralympiques de Paris 2024, Orange a organisé un événement itinérant dans 8 régions de France. L'objectif : sensibiliser les jeunes au cyberharcèlement à travers les valeurs du sport, de l'inclusion et de l'olympisme.",
    contextTitle: "Le challenge ?",
    context: "Créer une expérience terrain à fort impact humain et médiatique, capable de toucher les jeunes générations tout en renforçant l'engagement RSE de la marque.",
    content: [
      "Une tournée événementielle pensée pour les réseaux sociaux.",
      "Nous avons imaginé une série de rencontres sportives réunissant jeunes valides et en situation de handicap, dans un format à la fois pédagogique, interactif et inspirant.",
      "Notre équipe a géré la stratégie créative, le casting des ambassadeurs, l'organisation sur site, les animations et la création de contenus. Résultat : 76 stories, 8 Reels, 1 TikTok, tous produits et diffusés en temps réel pour amplifier l'événement."
    ],
    contentTitle: "Notre solution ?",
    impactTitle: "L'impact ?",
    impact: "Une opération fédératrice, inclusive et engagée, qui illustre parfaitement le rôle sociétal d'Orange, en lien avec l'esprit des Jeux.",
    metrics: {
      views: "920K",
      contacts: "1,4M",
      interactions: "43K"
    }
  },
  {
    title: "Les Secrets de Loly",
    href: "/assets/media/cases_studies/Les_secrets_de_loly.mp4",
    posterSrc: "/assets/media/cases_studies/cover/LSL_cover.png",
    tags: ["Production", "Social média", "Illustration", "Motion design"],
    sectors: ["Beauté"],
    client: "Les Secrets de Loly",
    category: "Beauté & Cosmétiques",
    period: "2024",
    intro: "Les Secrets de Loly, marque inclusive dédiée aux cheveux texturés, a souhaité annoncer son coffret de Noël avec une vidéo originale inspirée de l'univers Candyland. L'objectif : mettre en scène de façon ludique le coffret et la fondatrice, tout en valorisant les produits phares.",
    contextTitle: "Le challenge ?",
    context: "Créer un contenu à la fois esthétique, fun et fidèle à l'identité de la marque, qui séduise et engage la communauté.",
    contentTitle: "Notre solution ?",
    content: [
      "Un Réel Instagram en illustration 3D.",
      "Nous avons puisé notre inspiration dans le graphisme gaming et une approche « kawaii » pour concevoir une identité visuelle harmonieuse, parfaitement alignée avec l'univers et la personnalité de la marque.",
      "De la stratégie à la production en passant par le casting, le storyboard et la post-production, nous avons orchestré l'ensemble du projet."
    ],
    impactTitle: "L'impact ?",
    impact: "Une campagne visuelle unique qui sublime la collection de Noël tout en renforçant l'image inclusive et innovante des Secrets de Loly.",
    expertise_details: [
      "Stratégie créative et concept Candyland",
      "Direction artistique gaming et kawaii",
      "Casting et storyboard",
      "Production et illustration 3D",
      "Post-production complète"
    ]
  },
  {
    title: "OPI",
    href: "/assets/media/cases_studies/OPI.webm",
    posterSrc: "/assets/media/cases_studies/cover/OPI_cover.png",
    tags: ["Influence", "Ad-fluence"],
    sectors: ["Beauté"],
    client: "O.P.I",
    category: "Beauté & Cosmétiques",
    period: "2024",
    intro: "O.P.I, marque iconique dans l'univers des ongles, a lancé Repair Mode, un sérum reconstituant et réparateur à base de kératine. Pour accompagner ce lancement, la marque souhaitait déployer une campagne d'influence capable de générer de la notoriété produit et de stimuler les ventes.",
    contextTitle: "Le challenge ?",
    context: "Faire découvrir ce nouveau soin au grand public et créer de l'engagement autour de son efficacité.",
    contentTitle: "Notre solution ?",
    content: [
      "Imaginer une campagne d'influence agile et média-centric sur Instagram et TikTok.",
      "Nous avons activé 4 talents et produit des contenus à forte valeur ajoutée : Reels, stories et vidéos TikTok, avec un plan média ciblé.",
      "De la sélection des profils à la stratégie de médiatisation, en passant par le brief créatif et le reporting, nous avons orchestré l'ensemble du dispositif pour garantir impact et cohérence."
    ],
    impactTitle: "L'impact ?",
    impact: "Un lancement digital maîtrisé, des créateurs engagés, et une campagne à la hauteur de l'innovation produit.",
    expertise_details: [
      "Sélection de profils talents",
      "Stratégie de médiatisation ciblée",
      "Brief créatif et production contenus",
      "Orchestration dispositif multi-plateformes",
      "Reporting et optimisation performance"
    ]
  },
  {
    title: "ShowroomSport",
    href: "/assets/media/cases_studies/ShowroomSport.mp4",
    posterSrc: "/assets/media/cases_studies/cover/Mathis_cover.png",
    tags: ["Production", "Célébrité"],
    sectors: ["Sport"],
    client: "ShowroomSport",
    category: "Sport & Performance",
    period: "2024",
    intro: "Pour valoriser sa verticale Sport Performances, ShowroomSport a mis au défi l'athlète Mathis Dumas lors d'une descente de piste à ski en duo avec un collaborateur passionné de la marque.",
    contextTitle: "Le challenge ?",
    context: "Créer un contenu authentique et impactant qui incarne à la fois la performance sportive et l'esprit d'équipe, tout en valorisant la gamme sportive.",
    contentTitle: "Notre solution ?",
    content: [
      "Un storytelling puissant et une production dynamique.",
      "Nous avons orchestré l'ensemble du projet : du casting aux réseaux de sportifs de haut niveau, en passant par la gestion opérationnelle, la production photo, vidéo et drone.",
      "En seulement 3 semaines, du brief à la livraison, nous avons produit un Reels, une story Instagram, et 24 assets déclinés pour les campagnes Social Ads."
    ],
    impactTitle: "Le résultat ?",
    impact: "Une campagne sportive et visuelle qui capture l'essence de la performance, engage les communautés et dynamise l'image de ShowroomSport.",
    expertise_details: [
      "Casting de sportifs de haut niveau",
      "Gestion opérationnelle complète",
      "Production photo, vidéo et drone",
      "Storytelling puissant et dynamique",
      "Déclinaison multi-assets pour Social Ads"
    ],
    metrics: {
      vues: "200K",
      interactions: "3,2K"
    }
  },
  {
    title: "La Biche‑Renard",
    href: "/assets/media/cases_studies/La_biche_Renard.webm",
    posterSrc: "/assets/media/cases_studies/cover/LBR_COVER.png",
    tags: ["Influence", "Production", "Social média"],
    sectors: ["Solidarité"],
    client: "La Biche Renard",
    category: "Mode & Solidarité",
    period: "2024",
    intro: "À l'occasion de la Journée de lutte contre le cancer de l'enfant, La Biche Renard a souhaité imaginer une activation créative et fédératrice. L'objectif : sensibiliser et mobiliser le grand public à travers un dispositif solidaire et participatif, co-créé avec les enfants atteints de cancer à l'IHOP de Lyon.",
    contextTitle: "Le challenge ?",
    context: "Donner vie à une opération digitale et humaine, capable d'émouvoir, d'engager et de porter haut la voix des enfants et de l'association 2500 voix.",
    contentTitle: "Notre solution ?",
    content: [
      "Nous avons créé le Grand Parcours Solidaire : deux parcours de billes imaginés, créés et assemblés par la communauté LBR, l'association 2500 voix et les enfants eux-mêmes.",
      "Pour amplifier l'opération, nous avons activé deux influenceurs et diffusé une série de contenus engageants : deux Reels Instagram, quatre stories de trois écrans, ainsi qu'un TikTok et un YouTube Shorts bonus.",
      "Notre équipe a assuré le casting, la gestion opérationnelle, le briefing des talents, le conseil éditorial média-centric, la production et le reporting."
    ],
    impactTitle: "L'impact ?",
    impact: "Une campagne émotive et participative qui mêle solidarité, créativité et engagement digital, en donnant une résonance plus forte à la cause des enfants atteints de cancer.",
    expertise_details: [
      "Création Grand Parcours Solidaire collaboratif",
      "Activation 2 influenceurs engagés",
      "Production contenus multi-formats",
      "Casting et gestion opérationnelle",
      "Conseil éditorial média-centric"
    ]
  },
  {
    title: "Verbaudet - Cartable",
    href: "/assets/media/cases_studies/Verbaudet-cartable.mp4",
    posterSrc: "/assets/media/cases_studies/cover/VERTBAUDET_cover.png",
    tags: ["Production", "3D", "Social média"],
    sectors: ["Habitat"],
    client: "Vertbaudet",
    category: "Mode & Enfant",
    period: "2024",
    intro: "À l'occasion de la rentrée scolaire, Vertbaudet souhaitait valoriser son alerte crush : le cartable Liberty. Une vidéo magique qui plonge dans l'imaginaire de l'enfant et célèbre la préparation de la rentrée.",
    contextTitle: "Le challenge ?",
    context: "Créer un contenu visuel enchanté et engageant, reflétant à la fois la douceur de l'enfance et l'excitation du retour en classe.",
    contentTitle: "Notre solution ?",
    content: [
      "Un Réel Instagram médiatisé.",
      "Nous avons pris en charge la stratégie, le casting de visual creators, la gestion opérationnelle complète, ainsi que la production et création 3D du contenu.",
      "Notre accompagnement a également inclus un conseil éditorial adapté à un contenu media centric."
    ],
    impactTitle: "L'impact ?",
    impact: "Une campagne immersive et captivante qui fait rayonner Vertbaudet et séduit les parents comme les enfants.",
    expertise_details: [
      "Stratégie créative et conseil éditorial",
      "Casting de visual creators",
      "Gestion opérationnelle complète",
      "Production et création 3D du contenu",
      "Accompagnement media centric"
    ]
  },
  {
    title: "Vestiaire Collective",
    href: "/assets/media/cases_studies/Vestiaire_Collective.mp4",
    posterSrc: "/assets/media/cases_studies/cover/VestiaireCo_cover.png",
    tags: ["Production", "3D", "Social média"],
    sectors: ["Mode"],
    client: "Vestiaire Collective",
    category: "Mode & Luxe",
    period: "2024",
    intro: "Vestiaire Collective, plateforme leader de la mode de seconde main de luxe, a souhaité sensibiliser sur l'impact de la fast fashion en interrogeant : quel serait notre futur si nos modes de consommation restaient inchangés ?",
    contextTitle: "Le challenge ?",
    context: "Faire passer un message fort et engagé, capable de toucher les consciences tout en valorisant l'éthique de la marque.",
    contentTitle: "Notre solution ?",
    content: [
      "Un contenu FOOH puissant et visuel.",
      "Nous avons orchestré la création d'un Réel Instagram impactant, en prenant en charge la stratégie, le casting de visual creators, la gestion opérationnelle complète (brief, storyboard, tournage) ainsi que la production et la post-production, incluant également des déclinaisons pour le FOOH."
    ],
    impactTitle: "L'impact ?",
    impact: "Une campagne éditoriale media centric qui interpelle, engage et renforce la prise de conscience autour de la mode durable, au cœur des valeurs Vestiaire Collective.",
    expertise_details: [
      "Stratégie créative et sensibilisation",
      "Casting de visual creators",
      "Gestion opérationnelle complète",
      "Production et post-production 3D",
      "Déclinaisons FOOH multi-supports"
    ]
  },
  {
    title: "Showroom Géraldine Nakache",
    href: "/assets/media/cases_studies/ShowroomBy-Géraldine.mp4",
    posterSrc: "/assets/media/cases_studies/cover/Geraldine_Cover.png",
    tags: ["Production", "Ad-fluence", "Brand content", "Célébrité"],
    sectors: ["Mode"],
    client: "ShowroomPrivé",
    category: "Mode & Lifestyle",
    period: "2025",
    intro: "Avec ses éditions ShowroomBY, ShowroomPrivé continue de collaborer avec des égéries emblématiques pour mettre en valeur ses univers lifestyle : mode, beauté, maison et voyage. Pour cette édition 2025, c'est Géraldine Nakache qui a ouvert les portes de son dressing pour une sélection exclusive.",
    contextTitle: "Le challenge ?",
    context: "Créer un dispositif influence & contenu capable d'incarner la personnalité de l'égérie tout en valorisant les produits de la sélection ShowroomPrivé.",
    contentTitle: "Notre solution ?",
    content: [
      "Un contenu immersif, élégant et pensé pour la performance.",
      "Nous avons accompagné ShowroomPrivé de A à Z : casting, coordination avec l'entourage de la célébrité, production des contenus, gestion opérationnelle, et reporting.",
      "Le dispositif a été pensé pour mixer notoriété et conversion : un IGP en crosspost, 3 stories, 12 assets photos et vidéos adaptés au Social Ads, et 2 drops exclusifs de 30 produits."
    ],
    impactTitle: "L'impact ?",
    impact: "Une campagne incarnée, inspirante et parfaitement alignée avec les valeurs de la marque, qui a su engager les communautés autour d'un univers mode accessible et désirable.",
    expertise_details: [
      "Casting et coordination celebrity",
      "Production contenus immersifs",
      "Gestion opérationnelle complète",
      "Stratégie notoriété + conversion",
      "Reporting et optimisation performance"
    ]
  },
  {
    title: "Nivea",
    href: "/assets/media/cases_studies/Nivea.mp4",
    posterSrc: "/assets/media/cases_studies/cover/NIVEA_cover.png",
    tags: ["Production", "3D", "Social Ads"],
    sectors: ["Beauté"],
    client: "Nivéa",
    category: "Cosmétiques & Beauté",
    period: "2024",
    intro: "Pour promouvoir son spray Protect & Hydrate, Nivéa a souhaité sensibiliser le grand public à l'importance de la protection solaire… d'une façon inédite. L'idée : Détourner une statue emblématique de Paris pour faire passer un message fort, visible et mémorable.",
    contextTitle: "Le challenge ?",
    context: "Créer un contenu social percutant pour engager, interpeller et faire réagir.",
    contentTitle: "Notre solution ?",
    content: [
      "Un contenu FOOH pensé pour TikTok, entre émotion et surprise.",
      "Nous avons pris en charge l'ensemble de la chaîne de production : stratégie, casting, storyboard, tournage, post-production et médiatisation sur 3 semaines."
    ],
    impactTitle: "Le résultat ?",
    impact: "Une vidéo virale qui incarne la vision de la marque tout en s'adressant à une cible jeune, urbaine et engagée. Un message fort, porté par une création originale qui a su faire rayonner la marque là où elle ne s'exprimait pas encore.",
    expertise_details: [
      "Stratégie créative FOOH",
      "Casting et storyboard",
      "Tournage et post-production",
      "Médiatisation TikTok",
      "Détournement créatif d'espace public"
    ]
  },
  {
    title: "Emma - Étude d'Impact",
    href: "/assets/media/cases_studies/Emma_etude_impact.mp4",
    posterSrc: "/assets/media/cases_studies/cover/Emma_cover.png",
    tags: ["Influence", "Production"],
    sectors: ["Habitat"],
    client: "Emma Matelas",
    category: "E-commerce",
    period: "2024",
    intro: "Emma Matelas a initié une étude pionnière pour évaluer la performance de ses campagnes d'influence, sans recourir à la mise en avant marketing ni aux codes promo.",
    contextTitle: "Le challenge ?",
    context: "Mesurer avec précision le retour sur investissement des actions d'influence, en isolant l'impact authentique des créateurs de contenu.",
    contentTitle: "Notre solution ?",
    content: [
      "Nous avons mobilisé 16 créateurs de différentes envergures : 3 Mega, 3 Macro, 5 Middle et 5 Micro-influenceurs.",
      "Cette approche nous a permis d'analyser les performances selon la taille d'audience, en mesurant le ROAS par influenceur, en intégrant la rémanence, avec un suivi des résultats en temps réel."
    ],
    impactTitle: "L'impact ?",
    impact: "Une avancée majeure pour Emma Matelas qui gagne en transparence et en efficacité dans sa stratégie d'influence, tout en affinant son pilotage et son ROI.",
    expertise_details: [
      "Casting d'influenceurs segmenté par taille d'audience",
      "Mesure du ROAS par influenceur avec intégration de la rémanence",
      "Suivi des résultats en temps réel",
      "Analyse comparative des performances par segment"
    ],
    metrics: {
      audiences: "2M",
      vues: "480K",
      emv: "250K€",
      roas: "3.5"
    }
  },
  {
    title: "RedBull",
    href: "/assets/media/cases_studies/redbull.webm",
    posterSrc: "/assets/media/cases_studies/cover/redbull.jpg",
    tags: ["Production", "Brand content", "Social média"],
    sectors: ["Food & Beverage"],
    client: "Red Bull",
    category: "Sport & Lifestyle",
    period: "2024",
    intro: "Red Bull, marque incontournable du sport, de la musique et de la culture urbaine, nous a confié la création de contenus à l'occasion de ses activations événementielles en France. L'objectif : capter l'intensité des moments, et les transformer en contenus engageants pour les réseaux sociaux.",
    contextTitle: "Le challenge ?",
    context: "Produire et éditer, en temps réel, des contenus social media percutants à travers des événements qui ne laissent aucune place à l'improvisation.",
    contentTitle: "Notre solution ?",
    content: [
      "Une équipe agile, réactive et experte du terrain.",
      "Nous avons assuré la captation, le montage et la livraison rapide de photos et vidéos, prêtes à être publiées en live.",
      "De la gestion opérationnelle à la post-production, notre rôle : traduire l'adrénaline Red Bull en formats qui claquent sur tous les écrans."
    ],
    impactTitle: "Le résultat ?",
    impact: "Une couverture social media rythmée, immersive et fidèle à l'univers Red Bull, qui renforce sa proximité avec une communauté ultra-engagée.",
    expertise_details: [
      "Équipe agile et réactive terrain",
      "Captation événementielle en temps réel",
      "Montage et livraison rapide",
      "Gestion opérationnelle complète",
      "Post-production formats social media"
    ]
  },
  {
    title: "Coca-Cola",
    href: "/assets/media/cases_studies/Coca_cola.mp4",
    posterSrc: "/assets/media/cases_studies/cover/Coca_cola.png",
    tags: ["Production", "Social média", "Brand content"],
    sectors: ["Sport", "Food & Beverage"],
    client: "Coca-Cola",
    category: "Food & Beverage",
    period: "2024",
    intro: "Pendant deux mois, à l'occasion des Jeux Olympiques et Paralympiques, Coca-Cola et Fuze Tea ont confié à notre équipe la création de contenus à destination de leurs réseaux sociaux. L'objectif : incarner l'engagement des marques dans le sport, l'inclusivité et le divertissement à l'échelle nationale.",
    contextTitle: "Le challenge ?",
    context: "Produire, éditer et publier des contenus à chaud, en continu, sur l'ensemble du territoire français, pour faire vivre les Jeux en temps réel au plus près des communautés.",
    contentTitle: "Notre solution ?",
    content: [
      "Une production agile et réactive, pensée pour les réseaux sociaux.",
      "Nous avons capturé l'énergie des événements à travers plus de 1000 photos et 50 vidéos, toutes montées et diffusées quasi instantanément.",
      "Grâce à une organisation millimétrée, une équipe mobile et un traitement éditorial rythmé, chaque moment a été transformé en contenu engageant.",
      "Du brief à la post-production, en passant par la gestion opérationnelle et les tournages multi-sites, nous avons assuré un dispositif complet et parfaitement réactif."
    ],
    impactTitle: "L'impact ?",
    impact: "Une présence sociale intense, humaine et fédératrice, qui a permis aux marques de vibrer au rythme des JO avec leurs audiences.",
    expertise_details: [
      "Production agile et réactive",
      "Captation événementielle multi-sites",
      "Montage et diffusion quasi instantanés",
      "Gestion opérationnelle complète",
      "Traitement éditorial rythmé"
    ]
  },
  {
    title: "Fidme",
    href: "/assets/media/cases_studies/Fidme_courses.webm",
    posterSrc: "/assets/media/cases_studies/cover/Fidme.png",
    tags: ["Production TV", "Social Ads"],
    sectors: ["Food & Beverage"],
    client: "Fidme Courses",
    category: "E-commerce & Services",
    period: "2024",
    intro: "Fidme Courses a sollicité Gust pour renforcer sa notoriété auprès du grand public grâce à une campagne percutante, déployée sur plusieurs canaux digitaux et traditionnels.",
    contextTitle: "Le challenge ?",
    context: "Concevoir et produire des contenus vidéo courts et impactants, adaptés à chaque support, pour maximiser la visibilité et l'engagement.",
    contentTitle: "Notre solution ?",
    content: [
      "Une stratégie créative et une production sur-mesure.",
      "Nous avons développé des spots de 10 et 20 secondes, avec un storytelling pensé pour captiver. Ces vidéos ont été déclinées spécifiquement pour la TV replay, YouTube, DOOH, Meta et TikTok.",
      "Notre équipe a géré tout le process, du brief à la négociation, en passant par la production, le tournage et la post-production, ainsi que le traitement et l'édition adaptés à chaque canal."
    ],
    impactTitle: "L'impact ?",
    impact: "Une campagne fluide, cohérente et efficace, offrant à Fidme Courses une visibilité forte et une présence renforcée sur ses marchés clés.",
    expertise_details: [
      "Stratégie créative multi-supports",
      "Production spots 10/20 secondes",
      "Déclinaisons TV, YouTube, DOOH, Meta, TikTok",
      "Gestion complète du process créatif",
      "Post-production adaptée par canal"
    ]
  },
  {
    title: "Conforama",
    href: "/assets/media/cases_studies/CONFORAMA-8h.webm",
    posterSrc: "/assets/media/cases_studies/cover/CONFORAMA.png",
    tags: ["Influence", "Ad-fluence", "UGC", "Production"],
    sectors: ["Habitat"],
    client: "8heures",
    category: "Ameublement & Literie",
    period: "2024",
    intro: "8heures a fait appel à GUST pour renforcer sa notoriété auprès de ses audiences clés et activer un dispositif puissant de conversion lors de moments stratégiques. L'objectif : faire de 8heures la marque incontournable de literie en France.",
    contextTitle: "Le challenge ?",
    context: "Déployer une campagne d'influence massive et efficace, capable de générer visibilité, engagement et ventes.",
    contentTitle: "Notre solution ?",
    content: [
      "Une activation multi-talents sur TikTok et Instagram.",
      "Nous avons mobilisé 97 créateurs, entre influenceurs et producteurs de contenu UGC, pour créer plus de 220 posts adaptés aux formats et usages des plateformes.",
      "De la sélection des talents au brief créatif, en passant par la gestion opérationnelle, la production et le reporting, chaque étape a été pensée pour maximiser l'impact."
    ],
    impactTitle: "Le résultat ?",
    impact: "Plus de 1,5 million d'impressions, 1,46 million de personnes atteintes et 60 000 interactions, un succès qui place 8heures comme une marque forte et reconnue.",
    expertise_details: [
      "Sélection de 97 créateurs multi-talents",
      "Production de 220+ posts adaptés",
      "Gestion opérationnelle massive",
      "Brief créatif multi-plateformes",
      "Reporting et optimisation performance"
    ],
    metrics: {
      impressions: "1,5M+",
      reach: "1,46M",
      interactions: "60K"
    }
  },
  {
    title: "La Chênaie",
    href: "/assets/media/cases_studies/lachenaie.webm",
    posterSrc: "/assets/media/cases_studies/cover/lachenaie.png",
    tags: ["Influence", "UGC"],
    sectors: ["Beauté"],
    client: "La Chênaie",
    category: "Beauté & Cosmétiques",
    period: "2024",
    intro: "Pour le lancement de son nouveau soin illuminateur, La Chênaie mise sur une innovation à double promesse : un effet perfecteur immédiat et des actifs puissants issus du chêne.",
    contextTitle: "Le challenge ?",
    context: "Imposer cette nouveauté comme un indispensable beauté, en affirmant son positionnement premium, à la frontière du soin et du maquillage.",
    contentTitle: "Notre solution ?",
    content: [
      "Un dispositif social media incarné, reposant sur la création de contenus authentiques et aspirationnels.",
      "20 Reels Instagram ont été produits autour de profils ciblés, avec une approche storytelling sur les bénéfices immédiats et long terme du produit."
    ],
    impactTitle: "L'impact ?",
    impact: "La campagne a permis de créer une prise de parole élégante et incarnée, renforçant la notoriété du produit tout en installant l'univers sensoriel de la marque sur les réseaux sociaux.",
    expertise_details: [
      "Dispositif social media incarné",
      "Création contenus authentiques et aspirationnels",
      "Production 20 Reels Instagram ciblés",
      "Approche storytelling bénéfices produit",
      "Installation univers sensoriel marque"
    ]
  },
  {
    title: "Parions Sport",
    href: "/assets/media/cases_studies/Parions_Sport_valise.mp4",
    posterSrc: "/assets/media/cases_studies/cover/ParionsSport.png",
    tags: ["Production", "3D", "Social média", "Social Ads"],
    sectors: ["Sport"],
    client: "Parions Sport En Ligne",
    category: "Sport & Gaming",
    period: "2024",
    intro: "À l'occasion de la reprise de la Ligue des Champions, Parions Sport En Ligne souhaitait mettre en avant son partenariat avec le PSG de manière spectaculaire avec comme objectif, créer un contenu visuel fort, capable d'engager les fans et de renforcer l'image de la marque dans l'univers du sport et du gaming.",
    contextTitle: "Le challenge ?",
    context: "Concevoir une campagne visuelle puissante et mémorable, diffusée sur les réseaux sociaux comme en DOOH, pour générer de l'engagement autour d'un moment clé : le retour de la LDC.",
    contentTitle: "Notre solution ?",
    content: [
      "Créer 2 vidéos 100% 3D à l'énergie explosive.",
      "Nous avons conçu un contenu immersif, pensé comme une véritable expérience visuelle. Grâce à un storytelling sur mesure et une direction artistique percutante, les vidéos combinent spectacle, émotion et identité de marque.",
      "Nos expertises ont également été mobilisées pour anticiper toutes les déclinaisons nécessaires au déploiement de la campagne : formats social ads, DOOH, site web, newsletters et supports e-commerce."
    ],
    impactTitle: "L'impact ?",
    impact: "2 contenus qui marquent les esprits, une présence média cohérente et une campagne à la hauteur de l'intensité du jeu.",
    expertise_details: [
      "Conception 2 vidéos 100% 3D",
      "Storytelling sur mesure PSG x LDC",
      "Direction artistique percutante",
      "Déclinaisons multi-supports",
      "Déploiement campagne social ads + DOOH"
    ]
  },
  {
    title: "Le Monde",
    href: "/assets/media/cases_studies/Le-monde.webm",
    posterSrc: "/assets/media/cases_studies/cover/Le_monde.png",
    tags: ["Production", "Brand content", "Social média"],
    sectors: ["Banque"],
    client: "Le Monde x Mastercard",
    category: "Média & Gastronomie",
    period: "2024",
    intro: "Dans le cadre de son partenariat avec Mastercard, Le Monde souhaitait produire un contenu digital élégant et attractif, en lien avec l'univers culinaire parisien. L'objectif : valoriser l'expérience gastronomique et mettre en avant l'esprit du Goût de M., selon les codes premium de Mastercard et The Fork.",
    contextTitle: "Le challenge ?",
    context: "Créer un contenu social court, esthétique et immersif, capable de capter l'attention tout en incarnant l'art de vivre parisien.",
    contentTitle: "Notre solution ?",
    content: [
      "La réalisation d'une vidéo mêlant photographies culinaires et lifestyle avec un motion design raffiné, pensée pour les réseaux sociaux.",
      "Notre équipe a assuré la direction artistique, le repérage et la coordination, la photographie culinaire et lifestyle, le montage vidéo, l'habillage sonore, ainsi que la rédaction et le design typographique.",
      "Résultat : 1 vidéo sociale élégante et dynamique, parfaitement alignée avec l'univers du Goût de M."
    ],
    impactTitle: "L'impact ?",
    impact: "Un contenu esthétique, premium et engageant, qui renforce l'image de Mastercard et de The Fork autour d'une expérience culinaire unique et désirable.",
    expertise_details: [
      "Direction artistique et repérage",
      "Photographie culinaire et lifestyle",
      "Montage vidéo et motion design raffiné",
      "Habillage sonore professionnel",
      "Rédaction et design typographique"
    ]
  },
  {
    title: "Saily",
    href: "/assets/media/cases_studies/saily.webm",
    posterSrc: "/assets/media/cases_studies/cover/saily.png",
    tags: ["Brand content", "Social Ads", "Ad-fluence", "Influence"],
    sectors: ["Technologie"],
    client: "Saily",
    category: "Voyage & Tourism",
    period: "2024",
    intro: "Dans un marché du voyage très concurrentiel, Saily souhaitait accroître sa notoriété et accélérer sa croissance digitale. L'objectif : développer la visibilité de la marque auprès de ses audiences cibles, générer des ventes en augmentant le trafic vers le site et attirer des leads qualifiés.",
    contextTitle: "Le challenge ?",
    context: "S'imposer de manière naturelle dans l'univers du voyage, un secteur où la décision d'achat est longue et exige un positionnement affinité fort.",
    contentTitle: "Notre solution ?",
    content: [
      "Un dispositif média-centré, pensé pour la performance et l'image.",
      "Nous avons identifié un profil voyage inspirant et authentique afin de porter la marque et l'ancrer dans son univers. Notre équipe a assuré le casting et l'accompagnement du talent, la gestion opérationnelle, le briefing, ainsi que le conseil éditorial pour des contenus adaptés aux codes des plateformes.",
      "Résultat : 1 Reel et 1 TikTok produits et diffusés, amplifiés par une stratégie média optimisée. Nous avons accompagné la marque sur le media spending, la stratégie média globale et assuré un reporting complet des performances."
    ],
    impactTitle: "L'impact ?",
    impact: "Un contenu impactant, média-friendly et incarné, qui permet à Saily de gagner en notoriété, de renforcer sa légitimité sur le secteur du voyage et de générer un trafic qualifié vers son site.",
    expertise_details: [
      "Casting profil voyage inspirant et authentique",
      "Accompagnement talent et conseil éditorial",
      "Production 1 Reel + 1 TikTok optimisés",
      "Stratégie média et media spending",
      "Reporting complet des performances"
    ]
  },
  {
    title: "Emma Moving Day",
    href: "/assets/media/cases_studies/EMMA_MOVING_DAY.webm",
    posterSrc: "/assets/media/cases_studies/cover/Emma ugc.png",
    tags: ["Influence", "Production"],
    sectors: ["Habitat"],
    client: "Emma Matelas",
    category: "E-commerce & Lifestyle",
    period: "2024",
    intro: "Pour célébrer ses 10 ans, Emma Matelas a voulu marquer les esprits avec une campagne émotionnelle, sociale et pleine de sens. L'idée ? Créer un moment inoubliable autour de la livraison d'un matelas, pile le jour où on en a le plus besoin : celui d'un déménagement.",
    contextTitle: "LE CHALLENGE ?",
    context: "Mettre en lumière l'utilité concrète des produits Emma tout en renforçant le lien émotionnel avec la marque à travers une campagne social-first.",
    contentTitle: "NOTRE SOLUTION ?",
    content: [
      "Nous avons imaginé et produit le Emma Moving Day : une opération influence et terrain à Toulouse, avec 10 livraisons surprises de matelas, orchestrées le jour même du déménagement de gagnants tirés au sort.",
      "Un storytelling authentique, des contenus pensés pour TikTok, Instagram et Reels, et une activation créative à fort potentiel de viralité.",
      "De l'idée à la livraison des assets, GUST a piloté l'ensemble du dispositif."
    ],
    impactTitle: "L'IMPACT ?",
    impact: "Une campagne incarnée et sincère, à l'image de la marque : généreuse, utile et ancrée dans le quotidien. Le tout relayé par des contenus émotionnels qui renforcent la préférence de marque.",
    expertise_details: [
      "Opération influence et terrain Toulouse",
      "10 livraisons surprises orchestrées",
      "Storytelling authentique et émotionnel",
      "Contenus TikTok, Instagram et Reels",
      "Pilotage dispositif complet de A à Z"
    ],
    metrics: {
      livraisons: "10",
      capsules: "3",
      profil: "1"
    }
  },
  {
    title: "Fleury Michon",
    href: "/assets/media/cases_studies/Fleury-Michon.mp4",
    posterSrc: "/assets/media/cases_studies/cover/fleury-michon.png",
    tags: ["Production", "Motion design", "Illustration"],
    sectors: ["Food & Beverage"],
    client: "Fleury Michon",
    category: "Agroalimentaire",
    period: "2024",
    intro: "Dans le cadre de sa nouvelle prise de parole, Fleury Michon souhaitait prolonger sa visibilité au-delà des affichages JC Decaux et renforcer son impact digital. L'objectif : adapter les messages clés de la marque aux réseaux sociaux tout en créant une passerelle entre communication offline et online.",
    contextTitle: "Le challenge ?",
    context: "Donner vie aux affiches en leur apportant une dimension créative et engageante, capable de capter l'attention dans les environnements sociaux et e-commerce.",
    contentTitle: "Notre solution ?",
    content: [
      "La création d'une série de social ads en stop motion, au ton humoristique et dynamique, spécialement conçus pour les réseaux sociaux.",
      "Notre équipe a imaginé des contenus ludiques qui reprennent l'univers des affiches JC Decaux et les déclinent dans des formats digitaux.",
      "Résultat : une campagne social ads impactante, pensée pour s'intégrer naturellement aussi bien en DOOH, que sur le site web, la newsletter et l'e-commerce."
    ],
    impactTitle: "L'impact ?",
    impact: "Une activation créative et cohérente, qui renforce la présence digitale de Fleury Michon et démontre que ses contenus trouvent leur place partout : de l'affichage à la conversion.",
    expertise_details: [
      "Création social ads en stop motion",
      "Ton humoristique et dynamique",
      "Adaptation affiches JC Decaux en digital",
      "Déclinaisons multi-supports",
      "Intégration DOOH, web, newsletter, e-commerce"
    ]
  },
  {
    title: "Spring Court",
    href: "/assets/media/cases_studies/spring-court.webm",
    posterSrc: "/assets/media/cases_studies/cover/spring-court.png",
    tags: ["UGC", "Social média"],
    sectors: ["Mode"],
    client: "Spring Court",
    category: "Mode & Lifestyle",
    period: "2024",
  },
  {
    title: "Be Real",
    href: null,
    posterSrc: "/assets/media/cases_studies/cover/be-real.png",
    tags: ["UGC", "Production", "Social média"],
    sectors: ["Food & Beverage"],
    client: "Kellogg's x BeReal",
    category: "Food & Beverage",
    period: "2024",
    intro: "Dans le cadre de sa campagne promotionnelle, Kellogg's a choisi BeReal pour valoriser ses produits de manière originale et authentique.",
    contextTitle: "L'objectif ?",
    context: "Faire connaître une opération spéciale permettant de gagner des goodies exclusifs dont un UNO Kellogg's et un gros lot : une entrée pour le parc Mattel aux États-Unis.",
    contentTitle: "NOTRE SOLUTION ?",
    content: [
      "GUST a été sollicité pour concevoir des concepts de BeReal adaptés à différentes gammes de produits Kellogg's, puis les produire en respectant l'esthétique brute et immédiate de la plateforme.",
      "Nos équipes ont imaginé des scènes du quotidien, shooté une série de photos authentiques et sélectionné les visuels les plus crédibles pour maximiser l'impact natif dans l'univers BeReal."
    ],
    impactTitle: "L'IMPACT ?",
    impact: "Une campagne inédite, incarnée par des visuels naturels, fidèles aux usages de la plateforme, pour capter l'attention des utilisateurs sans jamais trahir leur expérience. Un coup d'essai réussi pour Kellogg's sur BeReal, avec une présence juste, innovante et engageante.",
    description: "Activation social media réalisée sans support vidéo public. Asset vidéo en cours de production."
  },
  {
    title: "Chi Fou Quick",
    href: "/assets/media/cases_studies/chi_fou_quick.webm",
    posterSrc: "/assets/media/cases_studies/cover/chi-fou-quick.png",
    tags: ["Influence", "UGC", "Ad-fluence", "Social média", "Production"],
    sectors: ["Food & Beverage"],
    client: "Quick",
    category: "Food & Beverage",
    period: "2024",
  },
]

export default caseStudies


