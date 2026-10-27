// Single place for every outbound link. Same treatment for every network.
const U = {
  adsense: 'https://www.google.com/adsense/start/',
  admob: 'https://admob.google.com/home/',
  admaven: 'https://admaven.com/',
  popads: 'https://www.popads.net/',
  sevensearch: 'https://www.7searchppc.com/',
  propeller: 'https://propellerads.com/',
  adcash: 'https://www.adcash.com/',
  adsterra: 'https://adsterra.com/',
  clickadu: 'https://clickadu.com/',
  publift: 'https://www.publift.com/',
  adpushup: 'https://www.adpushup.com/',
  mediavine: 'https://www.mediavine.com/',
  applovin: 'https://www.applovin.com/en/monetization/',
  levelplay: 'https://unity.com/products/levelplay',
  unityads: 'https://unity.com/products/unity-ads',
  inmobi: 'https://www.inmobi.com/',
  verve: 'https://verve.com/',
  appodeal: 'https://appodeal.com/',
  yandex: 'https://ads.yandex.com/monetization',
  yango: 'https://yango-ads.com/adnetwork',
};
const a = (k, text) => `<a class="ext" href="${U[k]}" rel="noopener">${text}</a>`;
module.exports = { U, a };
