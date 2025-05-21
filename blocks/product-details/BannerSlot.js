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
        src: "../../images/pdp_desktop_1.webp",
        alt: "BannerImage",
        width: 384,
        height: 202
      })
    })
  });
};

export { PromotionBanner, PromotionBanner as default };
