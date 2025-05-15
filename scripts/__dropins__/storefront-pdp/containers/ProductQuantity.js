/*!
 * Copyright 2025 Adobe
 * All Rights Reserved.
 */

import { jsx as d, jsxs as J } from "@dropins/tools/preact-jsx-runtime.js";
import { useState as useState, useEffect as useEffect } from "@dropins/tools/preact-compat.js";
import { classes as classes } from "@dropins/tools/lib.js";
import { Picker } from "@dropins/tools/components.js"; import { events as events } from "@dropins/tools/event-bus.js"; import { s as setProductConfiguration } from "../chunks/getProductConfigurationValues.js"; import { g as getInitialProductData } from "../chunks/getFetchedProductData.js"; import { useText as useText } from "@dropins/tools/i18n.js";

const ProductQuantity = ({
    initialData = null,
    onValue,
    children,
    ...props
}) => {
    // Internationalized label text
    const labelText = useText("PDP.Product.Incrementer.label").label;

    // State: initial product data and quantity value
    const [productData, setProductData] = useState(initialData);
    const [quantity, setQuantity] = useState(1);

    // Effect: listen to product data and quantity updates via event bus
    useEffect(() => {
        const dataListener = events.on("pdp/data", setProductData);
        const quantityListener = events.on("pdp/values", ({ quantity }) => {
            setQuantity(quantity);
        }, { eager: true });

        // Cleanup listeners on unmount
        return () => {
            dataListener?.off();
            quantityListener?.off();
        };
    }, []);

    // Handler for quantity changes
    const handleValueChange = (value) => {
        const parsed = parseInt(value, 10);
        setProductConfiguration(config => ({
            ...config,
            quantity: parsed
        }));
        onValue?.(parsed);
    };

    // Only render if product data exists
    return productData
        ?
    J("div", {
        children: [
        d("div", {
            className: "product-details__quantity__field__label",
            children: "QTY:"
        }),
         d(
            Picker,
            {
                id: "quantity-picker",
                name: "quantity",
                defaultValue: quantity.toString(),
                value: quantity.toString(),
                min: 1,
                "aria-label": labelText,
                onValue: handleValueChange,
                ...props,
                className: classes(["pdp-quantity helasdfasfdasdf", props.className])
            },
            "quantity"
        )   
        ]
    })
        
        : null;
};

// Static method to get initial data
ProductQuantity.getInitialData = getInitialProductData;

// Export component
export { ProductQuantity, ProductQuantity as default };

