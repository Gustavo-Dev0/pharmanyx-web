# Sidebar Submenu Implementation

## Overview
Updated the sidebar component to support nested submenus with expand/collapse functionality, specifically for the Settings section.

## Changes Made

### 1. TypeScript Component (`sidebar.ts`)
- **Added NavItem Interface**: Created a typed interface for navigation items with support for:
  - `label`: Display name
  - `icon`: Material icon name
  - `path`: Route path (optional for parent items)
  - `active`: Active state
  - `expanded`: Expansion state for items with submenus
  - `subItems`: Array of child navigation items

- **Updated navItems Signal**: Changed from untyped array to `signal<NavItem[]>`

- **Added Settings Submenu**: 
  - Settings now has a `subItems` array
  - Includes "Branches" submenu item with path `settings/branches`
  - Ready to add more settings submenus

- **Added toggleSubmenu() Method**: 
  - Toggles the `expanded` state of items with submenus
  - Updates the signal to trigger re-render

### 2. HTML Template (`sidebar.html`)
- **Conditional Rendering**: 
  - Items with submenus render differently than regular items
  - Parent items show expand/collapse arrow icon
  
- **Expand/Collapse Icon**:
  - Uses `expand_more` Material icon
  - Rotates 180° when expanded using CSS transform
  - Smooth transition animation

- **Submenu Container**:
  - Indented with `ml-4` for visual hierarchy
  - Animated fade-in effect when expanding
  - Each submenu item has its own router link and active state

- **Regular Items**: 
  - Unchanged behavior for items without submenus
  - Maintains exact routing and active states

### 3. CSS Styles (`sidebar.css`)
- **Fade-in Animation**:
  - Smooth 0.2s ease-out animation
  - Combines opacity and translateY for polished effect
  - Applied to submenu container when expanded

## Features

### ✅ Expandable Submenus
- Click on Settings to expand/collapse submenu
- Visual indicator (arrow) shows current state
- Smooth animations for better UX

### ✅ Nested Navigation
- Submenu items maintain full router functionality
- Active state highlighting works for both parent and child routes
- Proper indentation for visual hierarchy

### ✅ Scalable Structure
- Easy to add more submenus to Settings
- Can add submenus to other menu items
- Type-safe with TypeScript interface

## How to Add More Submenus

To add more items to the Settings submenu, simply add to the `subItems` array:

```typescript
{
  label: 'Settings',
  icon: 'settings',
  path: 'settings',
  expanded: false,
  subItems: [
    { label: 'Branches', icon: 'store', path: 'settings/branches' },
    { label: 'Users', icon: 'people', path: 'settings/users' },
    { label: 'Roles', icon: 'admin_panel_settings', path: 'settings/roles' },
    // Add more here...
  ]
}
```

## Current Menu Structure

```
📊 Dashboard
📦 Products
📋 Inventory
💰 Sales
📈 Reports
⚙️ Settings (expandable)
  └── 🏪 Branches
```

## Next Steps
1. The sidebar now supports the branches submenu
2. Navigate to Settings → Branches to access the branches management page
3. Add more settings pages as needed following the same pattern
