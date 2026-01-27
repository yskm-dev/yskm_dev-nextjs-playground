import {
  createClient,
  type MicroCMSListContent,
  type MicroCMSQueries,
} from "microcms-js-sdk";

export const client = createClient({
  serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN || "",
  apiKey: process.env.MICROCMS_PRODUCTION_API_KEY || "",
});

export type Tags = {
  name: string;
  slug: string;
} & MicroCMSListContent;

export type Notes = {
  icon: string;
  title: string;
  content: string;
  tags: Tags[];
} & MicroCMSListContent;

export const getTags = async (queries?: MicroCMSQueries) => {
  return await client.getList<Tags>({ endpoint: "tags", queries });
};

export const getNotes = async (queries?: MicroCMSQueries) => {
  return await client.getList<Notes>({ endpoint: "notes", queries });
};

export const getNotesDetail = async (
  contentId: string,
  queries?: MicroCMSQueries,
) => {
  return await client.getListDetail<Notes>({
    endpoint: "notes",
    contentId,
    queries,
  });
};
