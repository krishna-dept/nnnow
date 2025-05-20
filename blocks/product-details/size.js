import { jsx as d, jsxs as D } from "@dropins/tools/preact-jsx-runtime.js";
import { useState } from "@dropins/tools/preact-compat.js";
// import { useState } from "preact/hooks";

const StadSize = () => {

    const [selSize, setSelectedSize] = useState('M')
    // const setSelectedSize = (size) =>{
    //     alert(size)
    // }

    return D("div", {
        className: "std-size",
        children: [
            // Size section
            D("div", {
                className: "size-section",
                children: [
                    D("div", {
                        className: "size-label",
                        children: [
                            d("strong", { children: "STANDARD SIZE:" }),
                            d("a", { href: "#", className: "size-chart", children: "SIZE CHART" })
                        ]
                    }),
                    D("div", {
                        className: "size-options",
                        children: ["S", "M", "L", "XL", "XXL"].map(size =>
                            d("button", {
                                className: `size-box${selSize === size ? " selected" : ""}`,
                                onClick: () => setSelectedSize(size),
                                children: size
                            })
                        )
                    })
                ]
            }),

            // Color section
            D("div", {
                className: "color-section",
                children: [
                    D("div", {
                        className: "color-label",
                        children: [
                            d("strong", { children: "COLOR:" }),
                            " Dusty Olive"
                        ]
                    }),
                    d("div", {
                        className: "swatch-box",
                        style: { backgroundColor: "#8b8872" } // Dusty olive color
                    })
                ]
            }),

            // Style block
            d("style", {
                children: `
                    .std-size {
                        font-family: sans-serif;
                    }
                    .size-section, .color-section {
                        margin-bottom: 16px;
                    }
                    .size-label {
                        display: flex;
                        justify-content: space-between;
                        margin-bottom: 8px;
                        font-weight: bold;
                    }
                    .size-chart {
                        color: hotpink;
                        text-decoration: none;
                        font-size: 0.9em;
                    }
                    .size-options {
                        display: flex;
                        gap: 8px;
                    }
                    .size-box {
                        padding: 10px 16px;
                        border: 1px solid #ccc;
                        background: #fff;
                        cursor: pointer;
                        font-size: 1em;
                    }
                    .size-box.selected {
                        border: 2px solid #000;
                    }
                    .color-label {
                        margin-bottom: 8px;
                    }
                    .swatch-box {
                        width: 40px;
                        height: 40px;
                        border: 2px solid #000;
                    }
                `
            })
        ]
    });
};

export { StadSize, StadSize as default };
