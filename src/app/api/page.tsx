import Container from "@/components/ui/container";
import { endpoints } from "./endpoint";

export const generateMetadata = async () => {
  const title = `API | CC0-LIB`;
  const description = "API Documentation";
  const image = `https://cc0-lib.wtf/og.png`;
  const url = `https://cc0-lib.wtf/api`;

  return {
    title: title,
    description: description,
    image: image,
    url: url,
    type: "website",
    openGraph: {
      title: title,
      description: description,
      url: url,
      type: "website",
      images: [
        {
          url: image,
          width: 800,
          height: 400,
          alt: title,
        },
      ],
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: title,
      description: description,
      images: [image],
    },
  };
};

const APIPage = () => {
  return (
    <Container>
      <div className="focus:outline-noneation-250 focus:bg-zinc-8 peer flex w-full flex-col gap-8 bg-transparent px-4 py-16 lowercase text-white drop-shadow-md transition-all ease-linear selection:bg-zinc-800 selection:text-sec placeholder:text-zinc-600 focus:rounded-sm focus:bg-opacity-50 focus:backdrop-blur-md sm:p-16">
        <Title>cc0-lib public API</Title>
        <Description>
          cc0-lib Public API allows developers to access and retrieve data from
          our extensive library of content. With this API, you can search for
          items based on various parameters such as title, tag, type, filetype,
          and ENS.
        </Description>

        {endpoints.map((endpoint) => (
          <Endpoint
            key={endpoint.title}
            title={endpoint.title}
            endpoint={endpoint.endpoint}
            note={endpoint.note}
            queryParams={endpoint?.queryParams}
            rateLimiting={endpoint.rateLimiting}
            responseStructure={endpoint.responseStructure}
            exampleResponse={endpoint.exampleResponse}
          />
        ))}
      </div>
    </Container>
  );
};

export default APIPage;

const Title = ({ children }) => {
  return (
    <h1 className="font-rubik text-4xl text-prim dark:text-prim sm:text-6xl">
      {children}
    </h1>
  );
};

const Description = ({ children }) => {
  return <p className="w-full max-w-prose text-lg text-white">{children}</p>;
};

const Divider = () => {
  return <span className="h-4 w-full border-b-2 border-zinc-800"></span>;
};

const EndpointGET = ({ children }) => {
  return (
    <pre className="w-max max-w-prose bg-zinc-800  p-2 text-base normal-case text-white sm:p-4 sm:text-lg">
      {children}
    </pre>
  );
};

const QueryParams = ({ children }) => {
  return (
    <ul className="flex flex-col gap-2 text-sm sm:text-base">{children}</ul>
  );
};

const ResponseStructure = ({ children }) => {
  return (
    <ul className="flex flex-col gap-2 text-sm sm:text-base">{children}</ul>
  );
};

const QueryParamChild = ({ name, type, desc }) => {
  return (
    <li className="flex  flex-col gap-2 sm:flex-row sm:items-center">
      <pre className="w-max max-w-prose bg-zinc-800 text-base normal-case text-white sm:text-lg">
        {name}
      </pre>
      ({type}): {desc}
    </li>
  );
};

const ResponseStructureChild = ({ name, desc }) => {
  return (
    <li className="flex  flex-col gap-2 sm:flex-row sm:items-center">
      <pre className="w-max max-w-prose bg-zinc-800 text-base normal-case text-white sm:text-lg">
        {name}
      </pre>
      : {desc}
    </li>
  );
};

const CodeBlock = ({ children }) => {
  return (
    <pre className=" w-full max-w-prose overflow-x-auto bg-zinc-800 p-4 text-xs normal-case text-white sm:text-lg">
      {children}
    </pre>
  );
};

const Endpoint = ({
  title,
  endpoint,
  note,
  queryParams,
  rateLimiting,
  responseStructure,
  exampleResponse,
}) => {
  return (
    <>
      <Divider />
      <Title>{title}</Title>
      <EndpointGET>{endpoint}</EndpointGET>

      {queryParams && (
        <>
          <Title>query parameters</Title>
          <QueryParams>
            {queryParams.map((param) => (
              <QueryParamChild
                name={param.name}
                key={param.name}
                type={param.type}
                desc={param.desc}
              />
            ))}
          </QueryParams>
        </>
      )}
      {note && <Description>{note}</Description>}

      {rateLimiting && (
        <>
          <Title>Rate Limiting</Title>
          <Description>
            To ensure fair usage and optimal performance, the API enforces rate
            limiting. Each user is limited to {rateLimiting.req} requests per{" "}
            {rateLimiting.secs} seconds.
          </Description>
        </>
      )}

      {responseStructure && (
        <>
          <Title>Response Structure</Title>
          <ResponseStructure>
            {responseStructure.map((param) => (
              <ResponseStructureChild
                name={param.name}
                key={param.name}
                desc={param.desc}
              />
            ))}
          </ResponseStructure>
        </>
      )}

      {exampleResponse && (
        <>
          <Title>example response</Title>
          <CodeBlock>{JSON.stringify(exampleResponse, null, 2)}</CodeBlock>
        </>
      )}
    </>
  );
};
