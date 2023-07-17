import Script from "next/script";

const ModelViewer = ({ data }) => {
  return (
    <>
      <Script
        type="module"
        crossOrigin="anonymous"
        src="https://ajax.googleapis.com/ajax/libs/model-viewer/3.1.1/model-viewer.min.js"
      ></Script>
      <model-viewer
        src={data.File}
        shadow-intensity="1"
        camera-controls
        touch-action="pan-y"
        auto-rotate
        ar
        poster={data.Thumbnails[0].url}
        style={{
          width: "auto",
          height: "60vh",

          alignSelf: "center",
        }}
      />
    </>
  );
};
export default ModelViewer;
