export function polyfillHasSelector(
  selector: string,
  style: CSSStyleDeclaration,
  mediaQueries: { [key: string]: CSSStyleDeclaration } = {}
) {
  // check if :has selector is supported
  if (!CSS.supports('selector(:has(a, b))')) {
    const elements = has(selector);
    elements.forEach((parentElement: HTMLElement) => {
      // add css to the element
      Object.keys(style).forEach((key) => {
        parentElement.style[key] = style[key];
      });
      // add css to the element for each media query
      Object.keys(mediaQueries).forEach((mediaQuery) => {
        if (window.matchMedia(mediaQuery).matches) {
          Object.keys(mediaQueries[mediaQuery]).forEach((key) => {
            parentElement.style[key] = mediaQueries[mediaQuery][key];
          });
        }
      });
    });
  }
}

function has(selector: string): Element[] {
  const parts = selector.match(/(.*):has\((.*)\)(.*)/);
  const parentSelector = parts[1].trim();
  const childSelector = parts[2].trim();
  const postSelector = parts[3].trim();

  const matches = [];
  const parentElements = document.querySelectorAll(parentSelector);
  for (const parentElement of Array.from(parentElements)) {
    const childElements = parentElement.querySelectorAll(':scope ' + childSelector);
    if (childElements.length > 0) {
      if (postSelector && postSelector !== '') {
        const postElements = parentElement.querySelectorAll(':scope ' + postSelector);
        for (const postElement of Array.from(postElements)) {
          matches.push(postElement);
        }
      } else {
        matches.push(parentElement);
      }
    }
  }
  return matches;
}
