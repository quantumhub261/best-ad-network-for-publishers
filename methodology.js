const hero = `
<section class="hero">
  <div>
    <h1>Methodology: How Ad Networks Are Compared</h1>
    <p class="lede">This page describes the criteria, sources and editorial rules behind every comparison on the site.</p>
  </div>
</section>`;
const body = `
<h2 id="criteria">Criteria</h2>
<p>Web networks are read against four criteria: payout model and threshold, formats and fill rate, onboarding requirements, and reputation and policies. Mobile networks add platform and SDK support, mediation and bidding support, country coverage, and moderation and store coverage. The same criteria apply to every entry on a page.</p>
<h2 id="sources">Sources</h2>
<p>Facts come from each network's own site, help center or FAQ, and from named third parties such as IAB Tech Lab, Bill.com, Digiday and AdCompares where the text says so. A fact that cannot be traced to a source is left out instead of estimated.</p>
<h2 id="vendor-claims">Vendor claims</h2>
<p>Numbers that a network publishes about itself, such as fill rates or CPM ranges, are labeled as vendor claims. They show what the network says, not what a given publisher will earn, because results depend on country, format, placement and traffic quality.</p>
<h2 id="order">Order and links</h2>
<p>Entries within a group follow the same template and carry one link of the same type to the network's official page. Order inside a list does not indicate rank, and no network is placed first by default. Networks can be added or removed when their terms change.</p>
<h2 id="updates">Updates</h2>
<p>Pages show a review date. Payout thresholds, approval rules and formats change often, so check the network's own page before applying.</p>
`;
module.exports = {
  path: '/methodology/',
  title: 'Methodology: How Ad Networks Are Compared',
  description: 'Criteria, sources and editorial rules used to compare ad networks for web and mobile app publishers.',
  hero, body, faq: [],
};
