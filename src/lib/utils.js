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
