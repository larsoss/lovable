import { useState, useMemo } from 'react'
import { Header } from './Header'
import { RoomTabs } from './RoomTabs'
import { TilesGrid } from './TilesGrid'
import { SettingsPanel } from '@/components/settings/SettingsPanel'
import { useHA } from '@/hooks/useHAClient'
import { getDomain } from '@/lib/utils'
import { Wifi, Activity } from 'lucide-react'
import type { HassEntity } from '@/types/ha-types'

const TILE_DOMAINS = new Set([
  'light', 'switch', 'input_boolean', 'climate', 'lock', 'cover', 'sensor', 'binary_sensor',
])

function ConnectingScreen() {
  return (
    <div className="flex flex-col items-center justify-center min-h-dvh text-ios-secondary">
      <Wifi className="w-12 h-12 mb-4 animate-pulse" />
      <p className="text-base font-medium text-ios-label">Connecting to Home Assistant…</p>
      <p className="text-sm mt-1">This may take a moment</p>
    </div>
  )
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-ios-secondary px-8 text-center">
      <Activity className="w-12 h-12 mb-4 opacity-40" />
      <p className="text-base font-medium">No entities here</p>
      <p className="text-sm mt-1 opacity-70">
        Add entities to areas in Home Assistant, or use Settings to assign them
      </p>
    </div>
  )
}

// ── Home View: all areas as sections ────────────────────────────────────────

function HomeView() {
  const { haAreas, customAreas, entities, resolveEntityArea } = useHA()

  const allAreas = useMemo(() => [
    ...haAreas.map((a) => ({ area_id: a.area_id, name: a.name })),
    ...customAreas,
  ], [haAreas, customAreas])

  const getAreaEntities = (areaId: string): HassEntity[] =>
    Object.values(entities).filter(
      (e) => TILE_DOMAINS.has(getDomain(e.entity_id)) && resolveEntityArea(e.entity_id) === areaId
    )

  const unassigned = useMemo(
    () =>
      Object.values(entities).filter(
        (e) => TILE_DOMAINS.has(getDomain(e.entity_id)) && !resolveEntityArea(e.entity_id)
      ),
    [entities, resolveEntityArea]
  )

  const areasWithEntities = allAreas.filter((a) => getAreaEntities(a.area_id).length > 0)

  if (areasWithEntities.length === 0 && unassigned.length === 0) {
    return <EmptyState />
  }

  return (
    <div className="pb-8">
      {areasWithEntities.map((area) => {
        const areaEntities = getAreaEntities(area.area_id)
        return (
          <div key={area.area_id}>
            <div className="flex items-baseline gap-2 px-4 pt-5 pb-2">
              <h2 className="text-base font-bold text-ios-label">{area.name}</h2>
              <span className="text-xs text-ios-secondary">{areaEntities.length}</span>
            </div>
            <TilesGrid entities={areaEntities} />
          </div>
        )
      })}

      {unassigned.length > 0 && (
        <div>
          <div className="flex items-baseline gap-2 px-4 pt-5 pb-2">
            <h2 className="text-base font-bold text-ios-secondary">Other</h2>
            <span className="text-xs text-ios-secondary">{unassigned.length}</span>
          </div>
          <TilesGrid entities={unassigned} />
        </div>
      )}
    </div>
  )
}

// ── Dashboard ────────────────────────────────────────────────────────────────

export function Dashboard() {
  const { status, entities, resolveEntityArea } = useHA()
  const [activeTab, setActiveTab] = useState('home')
  const [showSettings, setShowSettings] = useState(false)

  const filteredEntities = useMemo<HassEntity[]>(() => {
    if (activeTab === 'home') return []
    return Object.values(entities).filter(
      (e) => TILE_DOMAINS.has(getDomain(e.entity_id)) && resolveEntityArea(e.entity_id) === activeTab
    )
  }, [entities, resolveEntityArea, activeTab])

  if (status === 'connecting' || status === 'authenticating' || status === 'disconnected') {
    return <ConnectingScreen />
  }

  if (showSettings) {
    return <SettingsPanel onClose={() => setShowSettings(false)} />
  }

  return (
    <div className="min-h-dvh max-w-screen-2xl mx-auto">
      <Header onSettingsClick={() => setShowSettings(true)} />
      <RoomTabs activeTab={activeTab} onTabChange={setActiveTab} />
      {activeTab === 'home'
        ? <HomeView />
        : filteredEntities.length > 0
          ? <TilesGrid entities={filteredEntities} className="pt-3" />
          : <EmptyState />
      }
    </div>
  )
}
