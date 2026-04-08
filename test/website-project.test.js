import { html, fixture, expect } from '@open-wc/testing';
import "../website-project.js";

describe("WebsiteProject test", () => {
  let element;
  beforeEach(async () => {
    element = await fixture(html`
      <website-project
        title="title"
      ></website-project>
    `);
  });

  it("basic will it blend", async () => {
    expect(element).to.exist;
  });

  it("passes the a11y audit", async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});
