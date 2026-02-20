import type { StylesheetStyle } from 'cytoscape';
import type { ClusterType, RelationshipType } from '../data/types';

// CRITICAL: All nodes MUST be exactly 40px diameter
const FIXED_NODE_SIZE = 50; // Increased from 40 to 50 for better visibility

// Muted color palette (professional earth tones)
export const CLUSTER_COLORS: Record<ClusterType, string> = {
  c_family: '#8b5a5a',      // Muted red-brown
  jvm_dotnet: '#5a7d8b',    // Muted blue
  js_engines: '#8b7d5a',    // Muted orange-brown
  functional: '#6b5a8b',    // Muted purple
  systems: '#5a8b7d',       // Muted teal
  scripting: '#5a8b6b',     // Muted green
  compilers: '#7d7d7d',     // Muted gray
  other: '#545454',         // Dark gray
};

export const RELATIONSHIP_COLORS: Record<RelationshipType, string> = {
  compiler_written_in: '#c45a5a',    // Muted red
  runtime_written_in: '#5a7d9b',     // Muted blue
  bootstrap_written_in: '#5a9b7d',   // Muted green
  rewritten_in: '#9b7d5a',           // Muted orange
};

export function getCytoscapeStyle(
  clusterColoring: boolean,
  _showAllLabels: boolean // Unused, kept for API compatibility
): StylesheetStyle[] {
  return [
    // Base node style - FIXED 40px size
    {
      selector: 'node',
      style: {
        width: FIXED_NODE_SIZE,
        height: FIXED_NODE_SIZE,
        'background-color': (ele: any) => {
          if (clusterColoring) {
            const cluster = ele.data('cluster') as ClusterType;
            return CLUSTER_COLORS[cluster] || CLUSTER_COLORS.other;
          }
          return '#7d7d7d'; // Default gray if no cluster coloring
        },
        'border-width': 3,
        'border-color': '#fff',
        'border-opacity': 0.8,
        'font-size': '12px',
        'font-weight': 600 as any,
        'color': '#fff',
        'text-valign': 'center',
        'text-halign': 'center',
        'text-outline-width': 3,
        'text-outline-color': '#000',
        'text-outline-opacity': 0.9,
        'min-zoomed-font-size': 10,
        label: 'data(label)', // Always show label
      },
    },

    // Labels are now always shown in base style above

    // Selected node highlight
    {
      selector: 'node.highlighted',
      style: {
        'border-width': 4,
        'border-color': '#fff',
        'border-opacity': 1,
        'z-index': 1000,
      },
    },

    // Faded nodes (when focus mode is active)
    {
      selector: 'node.faded',
      style: {
        opacity: 0.2,
      },
    },

    // Base edge style
    {
      selector: 'edge',
      style: {
        width: 2,
        'line-color': (ele: any) => {
          const relationship = ele.data('relationship') as RelationshipType;
          return RELATIONSHIP_COLORS[relationship] || '#999';
        },
        'target-arrow-color': (ele: any) => {
          const relationship = ele.data('relationship') as RelationshipType;
          return RELATIONSHIP_COLORS[relationship] || '#999';
        },
        'target-arrow-shape': 'triangle',
        'curve-style': 'bezier',
        opacity: (ele: any) => {
          const confidence = ele.data('confidence') as number;
          // Map confidence 0.0-1.0 to opacity 0.3-1.0
          return Math.max(0.3, confidence);
        },
        'arrow-scale': 1.2,
      },
    },

    // Highlighted edges (when focus mode is active)
    {
      selector: 'edge.highlighted',
      style: {
        width: 3,
        opacity: 1,
        'z-index': 999,
      },
    },

    // Faded edges (when focus mode is active)
    {
      selector: 'edge.faded',
      style: {
        opacity: 0.1,
      },
    },

    // Self-loop edges (special curve)
    {
      selector: 'edge[source = target]',
      style: {
        'curve-style': 'loop' as any,
        'loop-direction': '0deg' as any,
        'loop-sweep': '60deg' as any,
        'control-point-distance': 50 as any,
      },
    },
  ];
}
