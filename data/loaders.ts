import qs from 'qs';

import { fetchAPI } from '../utils/fetch-api';
import { getStrapiURL } from '../utils/get-strapi-url';

const BASE_URL = getStrapiURL();
const BLOG_PER_PAGE = 3;

const homePageQuery = qs.stringify({
  populate: {
    backgroundImage: {
      fields: ['url', 'alternativeText'],
    },
    blocks: {
      on: {
        'blocks.hero': {
          populate: {
            image: {
              fields: ['url', 'alternativeText'],
            },
            cta: true,
          },
        },
        'blocks.paragraph': {
          populate: '*',
        },
        'blocks.event-block': {
          populate: {
            events: {
              populate: '*',
            },
          },
        },
        'blocks.subscribe': {
          populate: true,
        },
      },
    },
  },
});

export async function getHomePage() {
  const path = 'api/home-page';
  const url = new URL(path, BASE_URL);

  url.search = homePageQuery;

  return fetchAPI(url.href, {
    method: 'GET',
    next: { revalidate: 60, tags: ['homepage'] },
  });
}

const headerFooterQuery = qs.stringify({
  populate: {
    header: {
      populate: {
        logo: {
          populate: {
            image: {
              fields: ['url', 'alternativeText'],
            },
          },
        },
        navigation: true,
        cta: true,
      },
    },
    footer: {
      populate: {
        logo: {
          populate: {
            image: {
              fields: ['url', 'alternativeText'],
            },
          },
        },
        navigation: true,
      },
    },
  },
});

export async function getHeaderAndFooter() {
  const path = '/api/header-and-footer';
  const url = new URL(path, BASE_URL);
  url.search = headerFooterQuery;

  return fetchAPI(url.href, {
    method: 'GET',
    next: { revalidate: 3600, tags: ['layout'] },
  });
}

const pageBySlugQuery = (slug: string) =>
  qs.stringify({
    filters: {
      slug: {
        $eq: slug,
      },
    },
    populate: {
      blocks: {
        on: {
          'blocks.hero': {
            populate: {
              image: {
                fields: ['url', 'alternativeText'],
              },
              cta: true,
            },
          },
          'blocks.heading': {
            populate: '*',
          },
          'blocks.image': {
            populate: {
              image: {
                fields: ['url', 'alternativeText'],
              },
            },
          },
          'blocks.gallery': {
            populate: '*',
          },
          'blocks.section-with-paragraph': {
            populate: true,
          },
          'blocks.paragraph': {
            populate: true,
          },
          'blocks.subscribe': {
            populate: true,
          },
        },
      },
    },
  });

export async function getPageBySlug(slug: string) {
  const path = '/api/pages';
  const url = new URL(path, BASE_URL);
  url.search = pageBySlugQuery(slug);

  return fetchAPI(url.href, {
    method: 'GET',
    next: { revalidate: 120, tags: [`page-${slug}`] },
  });
}

export function getContent(
  path: string,
  featured?: boolean,
  query?: string,
  page?: string
) {
  const url = new URL(path, BASE_URL);
  url.search = qs.stringify({
    sort: ['createdAt:desc'],
    filters: {
      $or: [
        { title: { $containsi: query } },
        { description: { $containsi: query } },
      ],
      ...(featured && { featured: { $eq: featured } }),
    },
    pagination: {
      pageSize: BLOG_PER_PAGE,
      page: parseInt(page || '1'),
    },
    populate: {
      image: {
        fields: ['url', 'alternativeText'],
      },
    },
  });

  return fetchAPI(url.href, { method: 'GET' });
}

export async function getContentBySlug(slug: string, path: string) {
  const url = new URL(path, BASE_URL);
  url.search = qs.stringify({
    filters: {
      slug: {
        $eq: slug,
      },
    },
    populate: {
      image: {
        fields: ['url', 'alternativeText'],
      },
    },
  });

  return fetchAPI(url.href, { method: 'GET' });
}
