> **⚠️ AI Hobby Project — Work in Progress**
> Built with Claude AI. Actively under development — expect changes and occasional rough edges.

---

# HomeKit Dashboard — Home Assistant Add-on

A HomeKit-inspired dashboard for Home Assistant. Shows all your entities as glassmorphism tiles organized by area, with full customization.

## Features

- **Area-based Home view** — entities grouped by room, just like Apple Home
- **Glassmorphism tiles** — frosted glass effect with configurable opacity
- **Real-time updates** — WebSocket connection for instant state changes
- **Zero configuration** — auto-connects via HA Supervisor token
- **All entity types** — lights (brightness), thermostats, locks, switches, covers, sensors
- **Fully customizable** — accent color, tile style, shape, size, icon size, opacity
- **Custom entity icons** — pick any icon from 42 options per entity
- **Responsive** — works on desktop, tablet, and mobile

## Installation

1. In Home Assistant go to **Settings → Add-ons → Add-on Store**
2. Click the **⋮** menu → **Repositories**
3. Add: `https://github.com/larsoss/lovable`
4. Find **HomeKit Dashboard** → **Install** → **Start**
5. The dashboard appears in your HA sidebar

## Customization (Settings ⚙️)

### Areas tab
- Assign entities to rooms (auto-imported from HA area registry)
- Create custom areas
- Tap any entity's icon to pick a custom icon

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

## Usage

- **Tap** a light/switch/lock/cover tile → toggle
- **Long-press** a light or cover → brightness/position slider
- **Tap** a thermostat → temperature & mode dialog
- **Tap** a lock → unlock confirmation dialog

## Development

```bash
# Proxy server (requires SUPERVISOR_TOKEN)
cd server && npm install && SUPERVISOR_TOKEN=your_token node server.js

# React dev server
cd app && npm install && npm run dev
```
