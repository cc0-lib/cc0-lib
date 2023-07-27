"use client";

type CopyToClipboardProps = {
  data: Item;
};

const CopyToClipboard = ({ data }: CopyToClipboardProps) => {
  const copy = async () => {
    try {
      console.log("Copying to clipboard....");
      const img = await fetch(data?.Thumbnails[0].url);
      const imgBlob = await img.blob();

      navigator.clipboard.write([
        new ClipboardItem({
          [imgBlob.type]: imgBlob,
        }),
      ]);
      console.log("Copied");
    } catch (error) {
      console.log(error);
    }
  };

  return <button onClick={copy}>copy</button>;
};
export default CopyToClipboard;
