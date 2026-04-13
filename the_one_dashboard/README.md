> **⚠️ AI Hobby Project — Work in Progress**
> Built with Claude AI. Actively under development — expect changes and occasional rough edges.

---

# The-One Dashboard — Home Assistant Add-on

A beautiful, fully customizable Home Assistant dashboard. Shows all your entities as glassmorphism tiles organized by area, with color light controls, edit mode, and real-time updates.

## Features

- **Area cards on Home view** — tap a room card to navigate into that area
- **Glassmorphism tiles** — frosted glass effect with configurable opacity
- **Color light control** — HSV color wheel, presets, brightness & color temp for Hue/color lights
- **Real-time updates** — WebSocket connection for instant state changes
- **Zero configuration** — auto-connects via HA Supervisor token
- **All entity types** — lights, thermostats, locks, switches, covers, sensors
- **Fully customizable** — accent color, tile style, shape, size, icon size, opacity
- **Edit mode** — resize tiles (1×1, 2×1, 1×2, 2×2), reorder by drag, hide entities
- **Favorites** — star any entity to pin it to the top of Home
- **Responsive** — works on desktop, tablet, and mobile

## Installation

1. In Home Assistant go to **Settings → Add-ons → Add-on Store**
2. Click the **⋮** menu → **Repositories**
3. Add: `https://github.com/larsoss/the-onedashboard`
4. Find **The-One Dashboard** → **Install** → **Start**
5. The dashboard appears in your HA sidebar

## Customization (Settings ⚙️)

### Areas tab
- Assign entities to rooms (auto-imported from HA area registry)
- Create custom areas
- Tap any entity's icon to pick a custom icon
- Star entities to add them to Favorites
- Hidden entities shown with a restore button

### Appearance tab
| Setting | Options |
|---------|---------|
| Accent Color | Blue, Teal, Purple, Green, Amber |
| Tile Style | Glass (frosted) · Solid |
| Tile Shape | Square · Rectangle |
| Tile Size | Compact · Normal · Large |
| Icon Size | S · M · L |
| Tile Opacity | 10% – 100% slider |
| Background | Dark · Black · Navy · Slate |

## Edit Mode (✏️ button in header)

- **Resize tiles** — overlay shows 1×1 / 2×1 / 1×2 / 2×2 size buttons
- **Change icon** — tap Icon button on any tile
- **Hide tile** — tap the 👁 button to hide from dashboard (Settings → restore)
- **Drag to reorder** — drag tiles within an area to reorder them
- **Resize room cards** — same resize buttons on Home view area cards

## Usage

- **Tap** a light/switch/lock/cover tile → toggle
- **Long-press** a light → brightness slider
- **Tap** a color light → color wheel dialog (hue, brightness, color temp)
- **Tap** a thermostat → temperature & mode dialog
- **Tap** a lock → unlock confirmation dialog
- **Tap** a room card → navigate into that area

## Development

```bash
# Proxy server (requires SUPERVISOR_TOKEN)
cd server && npm install && SUPERVISOR_TOKEN=your_token node server.js

# React dev server
cd app && npm install && npm run dev
```
