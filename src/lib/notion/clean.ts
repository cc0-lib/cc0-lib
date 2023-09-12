export const convertToItem = (items: any) => {
  const filteredResults = items.filter((item) => {
    const isValid = item.properties && item.properties.Title;
    //   item.properties.Description &&
    //     item.properties.Type &&
    //     item.properties.Filetype &&
    //     item.properties.Thumbnails &&
    //     item.properties.Thumbnails.files &&
    //     item.properties.Thumbnails.files[0] &&
    //     item.properties.Thumbnails.files[0].file &&
    //     item.properties.Thumbnails.files[0].file.url &&
    //     item.properties.Source &&
    //     item.properties.Status &&
    //     item.properties.SubmissionStatus &&
    //     item.properties.Tags &&
    //     item.properties.ENS &&
    //     item.properties.ID &&
    //     item.properties["Social Link"] &&
    //     item.properties.File;
    //   if (!isValid) {
    //     console.log("Invalid item:", item);
    //   }
    return isValid;
  });

  const result = filteredResults.map((item) => {
    return {
      id: item.id,
      Title:
        item.properties.Title.title.length > 0
          ? item.properties.Title.title[0].plain_text
          : "",
      Description:
        item.properties.Description.rich_text.length > 0
          ? item.properties.Description.rich_text[0].plain_text
          : "",
      Type: item.properties.Type.select.name ?? "",
      Filetype: item.properties.Filetype.select.name ?? "",
      Thumbnails: [
        {
          url: item.properties.Thumbnails.files[0].file?.url,
          name: "",
          rawUrl: item.properties.Thumbnails.files[0].file?.url,
        },
      ],
      Source:
        item.properties.Source.rich_text.length > 0
          ? item.properties.Source.rich_text[0].plain_text
          : "",
      Status: item.properties.Status.select.name ?? "",
      SubmissionStatus: item.properties.SubmissionStatus.select.name ?? "",
      Tags:
        item.properties.Tags.multi_select.length > 0
          ? item.properties.Tags.multi_select.map((tag) => tag.name)
          : [],
      ENS:
        item.properties.ENS.rich_text.length > 0
          ? item.properties.ENS.rich_text[0].plain_text
          : "",
      ID: item.properties.ID.number,
      "Social Link":
        item.properties["Social Link"].rich_text.length > 0
          ? item.properties["Social Link"].rich_text[0].plain_text
          : "",
      File: item.properties.File.url || "",
    };
  });
  return result;
};
