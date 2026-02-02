import { NOTES } from '@/constants/notes';
import { getNotes } from '@/libs/microcms';
import { MetadataRoute } from 'next';

const SITE_URL = process.env.SITE_URL || 'http://localhost:3000';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // 静的ページ
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/notes`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/rules`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${SITE_URL}/sketch`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ];

  // 動的ページ（ノート記事）
  const { contents } = await getNotes({
    fields: ['id', 'publishedAt', 'updatedAt'],
  });

  const notesPages: MetadataRoute.Sitemap = contents.map((note) => ({
    url: `${SITE_URL}/notes/${note.id}`,
    lastModified: new Date(note.updatedAt || note.publishedAt || new Date()),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  // ページネーションページ
  const totalPages = Math.ceil(contents.length / NOTES.limit);
  const paginationPages: MetadataRoute.Sitemap = Array.from(
    { length: totalPages },
    (_, i) => ({
      url: `${SITE_URL}/notes/page/${i + 1}`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.6,
    })
  );

  return [...staticPages, ...notesPages, ...paginationPages];
}
