# Terminology and content

**Purpose:** Single source for all user-facing copy, labels, and date/time formats. Use these values (or keys pointing to them) in components to keep the prototype consistent.

---

## 1. Brand and app

| Key | Value |
|-----|--------|
| App name | Different |
| App name (collapsed) | (logo only) |

---

## 2. Left navigation

| Key | Value |
|-----|--------|
| Search | Search |
| Home | Home |
| Insights | Insights |
| Notifications | Notifications |
| Initiatives | Initiatives |
| Campaigns | Campaigns |
| Audiences | Audiences |
| Automations | Automations |
| Library | Library |
| Company | Company |
| Background Gradient | Background Gradient |
| Settings | Settings |

---

## 3. Initiatives screen

| Key | Value |
|-----|--------|
| Page title | Initiatives |
| Create initiative (button) | Create initiative |
| Add filter | Add filter |
| Filter: Name | Name |
| Filter: Status | Status |
| Filter: Product | Product |
| Filter: Created by | Created by |

---

## 4. Campaigns screen

| Key | Value |
|-----|--------|
| Campaign header title | The Future of Campaign Automation |
| Tab: Overview | Overview |
| Tab: Target audience | Target audience |
| Tab: Journey | Journey |
| Publish (button) | Publish |
| Draft (status) | Draft |
| In review (status) | In review |

---

## 5. Background Gradient / Ad flow

| Key | Value |
|-----|--------|
| Close (action) | (icon only) |
| Edit setup | Edit setup |
| Approve content | Approve content |
| Content view | Content view |
| Comments | Comments |
| LinkedIn Ads (count) | LinkedIn Ads (233) |
| Landing pages (count) | Landing pages (256) |
| Personalisation level | Personalisation level |
| Account and persona | Account and persona |
| Select persona | Select persona |
| Select account | Select account |
| Search accounts | Search accounts |
| Step context | Step context |
| Where is your target audience? | Where is your target audience? |
| Duration | Duration |
| Ad budget | Ad budget |
| Offer | Offer |
| Marketing email template | Marketing email template |
| Generate only generic content | Generate only generic content |
| Yes / No | Yes / No |
| Ad click destination | Ad click destination |
| AI-generated landing page | AI-generated landing page |
| Landing page template | Landing page template |
| Update (button) | Update |
| Change (button) | Change |

---

## 6. Status and labels

| Key | Value |
|-----|--------|
| Draft | Draft |
| In review | In review |
| Scheduled | Scheduled |
| Active | Active |

---

## 7. Date and time standards

- **Date (short):** `MMM d, yyyy` (e.g. Jul 1, 2025 / Dec 15, 2025).
- **Time (12h):** `h:mm a` (e.g. 3:42 PM).
- **Relative / list:** “Today”, “Yesterday”; otherwise use short date.
- **Display in lists:** “MMM d, yyyy, h:mm…” when truncated (e.g. Sep 1, 2025, 4:30…).
- **Locale:** en-US for the prototype. Format dates with `Intl.DateTimeFormat` or a small helper so switching locale later is one place.

**Example usage:**

- Table “Last modified”: `Sep 1, 2025, 4:30…`
- Comment timestamp: `3:42 PM, Today`
- Duration range: `Dec 15, 2025` – `Dec 25, 2025`

---

## 8. Placeholder / sample content

- User name (profile): Lisa Reynolds
- User initials (avatar): LR
- Sample comment author: Jane Doe (JD)
- Sample persona list: Data leader, Digital transformation leader, Product leader, Finance leader
- Sample accounts: Apple, Tesla, Reliance, Fiserve, Hundai, Groww, Unacademy, Flipkart

---

*Last updated: 2025-02-05*
