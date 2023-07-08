export const slugify = (text) => {
  return text
    .toString()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
};

export const shuffle = (array) => {
  return array.sort(() => Math.random() - 0.5);
};

export const handleENSLeaderboard = (sourceData) => {
  //count based on duplicate ENS
  const ensList = Array.from(
    new Set(
      sourceData
        .map((item) => {
          if (!item.ENS) return null;
          return item.ENS;
        })
        .flat()
        .filter((e) => e)
    )
  );

  const ensCount = ensList.map((ens) => {
    const count = sourceData.filter((item) => {
      if (!item.ENS) return false;
      return item.ENS.includes(ens);
    }).length;
    return { ens, count };
  });

  const sortedEnsCount = ensCount.sort((a, b) => {
    return b.count - a.count;
  });

  const topEns = sortedEnsCount.slice(0, 10);

  const topEnsData = topEns.map((ens) => {
    const data = sourceData.filter((item) => {
      if (!item.ENS) return false;
      return item.ENS.includes(ens.ens);
    });

    return { ens: ens.ens, data: data };
  });

  return {
    top10: topEns,
    full: sortedEnsCount,
  };
};

export const shortDomainName = (source) => {
  const domain = source
    .replace("http://", "")
    .replace("https://", "")
    .replace("www.", "")
    .split("/")[0];

  return domain;
};

export const getLikedItems = () => {
  if (typeof window === "undefined") return [];
  const localStorage = window.localStorage;
  // console.log(localStorage);
  //get from local storage, filter from key that has sentiment and value of like
  const sentimentItems = Object.keys(localStorage).filter((key) => {
    return key.includes("sentiment");
  });

  const likedItems = sentimentItems
    .filter((key) => {
      const isLiked = JSON.parse(localStorage.getItem(key));
      return isLiked === "like";
    })
    .map((key) => {
      //remove -sentiment from key
      const slug = key.replace("-sentiment", "");
      //get the title from local storage
      return slug;
    });

  return likedItems;
};

export const getAllItems = async () => {
  const res = await fetch(
    "https://notion-api.splitbee.io/v1/table/872d317db9c64d3d88195b217cb3dc2f",
    {
      next: {
        revalidate: 60,
      },
    }
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data from DB");
  }
  const data = await res.json();

  return data;
};
