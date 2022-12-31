// find the first parent section recursively
export function findParentSection(element: HTMLElement): HTMLElement | null {
  if (!element) {
    return null;
  } else if (element.tagName === 'SECTION') {
    return element;
  } else if (element.parentElement) {
    return findParentSection(element.parentElement);
  } else {
    return null;
  }
}

// get page center Y position
export function getPageCenterY(): number {
  return window.scrollY + window.innerHeight / 2;
}

// get the section enter Y position
export function getSectionEnterY(section: HTMLElement): number {
  return section.offsetTop - window.innerHeight / 2;
}

// get the section leave Y position
export function getSectionLeaveY(section: HTMLElement): number {
  return section.offsetTop + section.offsetHeight + window.innerHeight / 2;
}

export function calculatePercentage(value: number): number {
  return Math.round(value * 10000);
}
