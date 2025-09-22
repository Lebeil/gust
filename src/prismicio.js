import * as prismic from "@prismicio/client";
import * as prismicNext from "@prismicio/next";
import config from "../slicemachine.config.json";

/**
 * The project's Prismic repository name.
 */
export const repositoryName =
  process.env.NEXT_PUBLIC_PRISMIC_ENVIRONMENT || config.repositoryName;

/**
 * A list of Route Resolver objects that define how a document's `url` field
 * is resolved.
 *
 * {@link https://prismic.io/docs/route-resolver#route-resolver}
 *
 * @type {prismic.ClientConfig["routes"]}
 */
export const routes = [
  // {
  //   type: "page",
  //   uid: "maintenance",
  //   path: '/:lang?'
  // },
  {
    type: "page",
    uid: "home",
    path: '/:lang?'
  },
  {
    type: "page",
    uid: "visual-creators",
    path: "/:lang?/visual-creators",
  },
  {
    type: "page",
    uid: "open",
    path: "/:lang?/open",
  },
  {
    type: "page",
    uid: "make-it",
    path: "/:lang?/make-it",
  },
  {
    type: "page",
    uid: "contact",
    path: "/:lang?/contact",
  },
  {
    type: "page",
    uid: "work",
    path: "/:lang?/work",
  },
  {
    type: "work",
    path: "/:lang?/work/:uid",
  }
];

/**
 * Creates a Prismic client for the project's repository. The client is used to
 * query content from the Prismic API.
 *
 * @param config {prismicNext.CreateClientConfig} - A configuration object to
 */
export const createClient = (config = {}) => {
  const client = prismic.createClient(repositoryName, {
    routes,
    fetchOptions:
      process.env.NODE_ENV === "production"
        ? { next: { tags: ["prismic"], revalidate: 5 } }
        : { next: { revalidate: 5 } },
    ...config,
  });

  prismicNext.enableAutoPreviews({ client });

  return client;
};