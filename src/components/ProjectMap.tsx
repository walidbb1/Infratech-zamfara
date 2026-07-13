import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import { Project } from '../types';
import { MapPin, ExternalLink, CheckCircle2, Clock } from 'lucide-react';

interface ProjectMapProps {
  projects: Project[];
  onSelectProject: (project: Project) => void;
}

export const ProjectMap: React.FC<ProjectMapProps> = ({ projects, onSelectProject }) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      // Initialize map centered on Zamfara State
      const map = L.map(mapContainerRef.current, {
        center: [12.35, 6.35],
        zoom: 9,
        zoomControl: true,
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | Zamfara State InfraTech',
        maxZoom: 18,
      }).addTo(map);

      mapInstanceRef.current = map;
    }

    const map = mapInstanceRef.current;

    // Clear existing markers (if any)
    map.eachLayer((layer) => {
      if (layer instanceof L.Marker) {
        map.removeLayer(layer);
      }
    });

    // Add markers for projects
    projects.forEach((project) => {
      if (project.lat && project.lng) {
        // Custom colored marker based on status
        const statusColor = 
          project.status === 'Completed' ? '#10b981' : 
          project.status === 'In Progress' ? '#3b82f6' : '#f59e0b';

        const customIcon = L.divIcon({
          className: 'custom-leaflet-marker',
          html: `<div style="background-color: ${statusColor}; width: 28px; height: 28px; border-radius: 50%; border: 2px solid white; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.3); color: white; font-weight: bold; font-size: 11px;">📍</div>`,
          iconSize: [28, 28],
          iconAnchor: [14, 14],
        });

        const marker = L.marker([project.lat, project.lng], { icon: customIcon }).addTo(map);

        const popupContent = document.createElement('div');
        popupContent.className = 'p-3 bg-slate-900 text-white rounded-xl max-w-xs space-y-2 font-sans';
        popupContent.innerHTML = `
          <div class="flex items-center justify-between">
            <span class="text-[10px] font-mono px-2 py-0.5 bg-emerald-900/80 text-emerald-300 rounded">${project.id}</span>
            <span class="text-[10px] px-2 py-0.5 bg-blue-900/80 text-blue-300 rounded">${project.lga} LGA</span>
          </div>
          <h4 class="font-bold text-sm text-white line-clamp-1">${project.title}</h4>
          <p class="text-xs text-slate-300 line-clamp-2">${project.description}</p>
          <div class="flex justify-between items-center text-xs pt-1 border-t border-slate-800">
            <span class="font-mono text-emerald-400 font-bold">${project.budget}</span>
            <span class="font-semibold text-slate-200">${project.progress}% Done</span>
          </div>
          <button id="btn-popup-${project.id}" class="w-full mt-2 bg-emerald-600 hover:bg-emerald-500 text-white py-1.5 px-3 rounded-lg text-xs font-medium transition-colors text-center block">
            View Full Project Details
          </button>
        `;

        marker.bindPopup(popupContent);

        marker.on('popupopen', () => {
          const btn = document.getElementById(`btn-popup-${project.id}`);
          if (btn) {
            btn.onclick = () => {
              onSelectProject(project);
            };
          }
        });
      }
    });

    return () => {
      // Don't destroy map on every render to prevent re-init bugs
    };
  }, [projects, onSelectProject]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  return (
    <div className="relative w-full h-[600px] rounded-2xl overflow-hidden border border-slate-800 shadow-2xl bg-slate-950">
      <div ref={mapContainerRef} className="w-full h-full z-10" />
      
      {/* Map Legend Overlay */}
      <div className="absolute bottom-4 left-4 z-20 bg-slate-900/95 backdrop-blur border border-slate-800 p-3 rounded-xl shadow-lg text-xs space-y-2">
        <div className="font-bold text-white mb-1">Project Status Legend</div>
        <div className="flex items-center space-x-2 text-slate-300">
          <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />
          <span>Completed ({projects.filter(p => p.status === 'Completed').length})</span>
        </div>
        <div className="flex items-center space-x-2 text-slate-300">
          <span className="w-3 h-3 rounded-full bg-blue-500 inline-block" />
          <span>In Progress ({projects.filter(p => p.status === 'In Progress').length})</span>
        </div>
        <div className="flex items-center space-x-2 text-slate-300">
          <span className="w-3 h-3 rounded-full bg-amber-500 inline-block" />
          <span>Planning / Delayed ({projects.filter(p => p.status === 'Planning' || p.status === 'Delayed').length})</span>
        </div>
      </div>
    </div>
  );
};
