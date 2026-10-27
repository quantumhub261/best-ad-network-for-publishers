const hero = `
<section class="hero">
  <div>
    <h1>Privacy Policy</h1>
    <p class="lede">What this site does and does not collect.</p>
  </div>
</section>`;
const body = `
<h2 id="collection">Information collected</h2>
<p>The site has no accounts, forms or comments, and it does not ask visitors for personal information. Like any website, the hosting provider may keep standard server logs, such as IP address, browser type and requested page, for security and operation.</p>
<h2 id="cookies">Cookies and storage</h2>
<p>The site uses Google Analytics 4 to measure aggregate traffic, such as pages viewed and visitor country. Google Analytics may set cookies and receives the visitor's IP address and page-view data. Fonts load from Google Fonts, which receives the visitor's IP address when a page opens.</p>
<h2 id="links">Third-party links</h2>
<p>Pages link to the websites of ad networks. Those sites have their own privacy policies and practices, and this policy does not cover them.</p>
<h2 id="changes">Changes</h2>
<p>This policy may be updated as the site changes. The date at the foot of each page shows when the content was last reviewed.</p>
`;
module.exports = {
  path: '/privacy/',
  title: 'Privacy Policy',
  description: 'Privacy policy for Publisher Ad Network Guide: what the site collects and how third-party links and fonts are handled.',
  hero, body, faq: [],
};
