function preloadImages(imageUrls) {
  imageUrls.forEach((url) => {
    const img = new Image();
    img.src = url;
  });
}

const imageUrls = [
  "./assets/menu/coffee1.png",
  "./assets/menu/coffee2.png",
  "./assets/menu/coffee3.png",
  "./assets/menu/coffee4.png",
  "./assets/menu/coffee5.png",
  "./assets/menu/coffee6.png",
  "./assets/menu/coffee1-crop.png",
  "./assets/menu/coffee2-crop.png",
  "./assets/menu/coffee3-crop.png",
  "./assets/menu/coffee4-crop.png",
  "./assets/menu/coffee5-crop.png",
  "./assets/menu/coffee6-crop.png",
  "./assets/menu/prev.png",
  "./assets/menu/next.png",
  "./assets/menu/x.png",
];

window.addEventListener("load", () => {
  preloadImages(imageUrls);
});
