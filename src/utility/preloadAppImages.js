export const appImages = {
  prev1: "https://img.youtube.com/vi/Dv4Zp_FG0qg/sddefault.jpg",
  prev2: "https://img.youtube.com/vi/10XR67NQcAc/sddefault.jpg",
  prev3: "https://img.youtube.com/vi/B-rnM-MwRHY/sddefault.jpg",
  prev4: "https://img.youtube.com/vi/hfjHJneVonE/sddefault.jpg",
  prev5: "https://img.youtube.com/vi/UiEGVYOruLk/sddefault.jpg",
  bg1: "https://112.ua/uploads/950x550_45_main-v1739051678.webp.png",
  bg2: "https://numb3r5s.wordpress.com/wp-content/uploads/2014/05/ruslana.jpg",
  bg3: "https://www.escradio.com/wp-content/uploads/2016/05/esc-gewinner-2016-ukraine.jpg",
  bg4: "https://wiwibloggs.com/wp-content/uploads/2016/11/verka-serduchka.jpg",
  bg5: "https://www.machallconcerts.com/wp-content/uploads/2022/09/KALUSH-ORCHESTRA-IMG_8604-crop-1080x650.jpg",
};

export const preloadAppImages = (imagePaths) => {
  return Promise.all(
    imagePaths.map((src) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = resolve;
        img.onerror = () => {
          console.error(`Failed to preload image: ${src}`);
          reject();
        };
        img.src = src;
      });
    })
  );
};

export const preloadAssets = async () => {
  try {
    // Preload images
    await preloadAppImages(Object.values(appImages));
    console.log("All images preloaded successfully");
  } catch (error) {
    console.error("Error preloading images:", error);
  }
};
