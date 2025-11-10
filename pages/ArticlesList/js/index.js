import { SERVER_URL } from "../../../api/constants/endpoint.js";
import { fetchWrapper } from "../../../api/fetchWrapper.js";
import { PATHS } from "../../../shared/constants/paths.js";
import { createListItem } from "./createListItem.js";
import { Header } from "../../../shared/components/Header.js";

const list = document.getElementById("list");
const btnCreateArticle = document.getElementById("btnCreateArticle");

document.addEventListener("DOMContentLoaded", async () => {
  const header = await Header();
  header.setAttachDomToRoot("header");

  const { data } = await fetchWrapper.get({
    url: SERVER_URL.ARTICLE.LIST({ currentPage: 0 }),
    onSuccess: (data) => console.log(data),
  });

  const { items: articles } = data;

  const listItems = articles.map((article) =>
    createListItem(article, "list-item-template")
  );

  listItems.forEach((element) => {
    list.appendChild(element);
  });
});

btnCreateArticle.addEventListener("click", () => {
  window.location.href = PATHS.ARTICLE_EDITOR.ABSOLUTE;
});
