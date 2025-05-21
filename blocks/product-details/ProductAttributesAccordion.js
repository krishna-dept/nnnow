import { jsxs, jsx } from "@dropins/tools/preact-jsx-runtime.js";
import { useState, useEffect } from "@dropins/tools/preact-compat.js";
import { classes } from "@dropins/tools/lib.js";
import { events } from "@dropins/tools/event-bus.js";
import { i as isDate, t as toLocaleDateString } from "@dropins/storefront-pdp/chunks/date.js";
import { g as getFetchedProductData } from "@dropins/storefront-pdp/chunks/getFetchedProductData.js";
import { useText } from "@dropins/tools/i18n.js";
import { c as config } from "@dropins/storefront-pdp/chunks/isProductConfigurationValid.js";

const tabLabels = ["Attributes", "Tommy Hilfiger", "About"];

const ProductAttributesTabs = ({ initialData = null, ...props }) => {
  const { defaultLocale = "en-US" } = config.getConfig();
  const labelText = useText("PDP.Product.Details.label").label;

  const [locale, setLocale] = useState(defaultLocale);
  const [productData, setProductData] = useState(initialData);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    const dataListener = events.on("pdp/data", setProductData);
    const localeListener = events.on("locale", setLocale);
    return () => {
      dataListener?.off?.();
      localeListener?.off?.();
    };
  }, []);
  const renderTabContent = () => {
    if (activeTab === 0 && Array.isArray(productData?.attributes)) {
      const validAttributes = productData.attributes.filter(
        ({ value }) => Array.isArray(value) ? value.length > 0 : !!value
      );

      return jsxs("div", {
        className: "pdp-attributes-list",
        children:[ validAttributes.map(({ label, value }, idx) =>
          jsxs("div", {
            className: "pdp-attributes-section",
            children: [
              jsx("h4", {
                className: "pdp-attributes-header",
                children: label
              }),
              jsx("ul", {
                className: "pdp-attributes-values",
                children: Array.isArray(value)
                  ? value.map((item, i) =>
                    jsx("li", {
                      children: item
                    }, i)
                  )
                  : jsx("li", { children: value })
              })
            ]
          }, idx)
        ),
        jsxs("div",{
          className : "description",
          children : productData.description.replace(/<\/?[^>]+>/g, '')
        })
      ]
      });
    }

    if (activeTab === 1) {
      return jsx("p", { children: "Tommy Hilfiger is a globally recognized premium lifestyle brand." });
    }

    if (activeTab === 2) {
      return jsx("p", { children: "This product is curated with quality and sustainability in mind." });
    }

    return null;
  };

  return productData
    ? jsxs("div", {
        ...props,
        className: classes(["pdp-tabs", props.className]),
        children: [
          // ✅ Background image block added here
          jsxs("div", {
            className: "pdp-tabs-image-container",
            children: [
              jsx("div", {
                className: "pdp-tabs-image",
                style: {
                  // backgroundImage: 'url("https://cdn15.nnnow.com/web-images/large/styles/GSLV6UU6E01/1685437682320/1.jpg")'
                }
              }),
              jsx("div", {
                className: "pdp-tabs-image",
                style: {
                  // backgroundImage: 'url("https://cdn11.nnnow.com/web-images/large/styles/GSLV6UU6E01/1685437682316/2.jpg")'
                }
              })
            ]
          }),

          // Tabs Navigation
          jsxs("div", {
            className: "pdp-tabs-nav",
            children: tabLabels.map((label, idx) =>
              jsx("button", {
                className: classes(["pdp-tab", activeTab === idx && "active"]),
                onClick: () => setActiveTab(idx),
                children: label
              }, idx)
            )
          }),

          // Tab Content
          jsx("div", {
            className: "pdp-tab-content",
            children: renderTabContent()
          })
        ]
      })
    : null;
};

ProductAttributesTabs.getInitialData = getFetchedProductData;

export { ProductAttributesTabs, ProductAttributesTabs as default };
