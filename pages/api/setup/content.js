import APIKeys from "../../../lib/config";

const content = {
  contentTypes: [
    {
      sys: {
        space: {
          sys: {
            type: "Link",
            linkType: "Space",
            id: "ip1ar2lpov1g",
          },
        },
        id: "show",
        type: "ContentType",
        createdAt: "2023-09-17T06:00:08.281Z",
        updatedAt: "2023-09-17T15:21:40.476Z",
        environment: {
          sys: {
            id: "master",
            type: "Link",
            linkType: "Environment",
          },
        },
        publishedVersion: 17,
        publishedAt: "2023-09-17T15:21:40.476Z",
        firstPublishedAt: "2023-09-17T06:00:08.941Z",
        createdBy: {
          sys: {
            type: "Link",
            linkType: "User",
            id: "0i73tc7mLGvrymToOFVoQD",
          },
        },
        updatedBy: {
          sys: {
            type: "Link",
            linkType: "User",
            id: "0i73tc7mLGvrymToOFVoQD",
          },
        },
        publishedCounter: 9,
        version: 18,
        publishedBy: {
          sys: {
            type: "Link",
            linkType: "User",
            id: "0i73tc7mLGvrymToOFVoQD",
          },
        },
      },
      displayField: "title",
      name: "Show",
      description: "",
      fields: [
        {
          id: "title",
          name: "Title",
          type: "Symbol",
          localized: false,
          required: false,
          validations: [],
          disabled: false,
          omitted: false,
        },
        {
          id: "date",
          name: "Date",
          type: "Date",
          localized: false,
          required: false,
          validations: [],
          disabled: false,
          omitted: false,
        },
        {
          id: "description",
          name: "Description",
          type: "Text",
          localized: false,
          required: false,
          validations: [],
          disabled: false,
          omitted: false,
        },
        {
          id: "guest",
          name: "Guest",
          type: "Link",
          localized: false,
          required: false,
          validations: [
            {
              linkContentType: ["guest"],
            },
          ],
          disabled: false,
          omitted: false,
          linkType: "Entry",
        },
        {
          id: "color",
          name: "Color",
          type: "Symbol",
          localized: false,
          required: false,
          validations: [
            {
              in: [
                "yellow",
                "blue",
                "orange",
                "purple",
                "teal",
                "red",
                "green",
                "indigo",
                "pink",
              ],
            },
          ],
          disabled: false,
          omitted: false,
        },
        {
          id: "inviteLink",
          name: "Invite Link",
          type: "Symbol",
          localized: false,
          required: false,
          validations: [],
          defaultValue: {
            "en-US": "NA",
          },
          disabled: false,
          omitted: false,
        },
        {
          id: "playbackId",
          name: "Playback Id",
          type: "Symbol",
          localized: false,
          required: false,
          validations: [],
          defaultValue: {
            "en-US": "NA",
          },
          disabled: false,
          omitted: false,
        },
        {
          id: "roomId",
          name: "Room ID",
          type: "Symbol",
          localized: false,
          required: false,
          validations: [],
          defaultValue: {
            "en-US": "NA",
          },
          disabled: true,
          omitted: false,
        },
        {
          id: "streamId",
          name: "Stream ID",
          type: "Symbol",
          localized: false,
          required: false,
          validations: [],
          defaultValue: {
            "en-US": "NA",
          },
          disabled: true,
          omitted: false,
        },
        {
          id: "isRecording",
          name: "Is show pre-recorded?",
          type: "Boolean",
          localized: false,
          required: false,
          validations: [],
          defaultValue: {
            "en-US": false,
          },
          disabled: false,
          omitted: false,
        },
        {
          id: "multistreamShow",
          name: "Multistream show",
          type: "Array",
          localized: false,
          required: false,
          validations: [],
          disabled: false,
          omitted: false,
          items: {
            type: "Symbol",
            validations: [],
          },
        },
      ],
    },
    {
      sys: {
        space: {
          sys: {
            type: "Link",
            linkType: "Space",
            id: "ip1ar2lpov1g",
          },
        },
        id: "guest",
        type: "ContentType",
        createdAt: "2023-09-17T06:00:08.358Z",
        updatedAt: "2023-09-17T14:24:58.431Z",
        environment: {
          sys: {
            id: "master",
            type: "Link",
            linkType: "Environment",
          },
        },
        publishedVersion: 15,
        publishedAt: "2023-09-17T14:24:58.431Z",
        firstPublishedAt: "2023-09-17T06:00:09.695Z",
        createdBy: {
          sys: {
            type: "Link",
            linkType: "User",
            id: "0i73tc7mLGvrymToOFVoQD",
          },
        },
        updatedBy: {
          sys: {
            type: "Link",
            linkType: "User",
            id: "0i73tc7mLGvrymToOFVoQD",
          },
        },
        publishedCounter: 8,
        version: 16,
        publishedBy: {
          sys: {
            type: "Link",
            linkType: "User",
            id: "0i73tc7mLGvrymToOFVoQD",
          },
        },
      },
      displayField: "name",
      name: "Guest",
      description: "",
      fields: [
        {
          id: "name",
          name: "Name",
          type: "Symbol",
          localized: false,
          required: false,
          validations: [],
          disabled: false,
          omitted: false,
        },
        {
          id: "image",
          name: "Image",
          type: "Link",
          localized: false,
          required: false,
          validations: [],
          disabled: false,
          omitted: false,
          linkType: "Asset",
        },
        {
          id: "imageNoBackground",
          name: "Image (No background)",
          type: "Link",
          localized: false,
          required: false,
          validations: [],
          disabled: false,
          omitted: false,
          linkType: "Asset",
        },
        {
          id: "twitterHandle",
          name: "Twitter Handle",
          type: "Symbol",
          localized: false,
          required: false,
          validations: [],
          disabled: false,
          omitted: false,
        },
        {
          id: "otherLink",
          name: "Other Link",
          type: "Symbol",
          localized: false,
          required: false,
          validations: [],
          disabled: false,
          omitted: false,
        },
        {
          id: "email",
          name: "Email",
          type: "Symbol",
          localized: false,
          required: false,
          validations: [
            {
              regexp: {
                pattern: "^\\w[\\w.-]*@([\\w-]+\\.)+[\\w-]+$",
                flags: null,
              },
            },
          ],
          disabled: false,
          omitted: false,
        },
      ],
    },
    {
      sys: {
        space: {
          sys: {
            type: "Link",
            linkType: "Space",
            id: "ip1ar2lpov1g",
          },
        },
        id: "configuration",
        type: "ContentType",
        createdAt: "2023-09-17T06:32:00.181Z",
        updatedAt: "2023-09-17T14:00:50.864Z",
        environment: {
          sys: {
            id: "master",
            type: "Link",
            linkType: "Environment",
          },
        },
        publishedVersion: 11,
        publishedAt: "2023-09-17T14:00:50.864Z",
        firstPublishedAt: "2023-09-17T06:32:00.872Z",
        createdBy: {
          sys: {
            type: "Link",
            linkType: "User",
            id: "0i73tc7mLGvrymToOFVoQD",
          },
        },
        updatedBy: {
          sys: {
            type: "Link",
            linkType: "User",
            id: "0i73tc7mLGvrymToOFVoQD",
          },
        },
        publishedCounter: 6,
        version: 12,
        publishedBy: {
          sys: {
            type: "Link",
            linkType: "User",
            id: "0i73tc7mLGvrymToOFVoQD",
          },
        },
      },
      displayField: "title",
      name: "Configuration",
      description: "",
      fields: [
        {
          id: "brandName",
          name: "Brand Name",
          type: "Symbol",
          localized: false,
          required: false,
          validations: [],
          disabled: false,
          omitted: false,
        },
        {
          id: "brandWebsite",
          name: "Brand Website",
          type: "Symbol",
          localized: false,
          required: false,
          validations: [],
          disabled: false,
          omitted: false,
        },
        {
          id: "brandLogo",
          name: "Brand Logo",
          type: "Link",
          localized: false,
          required: false,
          validations: [],
          disabled: false,
          omitted: false,
          linkType: "Asset",
        },
        {
          id: "brandColor",
          name: "Brand Color",
          type: "Symbol",
          localized: false,
          required: false,
          validations: [],
          disabled: false,
          omitted: false,
        },
        {
          id: "baseUrl",
          name: "Base URL",
          type: "Symbol",
          localized: false,
          required: false,
          validations: [],
          disabled: false,
          omitted: false,
        },
        {
          id: "twitterHandle",
          name: "Twitter Handle",
          type: "Symbol",
          localized: false,
          required: false,
          validations: [],
          disabled: false,
          omitted: false,
        },
        {
          id: "lensHandle",
          name: "Lens Handle",
          type: "Symbol",
          localized: false,
          required: false,
          validations: [],
          disabled: false,
          omitted: false,
        },
        {
          id: "discordServer",
          name: "Discord Server",
          type: "Symbol",
          localized: false,
          required: false,
          validations: [],
          disabled: false,
          omitted: false,
        },
        {
          id: "title",
          name: "Title",
          type: "Symbol",
          localized: false,
          required: false,
          validations: [],
          disabled: false,
          omitted: false,
        },
        {
          id: "description",
          name: "Description",
          type: "Symbol",
          localized: false,
          required: false,
          validations: [],
          disabled: false,
          omitted: false,
        },
        {
          id: "videos",
          name: "Videos",
          type: "Array",
          localized: false,
          required: false,
          validations: [],
          disabled: false,
          omitted: false,
          items: {
            type: "Link",
            validations: [],
            linkType: "Asset",
          },
        },
        {
          id: "upcomingTitle",
          name: "Upcoming Title",
          type: "Symbol",
          localized: false,
          required: false,
          validations: [],
          disabled: false,
          omitted: false,
        },
        {
          id: "upcomingDescription",
          name: "Upcoming Description",
          type: "Symbol",
          localized: false,
          required: false,
          validations: [],
          disabled: false,
          omitted: false,
        },
        {
          id: "previousTitle",
          name: "Previous Title",
          type: "Symbol",
          localized: false,
          required: false,
          validations: [],
          disabled: false,
          omitted: false,
        },
        {
          id: "previousDescription",
          name: "Previous Description",
          type: "Symbol",
          localized: false,
          required: false,
          validations: [],
          disabled: false,
          omitted: false,
        },
      ],
    },
    {
      sys: {
        space: {
          sys: {
            type: "Link",
            linkType: "Space",
            id: "ip1ar2lpov1g",
          },
        },
        id: "host",
        type: "ContentType",
        createdAt: "2023-09-18T07:26:06.167Z",
        updatedAt: "2023-09-18T07:26:06.875Z",
        environment: {
          sys: {
            id: "master",
            type: "Link",
            linkType: "Environment",
          },
        },
        publishedVersion: 1,
        publishedAt: "2023-09-18T07:26:06.875Z",
        firstPublishedAt: "2023-09-18T07:26:06.875Z",
        createdBy: {
          sys: {
            type: "Link",
            linkType: "User",
            id: "0i73tc7mLGvrymToOFVoQD",
          },
        },
        updatedBy: {
          sys: {
            type: "Link",
            linkType: "User",
            id: "0i73tc7mLGvrymToOFVoQD",
          },
        },
        publishedCounter: 1,
        version: 2,
        publishedBy: {
          sys: {
            type: "Link",
            linkType: "User",
            id: "0i73tc7mLGvrymToOFVoQD",
          },
        },
      },
      displayField: "name",
      name: "Host",
      description: "",
      fields: [
        {
          id: "name",
          name: "Name",
          type: "Symbol",
          localized: false,
          required: false,
          validations: [],
          disabled: false,
          omitted: false,
        },
        {
          id: "email",
          name: "Email",
          type: "Symbol",
          localized: false,
          required: false,
          validations: [],
          disabled: false,
          omitted: false,
        },
      ],
    },
  ],

  editorInterfaces: [
    {
      sys: {
        id: "default",
        type: "EditorInterface",
        space: {
          sys: {
            id: "ip1ar2lpov1g",
            type: "Link",
            linkType: "Space",
          },
        },
        version: 18,
        createdAt: "2023-09-17T06:00:09.148Z",
        createdBy: {
          sys: {
            id: "0i73tc7mLGvrymToOFVoQD",
            type: "Link",
            linkType: "User",
          },
        },
        updatedAt: "2023-09-17T15:21:41.691Z",
        updatedBy: {
          sys: {
            id: "0i73tc7mLGvrymToOFVoQD",
            type: "Link",
            linkType: "User",
          },
        },
        contentType: {
          sys: {
            id: "show",
            type: "Link",
            linkType: "ContentType",
          },
        },
        environment: {
          sys: {
            id: "master",
            type: "Link",
            linkType: "Environment",
          },
        },
      },
      controls: [
        {
          fieldId: "title",
          widgetId: "singleLine",
          widgetNamespace: "builtin",
        },
        {
          fieldId: "date",
          settings: {
            ampm: "12",
            format: "timeZ",
          },
          widgetId: "datePicker",
          widgetNamespace: "builtin",
        },
        {
          fieldId: "description",
          widgetId: "markdown",
          widgetNamespace: "builtin",
        },
        {
          fieldId: "guest",
          widgetId: "entryLinkEditor",
          widgetNamespace: "builtin",
        },
        {
          fieldId: "color",
          widgetId: "dropdown",
          widgetNamespace: "builtin",
        },
        {
          fieldId: "inviteLink",
          settings: {
            helpText:
              "Please don't edit this field manually. The invite will be added automatically once you publish the show",
          },
          widgetId: "urlEditor",
          widgetNamespace: "builtin",
        },
        {
          fieldId: "playbackId",
          settings: {
            helpText:
              "Please don't edit this field manually. Replace it only if the show is pre-recorded",
          },
          widgetId: "singleLine",
          widgetNamespace: "builtin",
        },
        {
          fieldId: "roomId",
          widgetId: "singleLine",
          widgetNamespace: "builtin",
        },
        {
          fieldId: "streamId",
          widgetId: "singleLine",
          widgetNamespace: "builtin",
        },
        {
          fieldId: "isRecording",
          widgetId: "boolean",
          widgetNamespace: "builtin",
        },
        {
          fieldId: "multistreamShow",
          settings: {
            helpText:
              "Please add multistream targets with stream key, rtmp-url/stream-key",
          },
          widgetId: "tagEditor",
          widgetNamespace: "builtin",
        },
      ],
    },
    {
      sys: {
        id: "default",
        type: "EditorInterface",
        space: {
          sys: {
            id: "ip1ar2lpov1g",
            type: "Link",
            linkType: "Space",
          },
        },
        version: 16,
        createdAt: "2023-09-17T06:00:09.825Z",
        createdBy: {
          sys: {
            id: "0i73tc7mLGvrymToOFVoQD",
            type: "Link",
            linkType: "User",
          },
        },
        updatedAt: "2023-09-17T14:25:00.104Z",
        updatedBy: {
          sys: {
            id: "0i73tc7mLGvrymToOFVoQD",
            type: "Link",
            linkType: "User",
          },
        },
        contentType: {
          sys: {
            id: "guest",
            type: "Link",
            linkType: "ContentType",
          },
        },
        environment: {
          sys: {
            id: "master",
            type: "Link",
            linkType: "Environment",
          },
        },
      },
      controls: [
        {
          fieldId: "name",
          widgetId: "singleLine",
          widgetNamespace: "builtin",
        },
        {
          fieldId: "image",
          widgetId: "assetLinkEditor",
          widgetNamespace: "builtin",
        },
        {
          fieldId: "imageNoBackground",
          widgetId: "assetLinkEditor",
          widgetNamespace: "builtin",
        },
        {
          fieldId: "twitterHandle",
          widgetId: "singleLine",
          widgetNamespace: "builtin",
        },
        {
          fieldId: "otherLink",
          widgetId: "singleLine",
          widgetNamespace: "builtin",
        },
        {
          fieldId: "email",
          widgetId: "singleLine",
          widgetNamespace: "builtin",
        },
      ],
    },
    {
      sys: {
        id: "default",
        type: "EditorInterface",
        space: {
          sys: {
            id: "ip1ar2lpov1g",
            type: "Link",
            linkType: "Space",
          },
        },
        version: 12,
        createdAt: "2023-09-17T06:32:01.086Z",
        createdBy: {
          sys: {
            id: "0i73tc7mLGvrymToOFVoQD",
            type: "Link",
            linkType: "User",
          },
        },
        updatedAt: "2023-09-17T14:00:52.106Z",
        updatedBy: {
          sys: {
            id: "0i73tc7mLGvrymToOFVoQD",
            type: "Link",
            linkType: "User",
          },
        },
        contentType: {
          sys: {
            id: "configuration",
            type: "Link",
            linkType: "ContentType",
          },
        },
        environment: {
          sys: {
            id: "master",
            type: "Link",
            linkType: "Environment",
          },
        },
      },
      controls: [
        {
          fieldId: "brandName",
          widgetId: "singleLine",
          widgetNamespace: "builtin",
        },
        {
          fieldId: "brandWebsite",
          widgetId: "singleLine",
          widgetNamespace: "builtin",
        },
        {
          fieldId: "brandLogo",
          widgetId: "assetLinkEditor",
          widgetNamespace: "builtin",
        },
        {
          fieldId: "brandColor",
          widgetId: "singleLine",
          widgetNamespace: "builtin",
        },
        {
          fieldId: "baseUrl",
          widgetId: "singleLine",
          widgetNamespace: "builtin",
        },
        {
          fieldId: "twitterHandle",
          widgetId: "singleLine",
          widgetNamespace: "builtin",
        },
        {
          fieldId: "lensHandle",
          widgetId: "singleLine",
          widgetNamespace: "builtin",
        },
        {
          fieldId: "discordServer",
          widgetId: "singleLine",
          widgetNamespace: "builtin",
        },
        {
          fieldId: "title",
          widgetId: "singleLine",
          widgetNamespace: "builtin",
        },
        {
          fieldId: "description",
          widgetId: "singleLine",
          widgetNamespace: "builtin",
        },
        {
          fieldId: "videos",
          widgetId: "assetLinksEditor",
          widgetNamespace: "builtin",
        },
        {
          fieldId: "upcomingTitle",
          widgetId: "singleLine",
          widgetNamespace: "builtin",
        },
        {
          fieldId: "upcomingDescription",
          widgetId: "singleLine",
          widgetNamespace: "builtin",
        },
        {
          fieldId: "previousTitle",
          widgetId: "singleLine",
          widgetNamespace: "builtin",
        },
        {
          fieldId: "previousDescription",
          widgetId: "singleLine",
          widgetNamespace: "builtin",
        },
      ],
    },
    {
      sys: {
        id: "default",
        type: "EditorInterface",
        space: {
          sys: {
            id: "ip1ar2lpov1g",
            type: "Link",
            linkType: "Space",
          },
        },
        version: 2,
        createdAt: "2023-09-18T07:26:06.986Z",
        createdBy: {
          sys: {
            id: "0i73tc7mLGvrymToOFVoQD",
            type: "Link",
            linkType: "User",
          },
        },
        updatedAt: "2023-09-18T07:26:08.021Z",
        updatedBy: {
          sys: {
            id: "0i73tc7mLGvrymToOFVoQD",
            type: "Link",
            linkType: "User",
          },
        },
        contentType: {
          sys: {
            id: "host",
            type: "Link",
            linkType: "ContentType",
          },
        },
        environment: {
          sys: {
            id: "master",
            type: "Link",
            linkType: "Environment",
          },
        },
      },
      controls: [
        {
          fieldId: "name",
          widgetId: "singleLine",
          widgetNamespace: "builtin",
        },
        {
          fieldId: "email",
          widgetId: "singleLine",
          widgetNamespace: "builtin",
        },
      ],
    },
  ],

  webhooks: [
    {
      name: "Create stream and room",
      url: `${APIKeys.BASE_URL}/api/stream/create`,
      httpBasicUsername: null,
      topics: ["Entry.create"],
      filters: [
        {
          equals: [
            {
              doc: "sys.contentType.sys.id",
            },
            "show",
          ],
        },
      ],
      transformation: null,
      active: true,
      sys: {
        type: "WebhookDefinition",
        id: "0EoksmrGw22JEYQEvQZryG",
        version: 3,
        space: {
          sys: {
            type: "Link",
            linkType: "Space",
            id: "ip1ar2lpov1g",
          },
        },
        createdBy: {
          sys: {
            type: "Link",
            linkType: "User",
            id: "0i73tc7mLGvrymToOFVoQD",
          },
        },
        createdAt: "2023-09-17T06:00:22Z",
        updatedBy: {
          sys: {
            type: "Link",
            linkType: "User",
            id: "0i73tc7mLGvrymToOFVoQD",
          },
        },
        updatedAt: "2023-09-17T15:27:07Z",
      },
      headers: [],
    },
    {
      name: "Save multistream and Invite user",
      url: `${APIKeys.BASE_URL}/api/multistream/create`,
      httpBasicUsername: null,
      topics: ["Entry.publish"],
      filters: [
        {
          equals: [
            {
              doc: "sys.contentType.sys.id",
            },
            "show",
          ],
        },
      ],
      transformation: null,
      active: true,
      sys: {
        type: "WebhookDefinition",
        id: "2onkBiXVkkqJxRoghLNo5V",
        version: 1,
        space: {
          sys: {
            type: "Link",
            linkType: "Space",
            id: "ip1ar2lpov1g",
          },
        },
        createdBy: {
          sys: {
            type: "Link",
            linkType: "User",
            id: "0i73tc7mLGvrymToOFVoQD",
          },
        },
        createdAt: "2023-09-17T15:25:07Z",
        updatedBy: {
          sys: {
            type: "Link",
            linkType: "User",
            id: "0i73tc7mLGvrymToOFVoQD",
          },
        },
        updatedAt: "2023-09-17T15:26:57Z",
      },
      headers: [],
    },
  ],
};

export default content;
