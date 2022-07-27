async function getNews() {
  const data = await fetch(
    "https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty"
  );
  const stories = await data.json();
  const storyArray = await Promise.all(
    stories.slice(0, 100).map(async (story) => {
      const storyData = await fetch(
        `https://hacker-news.firebaseio.com/v0/item/${story}.json?print=pretty`
      );
      const storyObject = await storyData.json();
      return storyObject;
    })
  );
  const storyList = document.getElementById("story-list");
  storyArray.forEach((story) => {
    const storyElement = document.createElement("li");
    storyElement.innerHTML = `<a href="${story.url}">${story.title}</a>`;
    storyList.appendChild(storyElement);
  });
}

getNews();
