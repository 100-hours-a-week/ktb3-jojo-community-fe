export function getSearchParam() {
  const url = new URL(document.location);
  console.log(url);

  return url.searchParams;
}
