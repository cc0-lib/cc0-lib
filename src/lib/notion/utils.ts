const RichTextType = (value: string) => {
  return {
    rich_text: [
      {
        type: "text",
        text: {
          content: value,
          link: null,
        },
        annotations: {
          bold: false,
          italic: false,
          strikethrough: false,
          underline: false,
          code: false,
          color: "default",
        },
        plain_text: value,
        href: null,
      },
    ],
  };
};

const SelectType = (value: string) => {
  return {
    select: {
      name: value,
    },
  };
};

const URLType = (url: string) => {
  return {
    url,
  };
};

const MultiSelectType = (values: string[]) => {
  return {
    multi_select: values.map((value) => {
      return {
        name: value,
      };
    }),
  };
};

const TitleType = (value: string) => {
  return {
    id: "title",
    type: "title",
    title: [
      {
        type: "text",
        text: {
          content: value,
          link: null,
        },
        annotations: {
          bold: false,
          italic: false,
          strikethrough: false,
          underline: false,
          code: false,
          color: "default",
        },
        plain_text: value,
        href: null,
      },
    ],
  };
};

const NumberType = (value: number) => {
  return {
    number: value,
  };
};

const richTextProps = ["Description", "Source", "ENS", "Social Link"];
const titleProps = ["Title"];
const selectProps = ["Filetype", "Status", "SubmissionStatus", "Type"];
const urlProps = ["File", "ThumbnailURL"];
const multiSelectProps = ["Tags"];
const numberProps = ["ID"];

const NotionUtils = {
  RichTextType,
  SelectType,
  URLType,
  MultiSelectType,
  TitleType,
  NumberType,
  richTextProps,
  titleProps,
  selectProps,
  urlProps,
  multiSelectProps,
  numberProps,
};

export default NotionUtils;
