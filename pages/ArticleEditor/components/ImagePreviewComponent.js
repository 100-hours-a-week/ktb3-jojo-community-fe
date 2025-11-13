import { NodeElement } from "../../../shared/lib/domHandler/NodeElementClass.js";

export const ImagePreviewComponent = ({ imageUrl, deleteImage }) => {
  const node = NodeElement(`
        <div id=${imageUrl}>
            <img class="preview-image"/>
            <button class="delete-image-preview-btn">x</button>
        </div>
        `);

  const previewImage = node.getDom().querySelector(".preview-image");
  previewImage.src = imageUrl;

  return node;
};
