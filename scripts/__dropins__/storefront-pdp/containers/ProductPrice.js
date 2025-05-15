/*! Copyright 2025 Adobe
All Rights Reserved. */
import { jsxs as D, jsx as r } from "@dropins/tools/preact-jsx-runtime.js";
import { useState as d, useEffect as L } from "@dropins/tools/preact-compat.js";
import { classes as s, VComponent as f, toLanguageTag as g } from "@dropins/tools/lib.js";
import "@dropins/tools/components.js"; // Empty CSS
import { P } from "../chunks/PriceRange.js";
import "@dropins/tools/preact.js";
import { useText as b } from "@dropins/tools/i18n.js";
import { events as _ } from "@dropins/tools/event-bus.js";
import { g as h } from "../chunks/getFetchedProductData.js";
import { c as v } from "../chunks/isProductConfigurationValid.js";
import "../fragments.js";
import "@dropins/tools/fetch-graphql.js";
import "../chunks/getProductConfigurationValues.js";

// Price component that renders regular and special price
const S = ({ className: t, price: i, specialPrice: o, priceOff: p, children: n, ...e }) => {
    const c = b("PDP.Product.RegularPrice.label").label;
    const a = b("PDP.Product.SpecialPrice.label").label;

    return D("div", {
        ...e,
        className: s(["pdp-price", t]),
        children: [
            i && r(f, {
                node: i,
                className: s(["pdp-price__amount-regular", "pdp-price__amount--grey"]),
                "aria-label": c,
                role: "text"
            }),
            o && r(f, {
                node: o,
                className: s(["pdp-price__amount-special", "pdp-price__amount"]),
                "aria-label": a,
                role: "text"
            }),
            p && r(f, {
                node: p,
                className: "pdf-price_ammount-off",
                role: "text"
            })
        ]
    });
};

// Main ProductPrice component
const N = ({ initialData: t = null, children: i, ...o }) => {
    const { defaultLocale: n = "en-US" } = v.getConfig();

    const [e, c] = d(t);     // product price data
    const [a, x] = d(n);     // locale

    // Setup event listeners on mount and cleanup on unmount
    L(() => {
        const l = _.on("pdp/data", c);     // listens to product data
        const p = _.on("locale", x);       // listens to locale changes

        return () => {
            l?.off();
            p?.off();
        };
    }, []);

    // Render prices if data is available
    return e
        ? r(S, {
            ...o,
            specialPrice:
                e.prices?.visible
                    ? r(P, {
                        ...e.prices.final,
                        locale: g(a)
                    })
                    : void 0,
            price:
                e.prices?.visible &&
                    e.prices.regular &&
                    e.prices.final.amount !== e.prices.regular.amount
                    ? r(P, {
                        ...e.prices.regular,
                        locale: g(a)
                    })
                    : void 0,
            priceOff:
                e.prices?.visible &&
                    e.prices.regular &&
                    e.prices.final &&
                    e.prices.final.amount < e.prices.regular.amount
                    ? r("span", {
                        className: "pdp-price__percent-off",
                        children: `(${Math.round(
                            ((e.prices.regular.amount - e.prices.final.amount) /
                                e.prices.regular.amount) *
                            100
                        )}% Off)`
                    }) : void 0,
        })
        : null;
};

// Attach initial data fetching function
N.getInitialData = h;

export { N as ProductPrice, N as default };
