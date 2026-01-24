# Mapping Islamic Republic Regime in Iran-Related Online Influence Network on X

## ⚠️ Responsible Use Required

[![License: CC BY-NC 4.0](https://img.shields.io/badge/License-CC%20BY--NC%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by-nc/4.0/)

> **This dataset is provided for research, journalism, and public-interest analysis only.**  
> It must not be used for harassment, targeting, enforcement, or punitive actions.

---

## 📋 Responsible Use

This dataset is published in the public interest to support research on online political influence ecosystems related to the Islamic Republic regime in Iran.

Use of this data is **strictly limited** to:

- Academic research
- Investigative journalism
- Human-rights documentation
- OSINT analysis
- Transparency purposes

### ❌ The dataset must NOT be used to:

- Harass, doxx, or target individuals
- Support enforcement, sanctions, or punitive decisions
- Serve as a watchlist, blacklist, or sole decision-making source
- Incite discrimination, retaliation, or collective profiling

> **All users are responsible for ensuring ethical, lawful, and contextualized use of the data.**

---

## 📖 Overview

This dataset is the result of systematic collection and analysis of publicly available Twitter (X) account metadata. It documents accounts exhibiting observable patterns consistent with amplification activities across multiple political influence ecosystems operating in the Persian-language information space.

The dataset currently includes approximately **7,600 accounts** across three datasets, identified through graph-based analysis of public engagement data alongside open-source account listings.

> **Note:** The term "network" is used in a technical, analytical sense referring to graph relationships and interaction patterns. It does not imply organizational membership, formal coordination, or command-and-control structures. See the [Legal Disclaimer](#-legal-ethical-and-methodological-disclaimer) for full details.

---

## 📁 Dataset Contents

| File                  | Accounts | Description                                                                              |
| --------------------- | -------- | ---------------------------------------------------------------------------------------- |
| `IR-Network.json`     | ~3,400   | Accounts exhibiting engagement patterns with Islamic Republic state-affiliated media     |
| `MEK.json`            | ~1,800   | Accounts exhibiting engagement patterns with Mojahedin-e Khalq (MEK)-related content     |
| `White-Internet.json` | ~2,400   | Accounts listed in the White Internet database with publicly cataloged account metadata  |

### Network Descriptions

**IR-Network** — Accounts exhibiting observable engagement patterns with official Islamic Republic media channels (state TV, news agencies, government figures). Patterns were identified based on publicly available interaction data; inclusion does not constitute a determination of affiliation, coordination, or intent.

**MEK** — Accounts exhibiting observable engagement patterns with content related to the Mojahedin-e Khalq (MEK), an exiled opposition organization. The MEK is a formerly armed group that was designated as a terrorist organization by multiple governments (including the United States until 2012 and the European Union until 2009) before being delisted. This dataset documents observed amplification patterns only and does not attribute any account to MEK membership, coordination, or formal affiliation.

Both network clusters represent opposing political positions but exhibit similar observable engagement patterns. The term "network" is used in a technical, graph-analytical sense and does not imply organizational structure, command relationships, or coordinated intent.

**White Internet** — Accounts listed in the open-source White Internet database, which aggregates publicly visible account metadata and inferred attributes. Inclusion indicates presence in the source listing only and should not be treated as evidence of affiliation, intent, or activity.
Source: https://github.com/tasokait/white_internet_database (white_internet.xlsx). The upstream notes indicate the list is not actively maintained.

---

## 🗂️ Data Structure

Each entry contains the following fields:

```json
{
  "creation_date": "Fri Jun 16 14:30:49 +0000 2017",
  "user_id": "875722335449489414",
  "username": "example_user",
  "name": "Display Name",
  "follower_count": 1893,
  "following_count": 2104,
  "favourites_count": null,
  "is_private": null,
  "is_verified": null,
  "is_blue_verified": false,
  "location": null,
  "profile_pic_url": null,
  "profile_banner_url": null,
  "description": "Account bio text",
  "external_url": null,
  "number_of_tweets": 188378,
  "bot": false,
  "timestamp": 1497623449,
  "has_nft_avatar": false,
  "category": null,
  "default_profile": true,
  "default_profile_image": false,
  "listed_count": 10,
  "verified_type": null,
  "account_based_in": "Iran"
}
```

### Field Notes

- **Profile images intentionally excluded**: `profile_pic_url` and `profile_banner_url` are set to `null` by design to prevent biometric identification risks
- **No tweet content**: Dataset contains only account-level metadata, not individual tweets
- **Nullable fields**: Some fields may be `null` depending on public availability at time of collection

### White Internet Schema Notes

`White-Internet.json` includes account handles, display names, username-change history, account status, device type, location indicators, inferred gender, and a permanent user ID (stored as a string), plus optional same-person fields when the source dataset flagged potential overlaps.
Usernames retain the leading `@` from the source list; remove it for cross-dataset joins.
Location and gender are inferred from platform signals and should be treated as probabilistic.

The `location_status` field uses reliability codes (`continent_only`, `iran`, `non_iran_only`) to reflect how confidently a country could be inferred; entries that are not `iran` are less reliable for geographic inference. The `same_person_account` field captures linked handles when provided, and `same_person_detected` is set to `true` only when the source flagged likely overlaps. Some fields may explicitly be `unknown` where the source used unmapped or missing values—these should be treated as unknowns, not negative assertions.

---

## 🔬 Methodology

### Collection Approach

Data was collected exclusively from **publicly accessible information** on the Twitter (X) platform through automated retrieval of account metadata. Collection focused on accounts exhibiting statistically observable engagement patterns with content from channels publicly identified as state-affiliated or organization-affiliated.

> **Note:** Collection and inclusion are based solely on publicly observable behavioral patterns. No claim is made regarding the identity, intent, nationality, affiliation, or motivations of any account holder.

### Identification Criteria

Accounts were included based on observable indicators, including:

- Engagement pattern analysis (retweet frequency, timing, graph clustering)
- Cross-referencing with publicly documented research on influence ecosystems
- Behavioral consistency metrics

> **Important:** These criteria identify statistical patterns only. Inclusion does not constitute an accusation of wrongdoing, coordination, or affiliation with any government, organization, or political group. All classifications are **analytical, descriptive, and probabilistic** — not factual or legal determinations.

### Quality Assurance

- Manual verification performed on sampled subsets to assess pattern consistency
- Accounts with insufficient signal-to-noise ratio excluded from the dataset
- Estimated pattern-matching accuracy: >90%
- Estimated composition: ~95% human-operated accounts; accounts exhibiting primarily automated behavior were excluded

> **Disclaimer:** Despite quality assurance measures, false positives and false negatives may occur. The dataset is subject to inherent OSINT limitations and should not be treated as complete, definitive, or authoritative. Users are encouraged to independently verify and contextualize any findings.

---

## 🎯 Intended Use Cases

This dataset is provided exclusively for public-interest, academic, and research-oriented purposes, including:

- Academic and independent research on public online political influence and amplification patterns

- Forensic-style analytical research of publicly observable social-media interaction patterns, limited to methodological and evidentiary analysis and not legal or criminal attribution

- Analytical study of coordination indicators in open social-media environments, without assumptions of intent, control, or wrongdoing

- Social network analysis, graph modeling, and interaction-pattern research

- Temporal and behavioral analysis of public political messaging ecosystems

- Methodological research on OSINT-based forensic pattern detection, network mapping, and influence analysis

- Investigative journalism and human-rights reporting focused on digital influence dynamics and information environments

### ❌ Explicit Exclusions

This dataset is **not** intended for:

- Law-enforcement, intelligence, or surveillance operations
- Legal, administrative, or judicial determinations
- Platform moderation or automated enforcement actions
- Targeting, profiling, sanctioning, or punitive use against individuals

---

## 📜 Legal, Ethical, and Methodological Disclaimer

### 1. Purpose of the Project

This open-source repository documents and analyzes publicly observable online behavior on X (formerly Twitter) related to political narratives associated with the Islamic Republic regime in Iran.

The project is intended solely for:

- Academic research
- Investigative journalism
- Human-rights documentation
- OSINT analysis
- Public transparency regarding online political influence ecosystems

> **Important:** This project does not target Iran as a country, its population, culture, or diaspora.  
> All references are strictly limited to political messaging and amplification patterns associated with the governing authority known as the Islamic Republic regime in Iran, as distinct from Iranian society or individuals' nationality or identity.

---

### 2. No Accusation, No Attribution, No Determination

Inclusion of any account in this dataset **does not constitute**:

- An accusation of criminal behavior
- An allegation of involvement in violence, repression, or human-rights violations
- A determination of intent, coordination, control, or affiliation
- A claim of acting on behalf of any government, organization, or political group

The dataset reflects observed public interactions and metadata only, analyzed through OSINT methodologies.

> Any classifications or labels are **analytical, descriptive, and probabilistic** — not factual or legal determinations.

---

### 3. Meaning of "Network"

The term **"network"** is used exclusively in a technical and analytical sense, referring to:

- Graph relationships
- Interaction patterns
- Public engagement structures

It **does not imply** the existence of:

- Organizational membership
- Command-and-control structures
- Formal coordination
- Funding or operational relationships

---

### 4. Methodological Limits & Uncertainty

This dataset is subject to inherent OSINT limitations, including but not limited to:

- Behavioral similarity does not imply shared intent or awareness
- Accounts may change ownership, purpose, or behavior over time
- Geographic inference may be inaccurate
- False positives and false negatives are possible
- Public online activity represents only a partial and contextual signal

> ⚠️ **The dataset should never be treated as complete, definitive, or authoritative.**

---

### 5. Political Neutrality & Symmetry

This project does not endorse or oppose any political ideology, movement, opposition group, or governing authority.

Multiple political ecosystems may be included for comparative research purposes, reflecting a methodologically neutral approach rather than political alignment.

---

### 6. GDPR, PII, and Data Protection Compliance

This project is designed to comply with the **EU General Data Protection Regulation (GDPR)** and standard OSINT ethical frameworks.

| Compliance Measure | Description                                                        |
| ------------------ | ------------------------------------------------------------------ |
| Public Data Only   | All data is sourced from publicly available information on X       |
| No Private Access  | No private communications are accessed or processed                |
| No Sensitive Data  | No sensitive personal data is collected                            |
| No Deanonymization | No attempt is made to deanonymize users                            |
| No Media Storage   | Profile images and banners are intentionally excluded              |
| Metadata Only      | No tweet content is stored; only metadata already exposed publicly |

Where personal data may exist incidentally (e.g., usernames or display names), it is processed under the **legitimate interest basis** for research, journalism, and public-interest documentation (**GDPR Art. 6(1)(f)**).

---

### 7. Not a Watchlist, Blacklist, or Enforcement Tool

This dataset is **NOT**:

- ❌ A sanctions list
- ❌ A watchlist
- ❌ A blacklist
- ❌ A law-enforcement or intelligence product

It **must not be used** as the sole basis for:

- Platform moderation decisions
- Employment or academic decisions
- Legal, administrative, or punitive actions
- Harassment, targeting, or retaliation

---

### 8. Open-Source, Collaborative & Non-Authoritative Nature

This repository is **open source**.

- Data may be reviewed, extended, corrected, challenged, or completed by the community
- Contributions, counter-analysis, and methodological critique are encouraged
- No claim is made that the dataset is exhaustive, final, or error-free

> 💡 **Users are encouraged to independently verify, contextualize, and cross-check any findings.**

---

### 9. Ethical Use Requirement

Use of this dataset must adhere to:

- Academic integrity standards
- Journalistic ethics
- Human-rights documentation principles

The data **must not** be used to:

- Harass individuals
- Doxx users
- Incite hatred or discrimination
- Support collective punishment or profiling

---

### 10. Liability Limitation

The authors and contributors:

- Make no warranties regarding accuracy or completeness
- Assume no liability for downstream use or interpretation
- Do not control how third parties reuse or modify the data

> **All responsibility for interpretation and application lies with the end user.**

---

### 11. Final Clarification

This project studies **online political influence patterns — not people.**

It distinguishes clearly and consistently between:

| Term                                    | Definition                      |
| --------------------------------------- | ------------------------------- |
| **Iran**                                | A country, people, and society  |
| **The Islamic Republic regime in Iran** | A governing political authority |

> ⚠️ **Any interpretation that conflates these two is explicitly incorrect and contrary to the intent of this project.**

---

## 📄 License

This work is licensed under a [Creative Commons Attribution-NonCommercial 4.0 International License (CC BY-NC 4.0)](https://creativecommons.org/licenses/by-nc/4.0/).

[![CC BY-NC 4.0](https://licensebuttons.net/l/by-nc/4.0/88x31.png)](https://creativecommons.org/licenses/by-nc/4.0/)

### You are free to:

- **Share** — copy and redistribute the material in any medium or format
- **Adapt** — remix, transform, and build upon the material

### Under the following terms:

- **Attribution** — You must give appropriate credit, provide a link to the license, and indicate if changes were made. You may do so in any reasonable manner, but not in any way that suggests the licensor endorses you or your use.
- **NonCommercial** — You may not use the material for commercial purposes.
- **No additional restrictions** — You may not apply legal terms or technological measures that legally restrict others from doing anything the license permits.

---

## 📬 Contact

For questions, corrections, or contributions, please open an issue or submit a pull request.

---

<p align="center">
  <i>Last updated: January 2026</i>
</p>
