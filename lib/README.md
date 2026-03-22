# `@aktopia/elements`

Publishable UI library with reusable React components, generic utils, icons, and a shared Tailwind-based stylesheet.

## Includes

- Components via `@aktopia/elements/components`
- Utils via `@aktopia/elements/utils`
- Icons via `@aktopia/elements/icons`
- Styles via `@aktopia/elements/styles`

## Requirements

- ESM-compatible toolchain
- React `^18.3.1 || ^19.0.0`
- React DOM `^18.3.1 || ^19.0.0`

## Install

```sh
npm install @aktopia/elements react react-dom
```

Import the stylesheet once in your app entry:

```ts
import '@aktopia/elements/styles';
```

## Imports

```ts
import { Button, Modal, Tabs } from '@aktopia/elements/components';
import { cx, formatCount, timeAgoStr } from '@aktopia/elements/utils';
import { XMark, ChevronLeftMini } from '@aktopia/elements/icons';
```

## Example

```tsx
import '@aktopia/elements/styles';
import { Button } from '@aktopia/elements/components';
import { ChevronLeftMini } from '@aktopia/elements/icons';

export function Example() {
  return (
    <Button
      Icon={ChevronLeftMini}
      kind="primary"
      size="sm"
      value="Go back"
      onClick={() => console.log('clicked')}
    />
  );
}
```

## Notes

- The package is ESM-only.
- Use explicit subpath imports only. There is no root package export.
- `@aktopia/elements/styles` exposes the generated CSS file directly.
