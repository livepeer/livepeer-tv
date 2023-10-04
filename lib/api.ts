import { gql } from "@apollo/client";
import { Show } from "@/types/index";
import client from "@/client/graphql";
import * as contentful from "contentful";
import config from "./config";

async function getPreviousShows(): Promise<Show[]> {
  const currentDate = new Date().toISOString();

  const { data } = await client.query({
    query: gql`
      {
        showCollection(where: { date_lte: "${currentDate}" }) {
          items {
            title
            description
            date
            color
            playbackId
            isRecording
            guest {
              name
              imageNoBackground {
                url
              }
              image {
                url
              }
            }
          }
        }
      }
    `,
  });

  const sortedShows = [...data.showCollection.items].sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  return sortedShows;
}

async function getUpcomingShows(): Promise<Show[]> {
  const currentDate = new Date().toISOString();

  const { data } = await client.query({
    query: gql`
      {
        showCollection(where: { date_gte: "${currentDate}" }) {
          items {
            title
            description
            date
            color

            playbackId
            guest {
              name
              imageNoBackground {
                url
              }
              image {
                url
              }
            }
          }
        }
      }
    `,
  });

  const sortedShows = [...data.showCollection.items].sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  return sortedShows;
}

async function getShowFromPlaybackId(playbackId: string): Promise<Show[]> {
  const { data } = await client.query({
    query: gql`
      query {
        showCollection(where: { playbackId: "${playbackId}" }) {
          items {
            title
            description
            date
            playbackId
            isRecording
            roomId
            inviteLink
            guest {
              name
              imageNoBackground {
                url
              }
              image {
                url
              }
            }
          }
        }
      }
    `,
  });

  return data.showCollection.items;
}

async function checkHost(email: string): Promise<boolean> {
  const { data } = await client.query({
    query: gql`
      query {
        hostCollection(where: { email: "${email}" }) {
          items {
            email
            name
          }
        }
      }
    `,
  });

  return data.hostCollection.items.length > 0 ? true : false;
}

// Configurations are fetch directly from Contentful to allow the live preview
async function getConfig(isPreview: boolean) {
  const contentfulClient = contentful.createClient({
    space: config.CONTENTFUL_SPACE_ID as string,
    accessToken: isPreview
      ? (config.CONTENTFUL_PREVIEW_KEY as string)
      : (config.CONTENTFUL_KEY as string),
    host: isPreview ? "preview.contentful.com" : undefined,
  });

  const { items } = await contentfulClient.getEntries({
    content_type: "configuration",
  });

  return items;
}

export {
  getPreviousShows,
  getShowFromPlaybackId,
  getUpcomingShows,
  checkHost,
  getConfig,
};
