import anime from 'animejs/lib/anime.es.js';
import { getAnimationValue, getBlurValue, getOpacityValue, getRotateValue, getScaleValue } from './anime-utils';
import {
  findParentSection,
  calculatePercentage,
  getPageCenterY,
  getSectionEnterY,
  getSectionLeaveY,
} from './page-utils';

export function createBasicAnimation(
  blockSelector: string,
  targetsSelector: string,
  animationDuration: number,
  animationDirection: string,
  animationLoop: boolean,
  translateX: string,
  translateY: string,
  scale: number,
  rotate: number,
  transparency: number,
  blur: number,
  background: string
) {
  // get the block element
  const block = document.querySelector<HTMLElement>(blockSelector);
  if (!block) {
    console.error(`Block element not found: ${blockSelector}`);
    return;
  }
  // get the section element
  const section = findParentSection(block);
  if (!section) {
    console.error(`Section element not found for block: ${blockSelector}`);
    return;
  }
  if (!targetsSelector || targetsSelector === '') {
    console.warn(`Target selector is empty: ${blockSelector}`);
  }
  // get target element
  const targets = section.querySelector<HTMLElement>(targetsSelector);
  if (!targets) {
    console.warn(`Target element not found: ${targetsSelector}`);
    return;
  }
  // get section enter Y position
  const sectionEnterY = getSectionEnterY(section);
  // get section leave Y position
  const sectionLeaveY = getSectionLeaveY(section);

  // get animation values
  const translateXValue = getAnimationValue(translateX);
  const translateYValue = getAnimationValue(translateY);
  const backgroundValue = getAnimationValue(background);
  const scaleValue = getScaleValue(scale);
  const rotateValue = getRotateValue(rotate);
  const opacityValue = getOpacityValue(transparency);
  const blurValue = getBlurValue(blur);

  // create the animation
  const animation = anime({
    targets,
    duration: animationDuration,
    direction: animationDirection,
    loop: animationLoop || 1,
    easing: 'linear',
    autoplay: false,
    translateX: translateXValue,
    translateY: translateYValue,
    scale: scaleValue,
    rotate: rotateValue,
    opacity: opacityValue,
    background: backgroundValue,
    update: function (anim) {
      if (Array.isArray(blurValue)) {
        targets.style.filter =
          'blur(' +
          (Number(blurValue[0]) + ((Number(blurValue[1]) - Number(blurValue[0])) * anim.progress) / 100) +
          'px)';
      } else {
        targets.style.filter = 'blur(' + (Number(blurValue) * anim.progress) / 100 + 'px)';
      }
    },
  });
  runAnimation(animation, sectionEnterY, sectionLeaveY);
}

function runAnimation(animation: anime.AnimeInstance, sectionEnterY: number, sectionLeaveY: number) {
  const isReady = Promise.all([
    new Promise<void>(function (resolve) {
      resolve();
    }),
  ]);

  let isAnimationPlayed = false;

  isReady.then(function () {
    // get page center
    const pageCenterY = getPageCenterY();
    // check if the page center is in the section
    if (pageCenterY >= sectionEnterY && pageCenterY <= sectionLeaveY) {
      // play the animation
      animation.play();
      // set the animation played flag
      isAnimationPlayed = true;
    }
    // on scroll event
    window.addEventListener(
      'scroll',
      function () {
        // check if the animation is already played
        if (isAnimationPlayed) return;
        // get page center
        const pageCenterY = getPageCenterY();
        // check if the page center is in the section
        if (pageCenterY >= sectionEnterY && pageCenterY <= sectionLeaveY) {
          // play the animation
          animation.play();
          // set the animation played flag
          isAnimationPlayed = true;
        }
      },
      { passive: true }
    );
  });
}
