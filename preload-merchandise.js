function preloadImages(imageUrls) {
  imageUrls.forEach((url) => {
    const img = new Image();
    img.src = url;
  });
}

const imageUrls = [
  "./assets/merchandise/merchandise1.png",
  "./assets/merchandise/merchandise2.png",
  "./assets/merchandise/merchandise3.png",
  "./assets/merchandise/merchandise4.png",
  "./assets/merchandise/merchandise5.png",
  "./assets/merchandise/merchandise6.png",
  "./assets/merchandise/merchandise1-crop.png",
  "./assets/merchandise/merchandise2-crop.png",
  "./assets/merchandise/merchandise3-crop.png",
  "./assets/merchandise/merchandise4-crop.png",
  "./assets/merchandise/merchandise5-crop.png",
  "./assets/merchandise/merchandise6-crop.png",
];

window.addEventListener("load", () => {
  preloadImages(imageUrls);
});
