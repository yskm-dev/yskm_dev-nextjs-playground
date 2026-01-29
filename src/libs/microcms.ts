import {
  createClient,
  type MicroCMSListContent,
  type MicroCMSQueries,
} from 'microcms-js-sdk';

// クライアントの遅延初期化
let clientInstance: ReturnType<typeof createClient> | null = null;

function getClient() {
  if (!clientInstance) {
    // Cloudflareでの環境変数のフォールバック
    const serviceDomain = process.env.MICROCMS_SERVICE_DOMAIN || 'bly5b8dqis';
    const apiKey = process.env.MICROCMS_PRODUCTION_API_KEY || 'yGC5Rv81FntEKoG4R8PophDSLndJTW7fJF6L';

    if (!serviceDomain || !apiKey) {
      throw new Error(
        `MicroCMS configuration error: serviceDomain=${serviceDomain}, apiKey=${apiKey ? 'set' : 'missing'}`
      );
    }

    clientInstance = createClient({
      serviceDomain,
      apiKey,
    });
  }
  return clientInstance;
}

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
  const client = getClient();
  return await client.getList<Tag>({ endpoint: 'tags', queries });
};

export const getNotes = async (queries?: MicroCMSQueries) => {
  const client = getClient();
  return await client.getList<Note>({ endpoint: 'notes', queries });
};

export const getNotesDetail = async (
  contentId: string,
  queries?: MicroCMSQueries
) => {
  const client = getClient();
  return await client.getListDetail<Note>({
    endpoint: 'notes',
    contentId,
    queries,
  });
};
