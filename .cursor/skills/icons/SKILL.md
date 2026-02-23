---
name: icons
description: Standardizes icon usage in the Initiative Prototype. Use when adding or changing icons, importing icon assets, or when layout breaks due to inconsistent icon sizes. Ensures all icons use fixed containers and fixed sizes so layout stays predictable.
---

# Icons standard (Initiative Prototype)

## When to use this skill

- Adding a new icon (SVG or image) to the app
- Icons are misaligned or breaking layout
- Replacing or consolidating icon assets
- Defining icon sizes or containers in components

## Rule: fixed container, fixed icon size

**Every icon must sit inside a fixed-size container.** The icon asset itself (SVG/PNG) may be any size or aspect ratio; the **container** and the **rendered size** are fixed so layout never shifts.

1. **Container:** Use a wrapper with explicit width and height (e.g. `w-8 h-8`, `w-4 h-4`).
2. **Icon inside:** Size the icon to the container (e.g. `w-full h-full` with `object-contain`, or fixed `w-4 h-4` for the inner SVG/image).
3. **Alignment:** Center the icon in the container (`flex items-center justify-center` or `object-contain` with a centered box).

## Standard sizes (Tailwind)

| Name   | Container class | Use case |
|--------|-----------------|----------|
| `xs`   | `w-3 h-3`       | Inline with small text (e.g. 12px text) |
| `sm`   | `w-4 h-4`       | Nav items, list bullets, small buttons (16px) |
| `md`   | `w-5 h-5`       | Header actions, medium buttons (20px) |
| `lg`   | `w-8 h-8`       | Avatar-sized actions, logo icon (32px) |
| `xl`   | `w-10 h-10`     | Large touch targets (40px) |

Use **one size per context** (e.g. all left-nav icons `sm`; all top-bar icon buttons `lg` or `xl`).

## Implementation pattern

**React (Next.js Image or inline SVG):**

```tsx
// Container + Image
<div className="w-4 h-4 flex items-center justify-center shrink-0">
  <Image
    src="/assets/global/icon-name.svg"
    alt=""
    width={16}
    height={16}
    className="w-4 h-4 object-contain"
  />
</div>

// Or Lucide (already consistent)
<div className="w-4 h-4 flex items-center justify-center shrink-0">
  <Search className="w-4 h-4 text-[#303030]" />
</div>
```

**Rules:**

- Always wrap in a container with explicit `w-* h-*`.
- Use `shrink-0` on the container so flex layouts don’t shrink icons.
- For `<Image>`, set both `width`/`height` and `className` to the same pixel size (e.g. 16 → `w-4 h-4`).
- Put icon assets in `assets/global` (shared) or `assets/<component>/` (component-specific). Do not use random paths.

## Asset locations

- **Global icons** (nav, header, shared actions): `public/assets/global/` or `assets/global/`
- **Component-specific:** `assets/left-nav/`, `assets/site-header/`, etc.
- Reference in code: `/assets/global/icon-name.svg` (if under `public`) or import from `@/assets/...` if using a non-public assets folder.

## Normalizing inconsistent assets

When given icons of random sizes or styles:

1. Pick the **standard size** for the context (e.g. `sm` = 16px).
2. Create or use a **wrapper component** (e.g. `Icon` or `AppIcon`) that always applies the container and size.
3. Place the asset in the right folder; use it only through the wrapper so all icons share the same container behavior.
4. If the SVG has extra padding or stroke that makes it look small, either (a) edit the SVG viewBox/padding or (b) use a slightly larger container and keep the icon centered.

## Checklist for new icons

- [ ] Asset lives in `assets/global` or `assets/<component>/`
- [ ] Rendered inside a fixed-size container (`w-* h-*` + `shrink-0`)
- [ ] Size matches the context (nav = sm, header actions = md/lg)
- [ ] No inline width/height on the asset that overrides the container (e.g. avoid random `width={24}` without a container)
- [ ] `architecture.md` and `behaviors.md` unchanged unless the icon is part of a new component or behavior

---

*Project: Initiative Prototype. See docs/architecture.md for layout and docs/behaviors.md for hover/active states.*
