type PageInfo = {
  slug: string;
  title: string;
  description?: string;
  isHome?: boolean;
  children: PageInfo[];
};

export const SITE_NAME: string = process.env.SITE_NAME || 'My Website';
export const SITE_URL: string = process.env.SITE_URL || 'http://localhost:3000';
export const SITE_MAP: PageInfo = {
  slug: '',
  title: SITE_NAME,
  description: `${SITE_NAME}のサイトです。`,
  isHome: true,
  children: [
    {
      slug: 'about',
      title: 'About',
      description: 'このサイトについて',
      children: [],
    },
    {
      slug: 'notes',
      title: 'Notes',
      description: '技術メモ・備忘録',
      children: [
        {
          slug: 'page',
          title: 'Notes Page',
          description: '',
          children: [],
        },
      ],
    },
    {
      slug: 'rules',
      title: 'Rules',
      description: 'サイトのデザインルールをまとめたもの',
      children: [],
    },
    {
      slug: 'sketch',
      title: 'Sketch',
      description: 'コードのスケッチやドローイングを掲載するページ（準備中）',
      children: [],
    },
  ],
};

export const getPageInfoArray = (
  path: string,
  dynamicPageInfo?: PageInfo
): PageInfo[] => {
  const paths = path.split('/');
  if (paths[paths.length - 1] === '') {
    paths.pop();
  }

  if (dynamicPageInfo) {
    paths.pop();
  }

  let breadcrumb: PageInfo[] = [];

  paths.forEach((path, index) => {
    let target: PageInfo = {
      slug: '',
      title: '',
      children: [],
    };
    const _target =
      index === 0
        ? SITE_MAP
        : breadcrumb[index - 1].children.find((child) => child.slug === path);
    if (_target) {
      target = _target;
    }
    breadcrumb.push(target);
  });

  if (dynamicPageInfo) {
    breadcrumb.push(dynamicPageInfo);
  }

  if (breadcrumb.length > 1 && breadcrumb[breadcrumb.length - 1].title === '') {
    const index = 0;
    const notFound = {
      slug: '404',
      title: 'ページが見つかりません',
      children: [],
    };
    breadcrumb = [breadcrumb[index], notFound];
  }

  return JSON.parse(JSON.stringify(breadcrumb));
};

export const getPageInfo = (path: string) => {
  const pageInfoArray = getPageInfoArray(path);
  return pageInfoArray[pageInfoArray.length - 1];
};

export const getMetaData = (path: string) => {
  const data = getPageInfo(path);
  const isHome = data.isHome || false;

  return {
    metadataBase: new URL(SITE_URL),
    title: data.isHome ? data.title : `${data.title} | ${SITE_NAME}`,
    description: data.description || '',
    icons: {
      icon: '/favicon.ico',
    },
    openGraph: {
      title: data.isHome ? data.title : `${data.title} | ${SITE_NAME}`,
      description: data.description || '',
      url: SITE_URL,
      siteName: SITE_NAME,
      images: [
        {
          url: '/ogp.png',
          width: 1200,
          height: 630,
          alt: `${SITE_NAME}のOGP画像`,
        },
      ],
      locale: 'ja_JP',
      type: 'website',
    },
    robots: '',
  };
};
