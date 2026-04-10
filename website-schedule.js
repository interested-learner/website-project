import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";

export class WebsiteSchedule extends DDDSuper(LitElement) {

  static get tag() {
    return "website-schedule";
  }

  constructor() {
    super();
    this.games = [];
  }

  static get properties() {
    return {
      ...super.properties,
      games: { type: Array }
    };
  }

  connectedCallback() {
    super.connectedCallback();
    fetch("/api/schedule.json")
      .then(res => res.json())
      .then(data => {
        this.games = data.games;
      });
  }

  static get styles() {
    return [super.styles, css`
      :host {
        display: block;
        font-family: var(--ddd-font-navigation);
        padding: var(--ddd-spacing-4);
      }
      h2 {
        text-align: center;
      }
      .schedule-band {
        display: flex;
        flex-wrap: wrap;
        gap: var(--ddd-spacing-4);
        justify-content: center;
      }
      .game-card {
        background-color: var(--ddd-theme-accent);
        border: var(--ddd-border-md);
        border-radius: var(--ddd-radius-lg);
        padding: var(--ddd-spacing-4);
        width: 250px;
      }
      .teams {
        font-weight: bold;
        font-size: var(--ddd-font-size-s);
        margin-bottom: var(--ddd-spacing-2);
      }
      .details {
        font-size: var(--ddd-font-size-xs);
        color: gray;
      }
    `];
  }

  render() {
    return html`
      <h2>Upcoming Games</h2>
      <div class="schedule-band">
        ${this.games.map(game => html`
          <div class="game-card">
            <div class="teams">${game.home} vs ${game.away}</div>
            <div class="details">${game.date} at ${game.time}</div>
            <div class="details">${game.location}</div>
          </div>
        `)}
      </div>
    `;
  }
}

globalThis.customElements.define(WebsiteSchedule.tag, WebsiteSchedule);