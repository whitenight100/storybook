export function polyfillHasSelector(
  parentSelectors: string,
  childSelectors: string,
  style: CSSStyleDeclaration,
  mediaQueries: { [key: string]: CSSStyleDeclaration } = {}
) {
  // check if :has selector is supported
  if (!CSS.supports('selector(:has(a, b))')) {
    const parentElements = Array.from(document.querySelectorAll(parentSelectors));
    parentElements.forEach((parentElement: HTMLElement) => {
      const childElements = Array.from(parentElement.querySelectorAll(childSelectors));
      if (childElements.length > 0) {
        // add css to parent element
        Object.keys(style).forEach((key) => {
          parentElement.style[key] = style[key];
        });
        // add css to parent element for each media query
        Object.keys(mediaQueries).forEach((mediaQuery) => {
          if (window.matchMedia(mediaQuery).matches) {
            Object.keys(mediaQueries[mediaQuery]).forEach((key) => {
              parentElement.style[key] = mediaQueries[mediaQuery][key];
            });
          }
        });
      }
    });
  }
}
