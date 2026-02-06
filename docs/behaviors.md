# Behavior standards

**Purpose:** Define reusable standards for hover, animation, and dropdowns so all components behave consistently. When adding or changing UI behavior, implement it in the component and document it here.

---

## 1. Hover

| Element type | Background (rest) | Background (hover) | Transition |
|--------------|-------------------|---------------------|------------|
| Nav item (left nav) | transparent | `#eaeaea` | `transition-colors` (default) |
| Icon button (ghost) | `#f6f6f6` | `#eaeaea` | `transition-colors` |
| Primary button (black) | `black` | `black/90` | `transition-colors` |
| Secondary / outline | `white` or `#f6f6f6` | `#eaeaea` or `#e0e0e0` | `transition-colors` |
| Tab (header) | text `#767676` | text `#121212` | `transition-colors` |
| Link / back arrow | `#303030` | `#121212` | `transition-colors` |

- Use Tailwind: `hover:bg-[#eaeaea]`, `hover:text-[#121212]`, etc.
- Cursor: `cursor-pointer` for clickable items.

---

## 2. Active / selected state

| Context | Appearance |
|---------|------------|
| Nav item (current page) | `bg-[#eaeaea]` (same as hover; no extra border) |
| Tab (selected) | `text-[#121212] font-medium border-b-2 border-[#121212]` |
| Radio / option selected | Filled circle or check; border `border-black`; fill `bg-black` |

---

## 3. Animation

| Use case | Library | Pattern |
|----------|---------|--------|
| Panel open/close (slide) | Framer Motion | `initial={{ x: ±width, opacity: 0 }}` → `animate={{ x: 0, opacity: 1 }}`; `exit` opposite; `transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}` |
| Left nav collapse/expand | Framer Motion | `animate={{ width: isCollapsed ? 64 : 240 }}`; main content `marginLeft` in sync; `transition-all duration-300` or motion |
| Modal / overlay enter | Framer Motion | `initial={{ opacity: 0 }}` → `animate={{ opacity: 1 }}`; `exit={{ opacity: 0 }}`; duration ~0.25s |
| List enter/exit | Framer Motion | `<AnimatePresence>` on parent; items with `initial`/`animate`/`exit` |
| Content view panel collapse | Framer Motion | Width/position animate between 320 ↔ 160 and full ↔ collapsed |

**Easing:** Prefer `[0.4, 0, 0.2, 1]` (ease-out) for panels and overlays.

**Duration:** 0.25s (overlay), 0.3s (side panels), ~300ms (nav width).

---

## 4. Dropdowns

| Aspect | Standard |
|--------|----------|
| Trigger | Button or clickable row; chevron (e.g. `ChevronDown`, `ChevronRight`) for “has submenu” |
| Positioning | Below trigger or aligned to edge; use Radix/DropdownMenu or equivalent so it’s accessible |
| Panel | White background, border `#eaeaea`, rounded (e.g. `rounded-lg`), shadow for overlay |
| Item hover | Same as nav: `hover:bg-[#eaeaea]` |
| Closing | Click outside or select item; no requirement for Escape in prototype but prefer it |

- Left nav items with **chevron** = navigate or open submenu (behavior TBD per item).
- Filter pills: dropdown for filter value; use shared dropdown panel style.

---

## 5. Badges and notifications

| Type | Style |
|------|--------|
| Numeric badge (e.g. notifications) | `bg-[#e51313] text-white text-xs font-medium`; min height ~20px; rounded-full; positioned top-right of icon |
| Unread dot | `w-2 h-2 bg-[#e51313] rounded-full` |
| Status pill (Draft / In review) | `bg-[#FCF2D6] text-[#3C2C04] text-xs font-medium rounded-full` (or `rounded-lg`) |

---

## 6. Focus and accessibility (prototype baseline)

- Buttons and links: ensure focus visible (Tailwind `focus-visible:ring-2` or browser default).
- Dropdowns: prefer a component that supports keyboard (e.g. Radix) so behavior is consistent when we add a11y.

---

*Last updated: 2025-02-05*
