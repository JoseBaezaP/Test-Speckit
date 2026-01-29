# Component Contracts

**Contract Version**: 1.0.0
**Date**: 2026-01-29

## DishForm Component

### Props

```typescript
interface DishFormProps {
  /** Initial values for form fields (for edit mode) */
  initialValues?: Partial<Dish>

  /** Callback when form is successfully submitted */
  onSubmit: (data: DishCreationData) => void

  /** Callback when form is cancelled */
  onCancel?: () => void

  /** Whether form is in edit mode vs create mode */
  mode?: 'create' | 'update'

  /** ID of dish being edited (required in update mode) */
  dishId?: string
}
```

### Behavior

- Form uses controlled components with shadcn/ui Form
- All fields validated using zod schema before submission
- Loading state displayed during form submission
- Success message displayed on successful save
- Validation errors displayed per field
- Form resets after successful submission

### Events

```typescript
interface DishFormEvents {
  /** Emitted when form submit is triggered */
  onSubmit: (data: DishCreationData) => void

  /** Emitted when cancel button is clicked */
  onCancel: () => void

  /** Emitted on field value change (for real-time validation) */
  onFieldChange: (field: keyof DishCreationData, value: unknown) => void
}
```

---

## DishTable Component

### Props

```typescript
interface DishTableProps {
  /** List of dishes to display */
  dishes: Dish[]

  /** Callback when edit button is clicked */
  onEdit: (dish: Dish) => void

  /** Callback when delete button is clicked */
  onDelete: (dishId: string) => void

  /** Callback when status toggle is changed */
  onStatusToggle: (dishId: string) => void

  /** Loading state for table data */
  isLoading?: boolean

  /** Empty state message when no dishes exist */
  emptyStateMessage?: string
}
```

### Behavior

- Table is responsive: scrollable on mobile, full width on desktop
- Rows display: name, price, status badge
- Actions column contains: Edit button, Delete button, Status toggle
- Status badge shows color: green for Available, red for SoldOut
- Empty state displayed when dishes array is empty
- Loading spinner displayed during data fetch

### Events

```typescript
interface DishTableEvents {
  /** Emitted when edit button is clicked for a dish */
  onEdit: (dish: Dish) => void

  /** Emitted when delete button is clicked for a dish */
  onDelete: (dishId: string) => void

  /** Emitted when status toggle is clicked */
  onStatusToggle: (dishId: string) => void
}
```

---

## DishStatusBadge Component

### Props

```typescript
interface DishStatusBadgeProps {
  /** Status to display */
  status: DishStatus

  /** Optional custom className for styling */
  className?: string

  /** Size variant for badge */
  size?: 'sm' | 'md' | 'lg'
}
```

### Behavior

- Displays status text: "Disponible" for Available, "Agotado" for SoldOut
- Background color: green (emerald) for Available, red (rose) for SoldOut
- Uses shadcn/ui Badge component
- Includes ARIA label for accessibility

### Visual Variants

```typescript
type StatusVariant = {
  Available: {
    backgroundColor: 'bg-emerald-500'
    textColor: 'text-white'
    text: 'Disponible'
  }
  SoldOut: {
    backgroundColor: 'bg-rose-500'
    textColor: 'text-white'
    text: 'Agotado'
  }
}
```

---

## AvailabilityToggle Component

### Props

```typescript
interface AvailabilityToggleProps {
  /** Current status of dish */
  status: DishStatus

  /** Callback when toggle is clicked */
  onToggle: () => void

  /** Optional disabled state */
  disabled?: boolean

  /** Loading state during toggle operation */
  isLoading?: boolean

  /** Size variant */
  size?: 'sm' | 'md' | 'lg'
}
```

### Behavior

- Toggle switches status between Available and SoldOut
- Visual feedback during loading (spinner or disabled state)
- Immediate update on click (no confirmation for MVP)
- Uses shadcn/ui Button or Switch component
- ARIA label indicates current and next status

---

## EmptyState Component

### Props

```typescript
interface EmptyStateProps {
  /** Message to display */
  message: string

  /** Optional icon or illustration */
  icon?: React.ReactNode

  /** Optional action button (e.g., "Create First Dish") */
  action?: {
    label: string
    onClick: () => void
  }

  /** Size variant */
  size?: 'sm' | 'md' | 'lg'
}
```

### Behavior

- Centered content with message
- Optional icon displayed above message
- Action button (if provided) styled prominently
- Uses shadcn/ui Card component
- Responsive spacing for mobile/desktop

---

## Navigation Component

### Props

```typescript
interface NavigationProps {
  /** Currently active route/section */
  activeRoute: 'dashboard' | 'menu' | 'settings'

  /** Callback when navigation item is clicked */
  onNavigate: (route: 'dashboard' | 'menu' | 'settings') => void

  /** Optional logo or brand display */
  logo?: string | React.ReactNode
}
```

### Behavior

- Displays navigation links: Dashboard, Menu, Settings
- Active route highlighted visually
- Responsive: may collapse to hamburger menu on mobile
- Uses shadcn/ui components (Button, Card)

---

## Toast/Notification Component

### Props

```typescript
interface ToastProps {
  /** Message to display */
  message: string

  /** Type of notification */
  type: 'success' | 'error' | 'info' | 'warning'

  /** Auto-dismiss duration in milliseconds (0 for manual dismiss) */
  duration?: number

  /** Callback when toast is dismissed */
  onDismiss?: () => void

  /** Position on screen */
  position?: 'top-right' | 'top-center' | 'bottom-right'
}
```

### Visual Variants

```typescript
type ToastVariant = {
  success: {
    backgroundColor: 'bg-emerald-500'
    icon: '✓'
  }
  error: {
    backgroundColor: 'bg-rose-500'
    icon: '✕'
  }
  info: {
    backgroundColor: 'bg-blue-500'
    icon: 'ℹ'
  }
  warning: {
    backgroundColor: 'bg-amber-500'
    icon: '⚠'
  }
}
```

### Behavior

- Auto-dismisses after duration (default 5000ms)
- Manual dismiss via close button
- Can display multiple toasts (stacked)
- Smooth enter/exit animations
