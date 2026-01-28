import {
  createClient,
  type MicroCMSListContent,
  type MicroCMSQueries,
} from 'microcms-js-sdk';

export const client = createClient({
  serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN || '',
  apiKey: process.env.MICROCMS_PRODUCTION_API_KEY || '',
});

export type Tag = {
  name: string;
  slug: string;
} & MicroCMSListContent;

export type Note = {
  icon: string;
  title: string;
  content: string;
  tags: Tag[];
} & MicroCMSListContent;

export const getTags = async (queries?: MicroCMSQueries) => {
  return await client.getList<Tag>({ endpoint: 'tags', queries });
};

export const getNotes = async (queries?: MicroCMSQueries) => {
  return await client.getList<Note>({ endpoint: 'notes', queries });
};

export const getNotesDetail = async (
  contentId: string,
  queries?: MicroCMSQueries
) => {
  return await client.getListDetail<Note>({
    endpoint: 'notes',
    contentId,
    queries,
  });
};
