import { Layout } from "@/components/Layout"
import { notFound } from "next/navigation"

// Projets statiques pour remplacer Prismic
const projects = {
  'les-secrets-de-loly': {
    title: 'Les secrets de Loly',
    client: 'OPI',
    description: 'Une campagne créative pour OPI mettant en scène Loly dans un univers coloré.',
    video: '/assets/media/cases_studies/Les%20secrets%20de%20loly.mp4',
    tags: ['Production', 'Influence']
  },
  'vestiaire-collective': {
    title: 'Vestiaire Collective',
    client: 'VESTIAIRE COLLECTIVE',
    description: 'Campagne d\'influence pour la plateforme de mode de seconde main.',
    video: '/assets/media/cases_studies/Vestiaire_Collective.mp4',
    tags: ['Influence']
  },
  'showroom-prive': {
    title: 'Showroom Privé',
    client: 'SHOWROOM PRIVÉ',
    description: 'Collaboration avec des célébrités pour une campagne d\'impact.',
    video: '/assets/media/cases_studies/ShowroomBy-Faustine.mp4',
    tags: ['Célébrité', 'Production']
  }
};

export async function generateMetadata({ params: { uid, lang } }) {
  const project = projects[uid];
  
  if (!project) {
    return {
      title: 'Projet non trouvé - Gust',
      description: 'Ce projet n\'existe pas.'
    };
  }
  
  return {
    title: `${project.title} - ${project.client} | Gust`,
    description: project.description,
    keywords: `${project.client}, ${project.tags.join(', ')}, gust`,
    openGraph: {
      title: `${project.title} - ${project.client}`,
      description: project.description,
    },
  }
}

export default async function WorkPage({ params }) {
  const { lang, uid } = await params;
  const project = projects[uid];
  
  if (!project) {
    notFound();
  }
  
  return (
    <Layout>
      <div className="min-h-screen px-6 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              {project.title}
            </h1>
            <p className="text-2xl text-white/60 mb-8">
              {project.client}
            </p>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              {project.description}
            </p>
          </div>
          
          <div className="mb-8">
            <div className="flex flex-wrap gap-2 justify-center">
              {project.tags.map((tag) => (
                <span 
                  key={tag}
                  className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-white/80 text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          
          {project.video && (
            <div className="aspect-video bg-black rounded-lg overflow-hidden">
              <video 
                controls 
                className="w-full h-full"
                poster={`/assets/media/cases_studies/cover/${project.title}_cover.png`}
              >
                <source src={project.video} type="video/mp4" />
                Votre navigateur ne supporte pas la vidéo.
              </video>
            </div>
          )}
        </div>
      </div>
    </Layout>
  )
}

export async function generateStaticParams() {
  // Générer les paramètres statiques pour les projets existants
  const projectIds = Object.keys(projects);
  
  return projectIds.flatMap(uid => [
    { uid, lang: 'fr' },
    { uid, lang: 'en' }
  ]);
}