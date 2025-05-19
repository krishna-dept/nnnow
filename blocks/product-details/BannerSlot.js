import { jsx as d } from "@dropins/tools/preact-jsx-runtime.js";

const PromotionBanner = () => {
  return d("div", {
    className: "nw-pdp-bannerslotdesktoponly",
    children: d("a", {
      href: "/products",
      target: "_self",
      className: "nwc-anchortag",
      children: d("img", {
        className: "nwc-img nw-pdpbannerslot",
        src: "https://static.nnnow.com/client/assets/images/pdp/pdp_desktop_1.jpg",
        alt: "BannerImage"
      })
    })
  });
};

export { PromotionBanner, PromotionBanner as default };
