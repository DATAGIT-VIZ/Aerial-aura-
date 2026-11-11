// Every business detail the site shows, in one place.
//
// Fill in the empty values, then run `npm run launch-check` to see what is still missing.
// Optional values that stay empty hide the matching button, link or line, so visitors
// never see a placeholder.
//
// Keep this file free of '@/...' imports: the launch check reads it directly with Node.

type Price = number | null;

export const business = {
  /** Brand name used in headings, the footer and legal pages. */
  brand: 'Aerial Aura Studio',

  // ── Legal notice (Impressum). Swiss law requires these for any business selling online.
  /** REQUIRED. Owner's full name, or the registered company name. */
  legalName: 'Sydney Soares',
  /** Optional. e.g. 'Sole proprietorship' or 'GmbH'. */
  legalForm: '',
  /** REQUIRED. Street and number, e.g. 'Musterstrasse 12'. */
  street: 'Schwerzenbachstrasse 43',
  /** REQUIRED. Postcode and town, e.g. '3011 Bern'. */
  postcodeCity: '8117 Fällanden',
  /** REQUIRED. Canton of the business address, e.g. 'Bern'. Sets the court in the terms. */
  canton: 'Zurich',
  country: 'Switzerland',
  /** REQUIRED. Public contact email. Must be a working inbox. */
  email: 'sydneymsoares12@gmail.com',
  /** Optional. International format, e.g. '+41 79 123 45 67'. */
  phone: '',
  /** Only if registered: Swiss business ID, e.g. 'CHE-123.456.789'. */
  uid: '',
  /** Only if VAT-registered, e.g. 'CHE-123.456.789 MWST'. Prices then show "incl. VAT". */
  vatNumber: '',
  /** Only if registered, e.g. 'Commercial Register of the Canton of Bern'. */
  commercialRegister: '',

  // ── Contact channels
  /** Digits only, with country code, e.g. '41791234567'. Empty hides every WhatsApp button. */
  whatsapp: '',
  /** Full profile URLs, e.g. 'https://instagram.com/handle'. Empty hides the link. */
  instagram: '',
  youtube: '',

  // ── The pilot
  /** Shown in the About section. Empty uses neutral wording instead. */
  pilotName: '',
  /** Portrait placed in /public, e.g. '/images/pilot.jpg'. Empty keeps the HUD graphic. */
  pilotPhoto: '',
  /** Optional. FOCA drone operator registration number, shown in the legal notice. */
  focaOperatorId: '',

  // ── Starting prices in whole Swiss francs: the final price the customer pays
  //    (including VAT if VAT-registered). null shows "On request".
  prices: {
    // Home page, "The flight menu"
    socialReel: null as Price,
    realEstateBrand: null as Price,
    fullWedding: null as Price,
    // Services page
    appetiser: null as Price,
    signature: null as Price,
    tastingMenu: null as Price,
  },
};

/** WhatsApp chat link with an optional pre-filled message, or '' when no number is set. */
export function whatsappLink(message = ''): string {
  if (!business.whatsapp) return '';
  return `https://wa.me/${business.whatsapp}${message ? `?text=${encodeURIComponent(message)}` : ''}`;
}

/** 'CHF 1’200', or null when the price is on request. */
export function formatPrice(price: Price): string | null {
  return price == null ? null : `CHF ${price.toLocaleString('de-CH')}`;
}

/** Swiss pricing rules: consumer prices must include VAT, so say so when it applies. */
export const priceVatNote = business.vatNumber ? 'incl. VAT' : '';

/** Name used where the legal operator is meant: the owner if known, else the brand. */
export const operatorName = business.legalName || business.brand;
