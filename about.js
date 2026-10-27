const hero = `
<section class="hero">
  <div>
    <h1>About Publisher Ad Network Guide</h1>
    <p class="lede">Publisher Ad Network Guide is an independent reference that compares advertising networks for website and mobile app publishers.</p>
  </div>
</section>`;
const body = `
<h2 id="purpose">What this site covers</h2>
<p>The guide collects public information about advertising networks into one comparable format: formats, payout terms, onboarding requirements and platform support. It covers three questions publishers ask most often: which network suits a given type of site or app, which networks work for mobile apps, and what can sit next to or replace Google AdMob.</p>
<h2 id="readers">Who it is for</h2>
<p>The pages are written for website owners and app developers who are choosing a first network, adding a second one or reviewing payout terms. They assume no prior knowledge of ad tech beyond the basic idea that ads are sold per thousand impressions.</p>
<h2 id="reading">How to read the pages</h2>
<p>Every network entry uses the same template and the same type of link to the network's official page, and the order of entries does not rank them. Figures that come from a network's own marketing are labeled as vendor claims. The <a href="/methodology/">methodology</a> page explains the criteria, sources and review dates.</p>
`;
module.exports = {
  path: '/about/',
  title: 'About Publisher Ad Network Guide',
  description: 'About Publisher Ad Network Guide: an independent reference comparing ad networks for website and mobile app publishers.',
  hero,
  body,
  faq: [],
};
