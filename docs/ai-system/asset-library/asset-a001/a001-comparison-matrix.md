# A001 Comparison Matrix

## Document Information

| Item | Value |
|---|---|
| Asset ID | A001 |
| Deliverable ID | A001-CMP-001 |
| Title | eSIM vs Pocket WiFi for Japan — Comparison Matrix |
| Status | Approved |
| Version | 1.0.0 |
| Phase | Comparison Matrix |
| Phase Status | Complete |
| Evidence Basis | Official provider pages checked 2026-08-01 |

---

## Purpose

This document converts the approved A001 production brief, article architecture, and official-source review into a controlled comparison matrix.

It separates:

1. format-level comparisons between eSIM and Pocket WiFi;
2. provider-level facts;
3. conditional recommendations;
4. claims that require final pre-release re-verification.

---

## Evidence Confidence

Use the following confidence labels:

| Label | Meaning |
|---|---|
| VERIFIED_CURRENT | Confirmed on a current official product, help, or FAQ page |
| VERIFIED_CONDITIONAL | Confirmed, but dependent on device, network, plan, or duration |
| REVERIFY_BEFORE_RELEASE | Time-sensitive price, plan, fair-use, or availability detail |
| NOT_COMPARABLE | The provider does not offer the relevant product format |
| NOT_USED_IN_ARTICLE | Fact is not required for the main eSIM vs Pocket WiFi decision |

---

## Format-Level Comparison

| Criterion | eSIM | Pocket WiFi | Article Decision Rule |
|---|---|---|---|
| Extra hardware | None beyond compatible device | Separate router required | Favor eSIM when minimal equipment matters |
| Device requirement | eSIM-compatible and normally network-unlocked device | Any WiFi-capable device | Favor Pocket WiFi when phone compatibility is uncertain |
| Setup | Install and activate profile | Power on and enter WiFi credentials | Ease depends on user confidence and pickup workflow |
| Pickup | None | Delivery or pickup normally required | Favor eSIM for immediate digital fulfillment |
| Return | None | Rental router normally must be returned | Favor eSIM when return logistics are undesirable |
| Independent use | Each traveler needs an individual line or plan | One router stays with one person or group | Favor separate eSIMs when travelers may split up |
| Multiple devices | Requires supported tethering or separate plans | Designed to share with multiple WiFi devices | Favor Pocket WiFi when many devices stay together |
| Charging | Phone battery only, though tethering increases use | Router battery plus phone/device batteries | Favor eSIM when avoiding another charged device matters |
| Loss/damage risk | No rental hardware | Rental loss or damage terms may apply | Include insurance and liability in total-cost comparison |
| Data policy | Plan-specific | Rental-plan-specific | Never infer limits from the word “unlimited” |
| Coverage | Depends on assigned network, plan, device, and location | Depends on assigned network, plan, device, and location | Do not declare a format-level coverage winner |
| Voice/SMS | Many travel eSIMs are data-only | Router supplies data only | Explain app-based calling and retained primary-line options |
| Best starting fit | Solo, independent, compatible-device traveler | Group staying together, many devices, incompatible phone | Treat as starting logic, not universal winner |

---

## Provider Product Coverage

| Provider | eSIM | Physical SIM | Pocket WiFi | Main A001 Role |
|---|---:|---:|---:|---|
| Sakura Mobile | Yes | Yes | Yes | Japan-focused provider spanning both comparison formats |
| Ubigi | Yes | No Japan travel SIM under Ubigi core offer | No | Global reusable travel eSIM option |
| Airalo | Yes | No | No | App-managed global travel eSIM option |
| NINJA WiFi | Yes | Yes | Yes | Japan-focused Pocket WiFi and multi-format option |
| Japan Wireless | Yes | Yes | Yes | Japan-focused Pocket WiFi and eSIM option |

Provider availability must be rechecked immediately before publication.

---

## Provider Feature Matrix

| Provider / Product | Hotspot or Sharing | Unlimited / Fair Use | Pickup / Return | Device Conditions | Confidence |
|---|---|---|---|---|---|
| Sakura Mobile Travel eSIM | Supported; hotspot allowance varies by plan duration | Current 5G and daily-data products use product-specific hotspot/data rules | No pickup or return | Compatible, unlocked device required | VERIFIED_CONDITIONAL |
| Sakura Mobile Pocket WiFi | Up to 15 connected devices on current product page | Marketed as unlimited; exact high-speed/FUP terms must be checked for selected plan | Rental delivery/pickup and return required | WiFi-capable devices | REVERIFY_BEFORE_RELEASE |
| Ubigi Japan eSIM | Tethering supported | Fixed-data and unlimited products exist; product code and current FUP must be checked | Digital delivery; no return | eSIM-enabled, network-unlocked device | VERIFIED_CONDITIONAL |
| Airalo Japan eSIM | Supported when device and network support tethering | Fixed-data and unlimited products exist; terms vary by package | Digital delivery; no return | eSIM-compatible, unlocked device | VERIFIED_CONDITIONAL |
| NINJA WiFi Pocket WiFi | Shared router; plan/device connection limit varies | Current plans include daily-allowance “Unlimited” and separate Infinite Unlimited offers | Airport and other pickup/return options available | WiFi-capable devices | REVERIFY_BEFORE_RELEASE |
| NINJA WiFi eSIM | Device hotspot capability and product terms must be confirmed | Plan-specific | Digital delivery; no return | Compatible device required | REVERIFY_BEFORE_RELEASE |
| Japan Wireless Pocket WiFi | Current homepage advertises connection for up to 10 devices on highlighted product | Official current materials distinguish truly unlimited Pocket WiFi from FUP-based eSIM | Delivery/pickup; prepaid postbox return envelope | WiFi-capable devices | VERIFIED_CURRENT |
| Japan Wireless eSIM | Hotspot supported; allowance depends on current plan duration | Current unlimited eSIM is subject to FUP and temporary speed management | Digital delivery; no return | Compatible, unlocked device | VERIFIED_CONDITIONAL |

---

## Important Corrections to Earlier Working Notes

### Japan Wireless Device Count

Use:

```text
Up to 10 devices on the currently highlighted Japan Wireless Pocket WiFi product.
```

Do not publish a universal `15 devices` claim unless the exact selected model page confirms it.

### Japan Wireless Unlimited

Distinguish:

```text
Pocket WiFi:
official materials currently describe truly unlimited, unthrottled service.

eSIM:
official plan materials state that Fair Usage Policy and temporary speed
management may apply, with hotspot allowances based on plan duration.
```

Do not apply the Pocket WiFi unlimited claim to Japan Wireless eSIM.

### NINJA WiFi Unlimited

Current official pages show multiple product classes:

- daily high-speed allowances marketed under Unlimited plans;
- separate Infinite Unlimited plans;
- plan-specific prices and terms.

Do not summarize every NINJA WiFi plan as one unlimited condition.

### Sakura Mobile Hotspot

Current official support information includes plan-duration-based hotspot limits for some Travel eSIM products.

Use:

```text
Hotspot is supported, but the included hotspot allowance must be checked
for the exact Sakura Mobile plan and duration.
```

### Airalo Hotspot

Use:

```text
Airalo permits personal hotspot use when the device and selected network support it.
```

Do not claim unconditional compatibility across every device and package.

### Ubigi Unlimited

Ubigi official Japan pages currently show unlimited products, but product pages and identifiers may expose very large nominal allowances or product-specific FUP logic.

Use:

```text
Ubigi offers Japan unlimited plans, but the current product page and FUP
must be checked before publishing a precise threshold.
```

---

## Decision Matrix by Traveler Scenario

| Traveler Scenario | Primary Starting Recommendation | Reason | Required Check |
|---|---|---|---|
| Solo traveler with compatible unlocked phone | eSIM | No pickup, return, or extra router | Data amount, validity, hotspot need |
| Solo traveler with incompatible or locked phone | Pocket WiFi | Avoids eSIM compatibility barrier | Pickup, return, rental terms |
| Couple that may separate | Individual eSIMs | Each person remains connected independently | Device compatibility and total cost |
| Couple staying together with many devices | Compare Pocket WiFi vs hotspot-enabled eSIM | Sharing may reduce complexity | Hotspot allowance and router price |
| Family staying together | Pocket WiFi starting point | Multiple devices can share one router | Device limit, battery, fair use |
| Family likely to split up | Separate eSIMs or mixed setup | One router cannot serve separated groups | Compatibility, budget, backup plan |
| Remote worker using laptop | Compare high-data Pocket WiFi and tethering-enabled eSIM | Both can work, but limits differ materially | Hotspot policy, FUP, video-call demand |
| Traveler avoiding technical setup | Pocket WiFi may be easier after pickup | WiFi-password connection is familiar | Pickup and return burden |
| Traveler avoiding logistics and extra hardware | eSIM | Fully digital fulfillment | Installation confidence |
| Heavy streamer or uploader | Compare exact current policies, not format | “Unlimited” differs by provider and product | FUP, throttling, hotspot allowance |
| Rural itinerary | No format winner | Underlying network and local conditions matter | Provider/network coverage information |
| Multi-country trip | Ubigi or Airalo starting point | Reusable/global app ecosystems | Japan package quality and total cost |

---

## Article Comparison Table — Approved Short Version

This is the recommended reader-facing table.

| Feature | eSIM | Pocket WiFi |
|---|---|---|
| Best for | Solo and independent travelers | Groups staying together and many devices |
| Extra device | No | Yes |
| Compatible phone required | Yes | No eSIM support required |
| Pickup and return | No | Usually yes |
| Group separation | Easy with individual plans | Difficult with one shared router |
| Multiple devices | Only with permitted hotspot or separate plans | Usually designed for sharing |
| Charging | Phone only | Router also needs charging |
| Loss risk | No rental router | Rental loss/damage may cost extra |
| Unlimited meaning | Plan-specific | Rental-plan-specific |
| Coverage | Depends on network and plan | Depends on network and plan |

---

## Provider Positioning for the Article

### Sakura Mobile

Position as:

```text
A Japan-focused provider that lets the reader compare eSIM and Pocket WiFi
within one support ecosystem.
```

Do not claim it is universally best.

### Ubigi

Position as:

```text
A reusable global eSIM service with Japan fixed-data and unlimited options,
tethering support, and digital top-up.
```

### Airalo

Position as:

```text
An app-centered global eSIM marketplace with Japan packages, top-up on
eligible eSIMs, and hotspot use when supported by the device and network.
```

### NINJA WiFi

Position as:

```text
A Japan-focused provider with strong Pocket WiFi logistics and multiple
data-plan classes, plus eSIM and physical SIM options.
```

### Japan Wireless

Position as:

```text
A Japan-focused Pocket WiFi and eSIM provider whose current Pocket WiFi
and eSIM unlimited policies must be described separately.
```

---

## Recommendation Boundaries

The article must not:

- rank providers by affiliate commission;
- call a provider the best without defined criteria;
- state that all unlimited products work the same way;
- use one provider’s Pocket WiFi policy to describe its eSIM;
- state that Pocket WiFi always has better rural coverage;
- state that all eSIM hotspot use is unlimited;
- publish prices without same-day or final pre-release verification;
- publish device-count limits without the exact current model or product page.

---

## Pre-Release Reverification List

Recheck immediately before publication:

1. Sakura Mobile current eSIM products and hotspot allowances;
2. Sakura Mobile Pocket WiFi fair-use or speed-management terms;
3. Ubigi Japan unlimited product FUP and current price;
4. Ubigi Japan fixed-data lineup and top-up eligibility;
5. Airalo Japan package lineup, top-up eligibility, unlimited terms, and price;
6. NINJA WiFi plan names, daily allowances, Infinite Unlimited terms, and prices;
7. NINJA WiFi pickup/return locations and insurance terms;
8. Japan Wireless highlighted router model and device limit;
9. Japan Wireless Pocket WiFi unlimited wording;
10. Japan Wireless eSIM FUP and hotspot allowance;
11. all active affiliate URLs and product availability;
12. every provider CTA destination.

---

## Phase 5 Definition of Done

Phase 5 is complete when:

- format-level matrix is defined;
- five-provider product coverage is recorded;
- hotspot and sharing rules are separated by product;
- unlimited and fair-use claims are separated by product;
- earlier research-note corrections are documented;
- traveler-scenario recommendations are defined;
- reader-facing comparison table is approved;
- provider positioning is defined;
- prohibited recommendation claims are defined;
- pre-release reverification list is defined;
- matrix is saved and verified;
- progress is updated.
