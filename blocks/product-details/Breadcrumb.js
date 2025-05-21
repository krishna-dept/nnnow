import { jsx as d } from "@dropins/tools/preact-jsx-runtime.js";

const Breadcrumb = () => {
    const location = window.location.pathname.replace('/', '').split("/");
    return d('div',
        {
            className: "product-breadcrumb",
            children: [
                d("ul", {
                    className: "breadcrumb-wrapper",
                    children: location.map((path, index) => d("li", {
                        className: location.length === (index + 1) ? "breadcrumb-list active" : "breadcrumb-list",
                        children: d('a', {
                            className: `breadcrumb-name`,
                            href: '/' + window.location.pathname.replace('/', '').split("/").splice(0, (index + 1)).join('/'),
                            children: path
                        })
                    })),
                }),
                d("style", {
                    children: `
                  .breadcrumb-wrapper {
                    display: flex;
                    list-style: none;
                    gap: 35px;
                    }
                .breadcrumb-list {
                    position: relative;
                    }

                .breadcrumb-list:not(:last-child)::after {
                        content: "";
                        position: absolute;
                        top: 50%;
                        right: 0;
                        transform: translate(45%, -68%);
                        width: 0;
                        height: 0;
                        margin-right: -22px;
                        padding: 7px;
                        border-bottom: 1px solid;
                        rotate: -62deg;
                    }
                .
            `})
            ]
        })
};

export { Breadcrumb, Breadcrumb as default };
