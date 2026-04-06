import type { HassEntity } from '@/types/ha-types'
import { getDomain } from '@/lib/utils'
import { LightTile } from '@/components/tiles/LightTile'
import { SwitchTile } from '@/components/tiles/SwitchTile'
import { ThermostatTile } from '@/components/tiles/ThermostatTile'
import { LockTile } from '@/components/tiles/LockTile'
import { CoverTile } from '@/components/tiles/CoverTile'
import { SensorTile } from '@/components/tiles/SensorTile'
import { BaseTile } from '@/components/tiles/BaseTile'
import { useHA } from '@/hooks/useHAClient'
import { GRID_COLS } from '@/lib/theme-storage'
import { Activity } from 'lucide-react'
import { cn } from '@/lib/utils'

const SUPPORTED_DOMAINS = new Set([
  'light', 'switch', 'input_boolean', 'climate', 'lock', 'cover', 'sensor', 'binary_sensor',
])

function Tile({ entity }: { entity: HassEntity }) {
  const domain = getDomain(entity.entity_id)
  switch (domain) {
    case 'light':         return <LightTile entityId={entity.entity_id} />
    case 'switch':
    case 'input_boolean': return <SwitchTile entityId={entity.entity_id} />
    case 'climate':       return <ThermostatTile entityId={entity.entity_id} />
    case 'lock':          return <LockTile entityId={entity.entity_id} />
    case 'cover':         return <CoverTile entityId={entity.entity_id} />
    case 'sensor':
    case 'binary_sensor': return <SensorTile entityId={entity.entity_id} />
    default:
      return (
        <BaseTile
          icon={<Activity className="w-full h-full" />}
          label={entity.entity_id}
          sublabel={entity.state}
        />
      )
  }
}

interface TilesGridProps {
  entities: HassEntity[]
  className?: string
}

export function TilesGrid({ entities, className }: TilesGridProps) {
  const { theme } = useHA()
  const visible = entities.filter((e) => SUPPORTED_DOMAINS.has(getDomain(e.entity_id)))

  if (visible.length === 0) return null

  return (
    <div className={cn('grid gap-2 sm:gap-3 px-4', GRID_COLS[theme.tileSize], className)}>
      {visible.map((entity) => (
        <Tile key={entity.entity_id} entity={entity} />
      ))}
    </div>
  )
}
