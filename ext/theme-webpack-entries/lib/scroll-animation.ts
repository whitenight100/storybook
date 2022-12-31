import anime from 'animejs/lib/anime.es.js';
import { getAnimationValue, getBlurValue, getOpacityValue, getRotateValue, getScaleValue } from './anime-utils';
import {
  findParentSection,
  calculatePercentage,
  getPageCenterY,
  getSectionEnterY,
  getSectionLeaveY,
} from './page-utils';

const timeline: anime.AnimeTimelineInstance = anime.timeline({
  duration: calculatePercentage(1),
  easing: 'linear',
  autoplay: false,
});

export function createScrollAnimation(
  blockSelector: string,
  targetsSelector: string,
  animationStart: number,
  animationEnd: number,
  translateX: string,
  translateY: string,
  scale: number | [number, number],
  rotate: number | [number, number],
  transparency: number | [number, number],
  blur: number | [number, number],
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
  // get page height
  const pageHeight = document.body.offsetHeight;
  // get section enter Y position
  const sectionEnterY = getSectionEnterY(section);
  // get section leave Y position
  const sectionLeaveY = getSectionLeaveY(section);
  // get section height
  const sectionHeight = sectionLeaveY - sectionEnterY;
  // get section enter Y in percentage of page height
  const sectionEnterYPercentage = calculatePercentage(sectionEnterY / pageHeight);
  // get section leave Y in percentage of page height
  const sectionLeaveYPercentage = calculatePercentage(sectionLeaveY / pageHeight);
  // get section height in percentage of page height
  const sectionHeightPercentage = calculatePercentage(sectionHeight / pageHeight);
  // get animation start in percentage of section height
  const animationStartPercentage = (animationStart * sectionHeightPercentage) / 100;
  // get animation end in percentage of section height
  const animationEndPercentage = (animationEnd * sectionHeightPercentage) / 100;
  // get animation start in percentage of page height
  const animationStartYPercentage = sectionEnterYPercentage + animationStartPercentage;
  // get animation end in percentage of page height
  const animationEndYPercentage = sectionLeaveYPercentage + animationEndPercentage - sectionHeightPercentage;
  // get animation values
  const translateXValue = getAnimationValue(translateX);
  const translateYValue = getAnimationValue(translateY);
  const backgroundValue = getAnimationValue(background);
  const scaleValue = getScaleValue(scale);
  const rotateValue = getRotateValue(rotate);
  const opacityValue = getOpacityValue(transparency);
  const blurValue = getBlurValue(blur);

  // create the animation
  timeline.add(
    {
      targets,
      duration: animationEndYPercentage - animationStartYPercentage,
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
    },
    animationStartYPercentage
  );
}

function runScrollAnimations() {
  const isReady = Promise.all([
    new Promise<void>(function (resolve) {
      setTimeout(resolve, 500);
    }),
  ]);

  isReady.then(function () {
    // set initial timeline position
    timeline.seek(0);
    // on scroll event
    window.addEventListener(
      'scroll',
      function () {
        // get page center
        const pageCenterYPercentage = calculatePercentage(getPageCenterY() / document.body.offsetHeight);
        // set timeline position
        timeline.seek(pageCenterYPercentage);
      },
      { passive: true }
    );
  });
}

runScrollAnimations();
