const getLikedItems = () => {
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

export default getLikedItems;
