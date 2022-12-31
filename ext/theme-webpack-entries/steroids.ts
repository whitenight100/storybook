/// <reference lib="dom" />
import anime from 'animejs/lib/anime.es.js';
import * as steroids from './lib';

declare global {
  interface Window {
    anime: any;
    steroids: typeof steroids;
  }
}

window.anime = anime;
window.steroids = steroids;
