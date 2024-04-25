"use client";

type CopyToClipboardProps = {
  data: Item;
};

const CopyToClipboard = ({ data }: CopyToClipboardProps) => {
  const copy = async () => {
    try {
      console.log("Copying to clipboard....");
      const img = await fetch(data?.ThumbnailURL as string);
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

  return (
    <button aria-label="Copy" onClick={copy}>
      copy
    </button>
  );
};
export default CopyToClipboard;
