import { jsx as d, jsxs as D } from "@dropins/tools/preact-jsx-runtime.js";

const ActionIcons = () => {
  return D("div", {
    className: "action-icons",
    children: [
      // Favorite Button
      D("div", {
        className: "icon-button",
        children: [
          d("div", { className: "circle favorite", children: "♡" }),
          d("div", { className: "label", children: "FAVORITE" }),
        ],
      }),

      // Share Button
      D("div", {
        className: "icon-button",
        children: [
          d("div", {
            className: "circle share",
            children: d("img", { src: "../../icons/share.svg", width:'30px', height:'30px', alt: "Share icon" }),
          }),
          d("div", { className: "label", children: "SHARE" }),
        ],
      }),

      // Style block
      d("style", {
        children: `
          .action-icons {
            display: flex;
            gap: 32px;
            font-family: sans-serif;
          }

          .icon-button {
            display: flex;
            flex-direction: column;
            align-items: center;
          }

        
          .circle {
            width: 48px;
            height: 48px;
            border: 2px solid;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 24px;
            margin-bottom: 6px;
          }

          .circle.share img{
            width : 24px
          }

          .favorite {
            border-color: hotpink;
            color: hotpink;
          }


          .share {
            border-color: deepskyblue;
            color: deepskyblue;
          }

          .label {
            font-size: 0.85em;
            font-weight: bold;
          }
        `,
      }),
    ],
  });
};

export { ActionIcons, ActionIcons as default };
