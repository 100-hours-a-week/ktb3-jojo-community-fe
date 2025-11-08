import { SERVER_URL } from "../../../api/constants/endpoint.js";
import { fetchWrapper } from "../../../api/fetchWrapper.js";
import { createListItem } from "./createListItem.js";

const list = document.getElementById("list");

document.addEventListener("DOMContentLoaded", async () => {
  const { data } = await fetchWrapper.get({
    url: SERVER_URL.ARTICLE.LIST({ currentPage: 0 }),
    onSuccess: (data) => console.log(data),
  });

  const { items: articles } = data;

  const listItems = articles.map(createListItem);
  listItems.forEach((element) => {
    list.appendChild(element);
  });
});
