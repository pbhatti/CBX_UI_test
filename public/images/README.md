# Images Folder

This folder contains all SVG and PNG assets used in the application.

## Usage

### In React Components (Next.js Image Component)

```tsx
import Image from 'next/image'

// For PNG/JPG images
<Image 
  src="/images/your-image.png" 
  alt="Description" 
  width={100} 
  height={100}
/>
```

### In React Components (Regular img tag)

```tsx
// For SVG or PNG images
<img src="/images/your-image.svg" alt="Description" />
```

### In CSS/Tailwind

```css
/* In CSS */
background-image: url('/images/your-image.png');
```

```tsx
// In Tailwind classes
<div className="bg-[url('/images/your-image.png')]">
```

### Direct URL Access

Images in this folder are accessible at:
- `http://localhost:3000/images/filename.svg`
- `http://localhost:3000/images/filename.png`

## File Organization

- Place all SVG files directly in this folder
- Place all PNG files directly in this folder
- Use descriptive, kebab-case filenames (e.g., `logo-icon.svg`, `user-avatar.png`)

