import { jsx as d, jsxs as D } from "@dropins/tools/preact-jsx-runtime.js";

const SnapmintWidget = () => {
  return D("div", {
    className: "nw-snapmint-text",
    children: [
      d("link", {
        href: "https://fonts.googleapis.com/css?family=Inter",
        rel: "stylesheet"
      }),
      d("style", {
        children: `.snap-txt-logo{max-width:67px!important}.snap-emi-inst{color:#000!important;letter-spacing:normal}.snap-emi-inst b{font-weight:700!important}img.info-img{position:relative!important;top:-1px!important}.snap-emi-inst span,.snap-emi-inst img,.snap-emi-slogan span,.snap-emi-slogan img{display:inline-block!important;vertical-align:middle!important}.snap-emi-inst img{margin-left:3px!important}.snap-emi-slogan{font-family:Inter!important;font-size:12px!important;line-height:13px!important;color:#888!important;padding-bottom:10px!important}.snap-emi-slogan img{margin-left:5px!important}.snap_emi_txt{margin-left:0;letter-spacing:normal;text-align:left;width:max-content;padding:0 7px 0;position:relative;margin-bottom:5px;background:#fff;border:1.131px solid #000;border-radius:6.8596px;margin:-25px 0 -3px;cursor:pointer}@media (max-width:767px){.snap_emi_txt{margin:0px 0 15px}}.snap_emi_txt .snap-emi-slogan{display:flex!important;width:100%!important;color:#000!important;font-family:inherit!important;padding-bottom:6px!important;-webkit-text-size-adjust:83%;align-items:center;justify-content:space-between}.snap_emi_txt .snap_widget_powered_text img{width:67px!important;margin-right:3px;margin-top:0}.snap-emi-slogan div .snap_buy_now_btn{width:70px!important;margin-left:1px!important}.snap-emi-slogan img.snap_upi_widget_img{margin-bottom:-3px;margin-left:1px!important;width:36px;max-width:90px}span.snap_emi_slogan_text{font-size:13px!important;display:flex!important;align-items:center;margin-bottom:-3px}span.snap_emi_slogan_text b{margin:0 3px}.snap_emi_txt .snap-emi-inst{-webkit-text-size-adjust:89%;font-size:15.5px;font-weight:500!important;font-family:inherit!important;display:flex;align-items:center;padding-bottom:3px;line-height:19px!important;padding-top:10px!important}.snap_grey_dot{background:#343434;width:5px;height:5px;border-radius:50%;margin-left:5px;margin-right:0}b#dp{color:#000;font-weight:700!important;background:#c1f6b4;border-radius:5px;padding:0 6px}.snap-emi-slogan img.snap_upi_widget_imgd{margin-bottom:-1px;margin-left:0!important;width:35px;margin-right:3px}.snap_first_line_dot{background-color:#131313;width:1px;height:16px;margin:0 3px 0 6px}`
      }),
      D("div", {
        className: "snap_emi_txt",
        children: [
          D("div", {
            className: "snap-emi-inst",
            onclick: () => snmpt_n("on_page", 1799),
            children: [
              d("span", {
                className: "snap_cashback_line",
                children: "Flat 10% cashback up to ₹650"
              }),
              d("span", {
                className: "snap_emi_white_month_text first_line_snmpt",
                children: ["or ", d("b", { children: "3 " }), "Monthly Payments of"]
              }),
              d("b", {
                id: "dp",
                className: "dp-class",
                children: "₹600"
              }),
              d("span", { className: "snap_first_line_dot" }),
              d("img", {
                alt: "snapmint_widget_logo",
                src: "https://assets.snapmint.com/assets/merchant/snapmint_logo_black_text.svg",
                className: "snap_merchant_logo_add_widget"
              })
            ]
          }),
          D("div", {
            className: "snap-emi-slogan",
            onclick: () => snmpt_n("on_page", 1799),
            children: [
              D("span", {
                children: D("span", {
                  className: "snap_emi_slogan_text",
                  children: [
                    d("img", {
                      src: "https://preemi.snapmint.com/assets/whitelable/UPI-Logo-vector%201.svg",
                      className: "snap_upi_widget_imgd"
                    }),
                    d("span", {
                      className: "non_snmot",
                      children: "& Cards Accepted"
                    }),
                    d("span", {children: " | " }),
                    d("b", { children: "0 " }),
                    d("span", { className: "non_snmpt", children: " Extra Cost" })
                  ]
                })
              }),
              d("span", {}),
              d("div", {
                children: d("img", {
                  alt: "snapmint_widget_snap_buy_now_btn",
                  src: "https://assets.snapmint.com/assets/merchant/buyonemi_nnnow_btn.png",
                  className: "snap_buy_now_btn"
                })
              })
            ]
          })
        ]
      }),
      d("span", {
        className: "snapmint_lowest_emi_value",
        style: "display:none",
        "data-snapmint-price": "1799",
        "data-snapmint-merchant_id": "2435",
        "data-snapmintpage": "products_page",
        children: "?order_value=1799&subvention=undefined&udf1=&skuid=undefined"
      })
    ]
  });
};

export { SnapmintWidget, SnapmintWidget as default };
