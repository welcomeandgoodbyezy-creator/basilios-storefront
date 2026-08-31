'use client'

import { useEffect, useRef } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

export type StorePoint = {
  id: number
  name: string
  address: string
  latitude: number
  longitude: number
}

export default function StoreMap({ stores }: { stores: StorePoint[] }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<L.Map | null>(null)

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return

    const map = L.map(containerRef.current, { scrollWheelZoom: true })
    mapRef.current = map

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
      maxZoom: 19,
    }).addTo(map)

    const markers = stores.map((store) =>
      L.circleMarker([store.latitude, store.longitude], {
        radius: 10,
        color: '#d48c00',
        weight: 3,
        fillColor: '#f5f0e6',
        fillOpacity: 0.9,
      })
        .addTo(map)
        .bindPopup(`<strong>${store.name}</strong><br/>${store.address}`)
    )

    if (markers.length > 0) {
      map.fitBounds(L.featureGroup(markers).getBounds().pad(0.2))
    } else {
      map.setView([40.7128, -74.006], 12)
    }

    return () => {
      map.remove()
      mapRef.current = null
    }
  }, [stores])

  return <div ref={containerRef} className="w-full h-full" />
}