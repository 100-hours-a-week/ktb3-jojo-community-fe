//TODO: 나누기

// const dummyImg = "https://dummyimage.com/300";

export function createListItem(post) {
  const { articleId, title: postTitle, createdAt, author, status } = post;
  const { id: authorId, nickname, profileImageUrl } = author;
  const { likes, comments, views } = status;

  const listItem = document.createElement("div");
  listItem.className = "list-item";
  listItem.setAttribute("id", articleId); //TODO: click 이벤트를 등록?

  const header = document.createElement("div");
  header.className = "list-item-header";

  const title = document.createElement("div");
  title.className = "list-item-title";
  title.textContent = postTitle;

  const meta = document.createElement("div");
  meta.className = "list-item-meta";

  const metaStats = document.createElement("div");
  metaStats.textContent = `좋아요 ${likes} 댓글 ${comments} 조회수 ${views}`;

  const metaDate = document.createElement("div");
  metaDate.textContent = createdAt;

  meta.append(metaStats, metaDate);
  header.append(title, meta);

  const footer = document.createElement("div");
  footer.className = "list-item-footer";
  footer.setAttribute("id", authorId); //TODO: click 이벤트를 등록?

  const avatar = document.createElement("div");
  avatar.className = "list-item-avatar"; //TODO: image 넣기

  const content = document.createElement("div");
  content.className = "list-item-content";
  content.textContent = nickname;

  footer.append(avatar, content);

  listItem.append(header, footer);

  return listItem;
}
