export const endpoints = [
  {
    title: "main endpoint",
    endpoint: "GET /api/data",
    note: "This endpoint will return all items in the library if no query parameters are specified. only a single query parameter can be used at a time in a request.",
    queryParams: [
      {
        name: "title",
        type: "string",
        desc: "Retrieve items with the specified title.",
      },
      {
        name: "tag",
        type: "string",
        desc: "Retrieve items with the specified tag.",
      },
      {
        name: "type",
        type: "string",
        desc: "Retrieve items with the specified type.",
      },
      {
        name: "filetype",
        type: "string",
        desc: "Retrieve items with the specified file type.",
      },
      {
        name: "ens",
        type: "string",
        desc: "Retrieve items with the specified ENS.",
      },
    ],
    rateLimiting: {
      req: 10,
      secs: 10,
    },
    responseStructure: [
      {
        name: "query",
        desc: "The query parameter used in the request.",
      },
      {
        name: "count",
        desc: "The number of items returned.",
      },
      {
        name: "types",
        desc: "Unique types of items.",
      },
      {
        name: "fileTypes",
        desc: "Unique file types of items.",
      },
      {
        name: "tags",
        desc: "Unique tags associated with items.",
      },
      {
        name: "date",
        desc: "Current date and time.",
      },
      {
        name: "data",
        desc: "An array of the actual items returned.",
      },
    ],
    exampleResponse: {
      query: {
        title: "example",
      },
      count: 1,
      types: ["type1"],
      fileTypes: ["fileType1"],
      tags: ["tag1", "tag2", "tag3"],
      date: "2023-07-12T05:15:47Z",
      data: [
        {
          id: "data1",
          Source: "https://example.com",
          Type: "type1",
          "Social Link": "https://twisder.com/example",
          ENS: "example.eth",
          Description: "Sample description",
          Thumbnails: [
            {
              name: "sample.svg",
              url: "https://sample.com/sample.svg",
              rawUrl: "https://sample.com/sample.svg",
            },
          ],
          Tags: ["tag1", "tag2", "tag3"],
          ID: 370,
          Title: "sample title",
        },
      ],
    },
  },
  {
    title: "random endpoint",
    endpoint: "GET /api/random",
    note: "This random endpoint will return a random item from the library. no query parameters needed.",
    rateLimiting: {
      req: 5,
      secs: 10,
    },
    responseStructure: [
      {
        name: "image",
        desc: "The image url of the random item returned.",
      },
      {
        name: "data",
        desc: "The actual item returned.",
      },
    ],
    exampleResponse: {
      image: {
        url: "https://sample.com/sample.svg",
      },
      data: {
        id: "data1",
        Source: "https://example.com",
        Type: "type1",
        "Social Link": "https://twisder.com/example",
        ENS: "example.eth",
        Description: "Sample description",
        Thumbnails: [
          {
            name: "sample.svg",
            url: "https://sample.com/sample.svg",
            rawUrl: "https://sample.com/sample.svg",
          },
        ],
        Tags: ["tag1", "tag2", "tag3"],
        ID: 370,
        Title: "sample title",
      },
    },
  },
];
