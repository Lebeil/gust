/* eslint-disable react/no-unescaped-entities */
import { getSettings } from "@/lib/dataLoader"

export async function generateMetadata() {

  try {
    const settings = getSettings({})
    
    return {
      title: "GUST! Policy - Politique de Confidentialité", 
      description: "La GUST! policy : notre charte pour une influence responsable, créative et bienveillante",
      keywords: "GUST policy, influence responsable, marketing influence, transparence, authenticité",
    }
  } catch (error) {
    return {
      title: "GUST! Policy - Gust",
      description: "Notre politique et charte d'influence responsable",
    }
  }
}

export default async function MentionsLegales() {

  try {
    getSettings({})

    return (
        <div className="min-h-screen bg-white" style={{ color: '#000000' }}>
          <style dangerouslySetInnerHTML={{
            __html: `
              .min-h-screen * {
                color: #000000 !important;
              }
              .min-h-screen h1.text-blue-600 {
                color: #2563eb !important;
              }
              .min-h-screen a.text-blue-600,
              .min-h-screen a.text-blue-800 {
                color: #1e40af !important;
              }
            `
          }} />
          <div className="max-w-4xl mx-auto px-8 py-12">
            {/* Header avec logo GUST! */}
            <div className="mb-12">
              <div className="text-center mb-8">
                <h1 className="text-5xl font-black tracking-wider text-blue-600 mb-2">
                  GUST!
                </h1>
                <p className="text-base font-medium tracking-wide" style={{ color: '#000000' }}>
                  IT'S WHAT YOU DO WITH IT
                </p>
              </div>
            </div>
            
            {/* Contenu */}
            <div className="space-y-6 text-justify leading-relaxed" style={{ color: '#000000' }}>
              
              <div>
                <h2 className="text-xl font-bold mb-4" style={{ color: '#000000' }}>
                  La <u>GUST!</u> policy c'est quoi ?
                </h2>
                
                <div className="space-y-4" style={{ color: '#000000' }}>
                  <p>
                    Parce qu'on ne <em>It's What You Do With It</em> pas n'importe comment ni avec n'importe qui et 
                    pour parler de n'importe quoi !
                  </p>
                  
                  <p>
                    La <strong>GUST!</strong> policy est bien plus qu'une charte, c'est un modèle qu'on s'impose de suivre, celui 
                    de la transparence, celui du respect des règles établies, mais aussi et surtout celui du changement.
                  </p>
                  
                  <p>
                    Nous travaillons depuis près de 10 ans dans ce secteur, nous avons suivi de près son évolution et avons 
                    évolué avec. Du Far West du Marketing d'Influence à une Influence Responsable, Créative et Bienveillante.
                  </p>
                  
                  <p>
                    Ces 3 mots qui nous régissent en tant que professionnels du secteur et qui vont régir les relations que 
                    nous entretenons avec nos partenaires, qu'ils soient annonceurs, agences ou créateurs.
                  </p>
                  
                  <p>
                    La <strong>GUST!</strong> policy c'est le chemin qu'on souhaite emprunter pour poser, nous aussi, notre 
                    pierre à l'édifice.
                  </p>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-bold mb-4" style={{ color: '#000000' }}>
                  Quels sont les objectifs de la <u>GUST!</u> policy ?
                </h2>
                
                <div className="space-y-4" style={{ color: '#000000' }}>
                  <p>
                    <strong>Informer sur la Conformité Légale :</strong> Informer et éduquer nos partenaires sur les règles principales et bonnes pratiques liées au marketing d'influence.
                  </p>
                  
                  <p>
                    <strong>Promouvoir la Transparence :</strong> Encourager la transparence dans les relations entre les créateurs, les marques et les communautés, notamment en ce qui concerne les partenariats.
                  </p>
                  
                  <p>
                    <strong>Favoriser l'Authenticité :</strong> Promouvoir l'authenticité des contenus et des recommandations des influenceurs.
                  </p>
                  
                  <p>
                    <strong>Guider les Clients :</strong> Aider les clients à choisir les influenceurs appropriés pour leur marque en fonction de leurs objectifs, de leurs valeurs et de leur audience cible.
                  </p>

                  <p>
                    <strong>Faciliter la Collaboration :</strong> Favoriser des collaborations transparentes et respectueuses entre les clients et les influenceurs, en établissant des directives claires et des attentes mutuelles.
                  </p>

                  <p>
                    <strong>Promouvoir l'Évolution Positive du Marketing d'Influence :</strong> Soutenir l'évolution du marketing d'influence vers une pratique responsable, créative et bienveillante, tout en contribuant à façonner son développement au-travers de notre adhérence à l'ARPP.
                  </p>

                  <p>
                    <strong>Rendre la Politique Accessible et Évolutive :</strong> Fournir un moyen clair pour les parties prenantes de contacter GUST! en cas de besoin, et établir un processus de révision pour maintenir la politique à jour et conforme aux évolutions légales.
                  </p>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-bold mb-4" style={{ color: '#000000' }}>
                  Quelles sont les règles en vigueur ?*
                </h2>
                
                <div className="space-y-4" style={{ color: '#000000' }}>
                  <p>
                    <strong>Transparence du caractère commercial :</strong> Les influenceurs se doivent d'indiquer explicitement le caractère commercial de leur contenu via les mentions "publicité" ou "collaboration commerciale", assurant ainsi une transparence vis-à-vis de leur audience. Cette mention doit être claire, lisible et identifiable sur l'image ou sur la vidéo, sous tous les formats, durant l'intégralité de la promotion.
                  </p>
                  
                  <p><strong>Comment intégrer la mention ?</strong></p>
                  
                  <p>Sur une story : la mention doit être visible sur chaque écran,</p>
                  <p>Sur une vidéo : la mention doit être visible durant toute la promotion,</p>
                  <p>Sur une photo : la mention doit être intégrée à l'image.</p>
                  
                  <p><strong>Quand l'intégrer ?</strong></p>
                  
                  <p>Dès qu'il s'agit d'un avantage (de l'argent, reçu une invitation ou un produit gratuit), la mention doit apparaitre.</p>
                  
                  <p>En cas de doute, il convient de rajouter « collaboration commerciale » ou « collaboration commerciale – produit offert » ou « collaboration commerciale – invitation »</p>
                  
                  <p><strong>Comment l'intégrer ?</strong></p>
                  
                  <p>A la main, directement sur la photo, la story ou la vidéo.</p>
                  
                  <p>Il est préférable d'utiliser les outils d'indication des partenariat des réseaux sociaux (TikTok et Instagram sont conformes).</p>
                  
                  <p>
                    <strong>Mentions sur les images retouchées ou virtuelles :</strong> Les influenceurs doivent signaler les retouches et images virtuelles lors de communications commerciales ou publicitaires au-travers des indications telles que « Image(s) retouchée(s) » : lorsque l'image est modifiée pour affiner ou épaissir une silhouette ou altérer un visage, « Image(s) virtuelle(s) » : pour les images, vidéos ou représentations créées via intelligence artificielle.
                  </p>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-bold mb-4" style={{ color: '#000000' }}>
                  Quels sont les secteurs interdits ?*
                </h2>
                
                <div className="space-y-4" style={{ color: '#000000' }}>
                  <p>Les services financiers, produits financiers complexes et/ou à risque inconnu ou supérieur au capital de départ, les Crypto et NFT sauf agrément (les produits financiers non/peu risqués peuvent être promus),</p>
                  <p>La chirurgie esthétique, ou des méthodes qui se substitueraient à des actes médicaux</p>
                  <p>Les abonnements à des conseils sur des paris sportifs.</p>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-bold mb-4" style={{ color: '#000000' }}>
                  Quels sont les secteurs réglementés ?*
                </h2>
                
                <div className="space-y-4" style={{ color: '#000000' }}>
                  <p>La promotion des sites de paris sportifs agréés n'est possible que sur les plateformes permettant de cibler les + 18 ans avec une mention signalant l'interdiction du site aux moins de dix‑huit ans.</p>
                  <p>La promotion de l'alcool est soumise à la loi Evin</p>
                  <p>La promotion des produits de santé au code de la santé publique</p>
                  <p>La promotion des produits de financiers au code monétaire et financier</p>
                  <p>La promotion des produits alimentaires aux règlements européens et au code de la santé publique (notamment indiquer les mentions « mangerbouger »).</p>
                  <p>La promotion des formations financées par le CPF est hyper encadrée.</p>
                  <p>Le dropshipping est autorisé mais contraint : l'influenceur doit s'assurer de la disponibilité des produits et de l'absence de contrefaçons. Il doit aussi indiquer l'identité du fournisseur.</p>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-bold mb-4" style={{ color: '#000000' }}>
                  Autres mentions à indiquer selon les cas particuliers* :
                </h2>
                
                <div className="space-y-4" style={{ color: '#000000' }}>
                  <p>
                    <strong>Produits alimentaires :</strong> indiquer sur la vidéo ou l'image et tout au long de la promotion les mentions « mangerbouger » lorsqu'il est fait la promotion des produits alimentaires transformés. Autres mentions possibles : « Pour votre santé, mangez au moins cinq fruits et légumes par jour » OU « Pour votre santé, pratiquez une activité physique régulière » OU « Pour votre santé, évitez de manger trop gras, trop sucré, trop salé » OU « Pour votre santé, évitez de grignoter entre les repas »
                  </p>
                  
                  <p>
                    <strong>Alcool :</strong> « L'abus d'alcool est dangereux pour la santé »
                  </p>
                  
                  <p>
                    <strong>Paris et jeux d'argent :</strong> « Jouer comporte des risques : endettement, dépendance… Appelez le 09-74-75-13-13 (appel non surtaxé). » OU « Jouer comporte des risques : isolement, endettement… Appelez le 09-74-75-13-13 (appel non surtaxé). » OU « Jouer comporte des risques : dépendance, isolement… Appelez le 09-74-75-13-13 (appel non surtaxé). »
                  </p>
                  
                  <p>
                    <strong>Dropshipping :</strong> La responsabilité de l'influenceur est désormais engagée avec l'affichage obligatoire des détails du produit : prix, caractéristiques (taille, quantité, composition…), stock et conditions de vente et de livraison, et l'indication du nom du fournisseur. C'est ce dernier point qui va changer la donne puisque l'influenceur devra indiquer son fournisseur (AliExpress, Alibaba, etc.) ! Et ça, ça change pas mal de choses.
                  </p>
                </div>
              </div>

              <div>
                <p className="text-sm mb-4" style={{ color: '#000000' }}>
                  *Source : Influence 4 You (membre fondateur de l'UMICC)
                </p>
                
                <h2 className="text-xl font-bold mb-4" style={{ color: '#000000' }}>
                  Documents et liens utiles :
                </h2>
                
                <div className="space-y-2" style={{ color: '#000000' }}>
                  <p>
                    <a 
                      href="https://www.economie.gouv.fr/files/files/directions_services/dgccrf/consommation/Guide-de-bonne-conduite-des-influenceurs.pdf" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 underline break-all"
                    >
                      https://www.economie.gouv.fr/files/files/directions_services/dgccrf/consommation/Guide-de-bonne-conduite-des-influenceurs.pdf
                    </a>
                  </p>
                  
                  <p>
                    <a 
                      href="https://www.economie.gouv.fr/guide-bonne-conduite-influenceurs-createurs-contenu" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 underline break-all"
                    >
                      https://www.economie.gouv.fr/guide-bonne-conduite-influenceurs-createurs-contenu
                    </a>
                  </p>
                  
                  <p>
                    <a 
                      href="https://www.arpp.org/wp-content/uploads/2019/09/infographie-Influenceurs.pdf" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 underline break-all"
                    >
                      https://www.arpp.org/wp-content/uploads/2019/09/infographie-Influenceurs.pdf
                    </a>
                  </p>
                </div>
              </div>

              <div className="text-center pt-8 border-t border-gray-200">
                <p className="text-lg font-medium italic" style={{ color: '#000000' }}>
                  It's not just what you do with it, it's how you do it with <strong>GUST!</strong>
                </p>
              </div>
            </div>
          </div>
        </div>
    )
  } catch (error) {
    console.error("Error loading mentions-legales page:", error)
    
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Erreur de chargement</h1>
          <p>Impossible de charger la page GUST! Policy.</p>
        </div>
      </div>
    )
  }
}

export async function generateStaticParams() {
  return [
    { lang: 'fr' },
    { lang: 'fr-fr' },
    { lang: 'en-us' }
  ]
}