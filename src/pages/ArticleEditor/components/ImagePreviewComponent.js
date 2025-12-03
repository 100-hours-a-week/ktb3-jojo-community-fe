import { NodeElement } from "../../../shared/lib/domHandler/NodeElementClass.js";

export const ImagePreviewComponent = ({ imageUrl, observed }) => {
  const node = NodeElement(`
        <div id=${imageUrl} class="preview-image-wrapper">
            <img class="preview-image"/>
            <button class="btn delete-image-preview-btn">x</button>
        </div>
        `);

  const previewImage = node.getDom().querySelector(".preview-image");
  previewImage.src = imageUrl;

  function deleteImage(imageUrl) {
    observed.images = observed.images.filter((data) => data != imageUrl);
  }

  node.on(".delete-image-preview-btn", "click", () => {
    deleteImage(imageUrl);
  });

  return node;
};
