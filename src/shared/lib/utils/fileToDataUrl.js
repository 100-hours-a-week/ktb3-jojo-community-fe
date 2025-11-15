/**
 * @description 이미지 서버에서 저장하기 전에 사용하는 임시 유틸.
 * @param {} file
 * @returns
 */
export function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
  });
}
