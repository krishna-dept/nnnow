/* eslint-disable import/no-unresolved */

import {
  InLineAlert,
  Icon,
  Button,
  provider as UI,
  Breadcrumbs,
} from '@dropins/tools/components.js';
import { events } from '@dropins/tools/event-bus.js';
import * as pdpApi from '@dropins/storefront-pdp/api.js';
import { render as pdpRendered } from '@dropins/storefront-pdp/render.js';

// Containers
import ProductHeader from '@dropins/storefront-pdp/containers/ProductHeader.js';
import ProductPrice from '@dropins/storefront-pdp/containers/ProductPrice.js';
import ProductShortDescription from '@dropins/storefront-pdp/containers/ProductShortDescription.js';
import ProductOptions from '@dropins/storefront-pdp/containers/ProductOptions.js';
import ProductQuantity from '@dropins/storefront-pdp/containers/ProductQuantity.js';
import ProductDescription from '@dropins/storefront-pdp/containers/ProductDescription.js';
import ProductAttributes from '@dropins/storefront-pdp/containers/ProductAttributes.js';
import ProductGallery from '@dropins/storefront-pdp/containers/ProductGallery.js';

// Libs
import { fetchPlaceholders, setJsonLd } from '../../scripts/commerce.js';

// Initializers
import { IMAGES_SIZES } from '../../scripts/initializers/pdp.js';
import '../../scripts/initializers/cart.js';
import { rootLink } from '../../scripts/scripts.js';
import SnapmintWidget from './emi.js';
import StadSize from './size.js';
import Breadcrumb from './Breadcrumb.js';
import ActionIcons from './ActionIcons.js'
import PromotionBanner from './BannerSlot.js';
import ProductAttributesAccordion from './ProductAttributesAccordion.js';
// import ProductAttributesAccordion from './ProductAttributesAccordion.js';

const Emi = document.createElement('div')
Emi.classList.add("emi")

export default async function decorate(block) {
  // eslint-disable-next-line no-underscore-dangle
  const product = events._lastEvent?.['pdp/data']?.payload ?? null;
  const labels = await fetchPlaceholders();

  const DROPDOWN_MAX_QUANTITY = 10;

  const dropdownOptions = Array.from(
    { length: parseInt(DROPDOWN_MAX_QUANTITY, 10) },
    (_, i) => {
      const quantityOption = i + 1;
      return {
        value: `${quantityOption}`,
        text: `${quantityOption}`,
      };
    }
  );

  // Layout
  const fragment = document.createRange().createContextualFragment(`
    <div class="product_breadcrumbs"></div>
    <div class="product-details__wrapper">
      <div class="product-details__alert"></div>
      <div class="product-details__left-column">
        <div class="product-details__gallery"></div>
      </div>
      <div class="product-details__right-column">
        <div class="product-details__header"></div>
        <div class="product-details__price"></div>
        <div class="product-details__emi"></div>
        <div class="product-details__size"></div>
        <div class="product-details__gallery"></div>
        <div class="product-details__short-description"></div>
        <div class="product-details__configuration">
          <div class="product-details__options"></div>
          <div class="product-details__quantity"></div>
          <div class="product-details__buttons">
            <div class="product-details__buttons__add-to-cart"></div>
            <div class="product-details__buttons__add-to-wishlist"></div>
          </div>
        </div>
        <div class="product-details__promotion"></div>
      </div>
    </div>
    <div class="product-details__accordion"></div>
  `);

  const $breadcrumb = fragment.querySelector('.product_breadcrumbs');
  const $alert = fragment.querySelector('.product-details__alert');
  const $gallery = fragment.querySelector('.product-details__gallery');
  const $header = fragment.querySelector('.product-details__header');
  const $price = fragment.querySelector('.product-details__price');
  const $emi = fragment.querySelector('.product-details__emi');
  const $size = fragment.querySelector('.product-details__size');
  const $galleryMobile = fragment.querySelector('.product-details__right-column .product-details__gallery');
  const $shortDescription = fragment.querySelector('.product-details__short-description');
  const $options = fragment.querySelector('.product-details__options');
  const $quantity = fragment.querySelector('.product-details__quantity');
  const $addToCart = fragment.querySelector('.product-details__buttons__add-to-cart');
  const $addToWishlist = fragment.querySelector('.product-details__buttons__add-to-wishlist');
  const $promotionBanner = fragment.querySelector('.product-details__promotion');
  // const $description = fragment.querySelector('.product-details__description');
  // const $attributes = fragment.querySelector('.product-details__attributes')
  const $accordion = fragment.querySelector('.product-details__accordion');

  console.log($accordion);

  block.appendChild(fragment);

  // Alert
  let inlineAlert = null;

  // Render Containers
  const [
    _galleryMobile,
    _gallery,
    _header,
    _price,
    _shortDescription,
    _options,
    _quantity,
    addToCart,
    addToWishlist,
    _description,
    _attributes,
  ] = await Promise.all([
    // Gallery (Mobile)
    pdpRendered.render(Breadcrumb, {})($breadcrumb),
    pdpRendered.render(ProductGallery, {
      controls: 'dots',
      arrows: true,
      peak: false,
      gap: 'small',
      loop: false,
      imageParams: {
        ...IMAGES_SIZES,
      },
    })($galleryMobile),

    // Gallery (Desktop)
    pdpRendered.render(ProductGallery, {
      controls: 'thumbnailsColumn',
      arrows: true,
      peak: true,
      gap: 'small',
      loop: false,
      imageParams: {
        ...IMAGES_SIZES,
      },
    })($gallery),

    // Header
    pdpRendered.render(ProductHeader, {})($header),

    // Price
    pdpRendered.render(ProductPrice, {})($price),

    pdpRendered.render(SnapmintWidget, {})($emi),

    pdpRendered.render(StadSize, {})($size),
    // Short Description
    pdpRendered.render(ProductShortDescription, {})($shortDescription),

    // Configuration - Swatches
    pdpRendered.render(ProductOptions, { hideSelectedValue: false })($options),

    // Configuration  Quantity
    pdpRendered.render(ProductQuantity, {dropdownOptions})($quantity),

    // Configuration – Button - Add to Cart
    UI.render(Button, {
      children: labels.PDP?.Product?.AddToCart?.label,
      icon: Icon({ source: 'Cart' }),
      onClick: async () => {
        try {
          addToCart.setProps((prev) => ({
            ...prev,
            children: labels.Custom?.AddingToCart?.label,
            disabled: true,
          }));

          // get the current selection values
          const values = pdpApi.getProductConfigurationValues();
          const valid = pdpApi.isProductConfigurationValid();

          // add the product to the cart
          if (valid) {
            const { addProductsToCart } = await import('@dropins/storefront-cart/api.js');
            await addProductsToCart([{ ...values }]);
          }

          // reset any previous alerts if successful
          inlineAlert?.remove();
        } catch (error) {
          // add alert message
          inlineAlert = await UI.render(InLineAlert, {
            heading: 'Error',
            description: error.message,
            icon: Icon({ source: 'Warning' }),
            'aria-live': 'assertive',
            role: 'alert',
            onDismiss: () => {
              inlineAlert.remove();
            },
          })($alert);

          // Scroll the alertWrapper into view
          $alert.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
          });
        } finally {
          addToCart.setProps((prev) => ({
            ...prev,
            children: labels.PDP?.Product?.AddToCart?.label,
            disabled: false,
          }));
        }
      },
    })($addToCart),

    // Configuration - Add to Wishlist
    // UI.render(Button, {
    //   icon: Icon({ source: 'Share' }),
    //   variant: 'secondary',
    //   'aria-label': labels.Custom?.AddToWishlist?.label,
    //   onClick: async () => {
    //     try {
    //       addToWishlist.setProps((prev) => ({
    //         ...prev,
    //         disabled: true,
    //         'aria-label': labels.Custom?.AddingToWishlist?.label,
    //       }));

    //       const values = pdpApi.getProductConfigurationValues();

    //       if (values?.sku) {
    //         const wishlist = await import('../../scripts/wishlist/api.js');
    //         await wishlist.addToWishlist(values.sku);
    //       }
    //     } catch (error) {
    //       console.error(error);
    //     } finally {
    //       addToWishlist.setProps((prev) => ({
    //         ...prev,
    //         disabled: false,
    //         'aria-label': labels.Custom?.AddToWishlist?.label,
    //       }));
    //     }
    //   },
    // })($addToWishlist),

   // Configuration - Share Product
// UI.render(Button, {
//   icon: Icon({ source: 'Sharei' }), // ✅ Uses the name you exported
//   variant: 'secondary',
//   'aria-label': labels.Custom?.ShareProduct?.label || 'Share this product',
//   onClick: async () => {
//     try {
//       const shareData = {
//         title: document.title,
//         url: window.location.href,
//       };

//       if (navigator.share) {
//         await navigator.share(shareData);
//       } else {
//         await navigator.clipboard.writeText(shareData.url);
//         alert('Link copied to clipboard!');
//       }
//     } catch (err) {
//       console.error('Share failed:', err);
//     }
//   },
// })($shareButton),

  pdpRendered.render(ActionIcons, {})($addToWishlist),
    
    //PromotionBanner
    pdpRendered.render(PromotionBanner, {})($promotionBanner),

    // Description
    // pdpRendered.render(ProductDescription, {})($description),

    // Attributes
    // pdpRendered.render(ProductAttributes, {})($attributes),

    pdpRendered.render(ProductAttributesAccordion, {})($accordion)

  ]);

  // Lifecycle Events
  events.on('pdp/valid', (valid) => {
    // update add to cart button disabled state based on product selection validity
    addToCart.setProps((prev) => ({ ...prev, disabled: !valid }));
  }, { eager: true });

  // Set JSON-LD and Meta Tags
  events.on('aem/lcp', () => {
    if (product) {
      setJsonLdProduct(product);
      setMetaTags(product);
      document.title = product.name;
    }
  }, { eager: true });

  return Promise.resolve();
}

async function setJsonLdProduct(product) {
  const {
    name,
    inStock,
    description,
    sku,
    urlKey,
    price,
    priceRange,
    images,
    attributes,
  } = product;
  const amount = priceRange?.minimum?.final?.amount || price?.final?.amount;
  const brand = attributes.find((attr) => attr.name === 'brand');

  // get variants
  const { data } = await pdpApi.fetchGraphQl(`
    query GET_PRODUCT_VARIANTS($sku: String!) {
      variants(sku: $sku) {
        variants {
          product {
            sku
            name
            inStock
            images(roles: ["image"]) {
              url
            }
            ...on SimpleProductView {
              price {
                final { amount { currency value } }
              }
            }
          }
        }
      }
    }
  `, {
    method: 'GET',
    variables: { sku },
  });

  const variants = data?.variants?.variants || [];

  const ldJson = {
    '@context': 'http://schema.org',
    '@type': 'Product',
    name,
    description,
    image: images[0]?.url,
    offers: [],
    productID: sku,
    brand: {
      '@type': 'Brand',
      name: brand?.value,
    },
    url: new URL(rootLink(`/products/${urlKey}/${sku}`), window.location),
    sku,
    '@id': new URL(rootLink(`/products/${urlKey}/${sku}`), window.location),
  };

  if (variants.length > 1) {
    ldJson.offers.push(...variants.map((variant) => ({
      '@type': 'Offer',
      name: variant.product.name,
      image: variant.product.images[0]?.url,
      price: variant.product.price.final.amount.value,
      priceCurrency: variant.product.price.final.amount.currency,
      availability: variant.product.inStock ? 'http://schema.org/InStock' : 'http://schema.org/OutOfStock',
      sku: variant.product.sku,
    })));
  } else {
    ldJson.offers.push({
      '@type': 'Offer',
      price: amount?.value,
      priceCurrency: amount?.currency,
      availability: inStock ? 'http://schema.org/InStock' : 'http://schema.org/OutOfStock',
    });
  }

  setJsonLd(ldJson, 'product');
}

function createMetaTag(property, content, type) {
  if (!property || !type) {
    return;
  }
  let meta = document.head.querySelector(`meta[${type}="${property}"]`);
  if (meta) {
    if (!content) {
      meta.remove();
      return;
    }
    meta.setAttribute(type, property);
    meta.setAttribute('content', content);
    return;
  }
  if (!content) {
    return;
  }
  meta = document.createElement('meta');
  meta.setAttribute(type, property);
  meta.setAttribute('content', content);
  document.head.appendChild(meta);
}

function setMetaTags(product) {
  if (!product) {
    return;
  }

  const price = product.prices.final.minimumAmount ?? product.prices.final.amount;

  createMetaTag('title', product.metaTitle || product.name, 'name');
  createMetaTag('description', product.metaDescription, 'name');
  createMetaTag('keywords', product.metaKeyword, 'name');

  createMetaTag('og:type', 'product', 'property');
  createMetaTag('og:description', product.shortDescription, 'property');
  createMetaTag('og:title', product.metaTitle || product.name, 'property');
  createMetaTag('og:url', window.location.href, 'property');
  const mainImage = product?.images?.filter((image) => image.roles.includes('thumbnail'))[0];
  const metaImage = mainImage?.url || product?.images[0]?.url;
  createMetaTag('og:image', metaImage, 'property');
  createMetaTag('og:image:secure_url', metaImage, 'property');
  createMetaTag('product:price:amount', price.value, 'property');
  createMetaTag('product:price:currency', price.currency, 'property');
}
