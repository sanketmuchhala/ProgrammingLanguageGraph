import type { StylesheetStyle } from 'cytoscape';
import type { ClusterType, RelationshipType } from '../data/types';

// Node size range based on degree centrality
const MIN_NODE_SIZE = 40;
const MAX_NODE_SIZE = 100;
const DEFAULT_NODE_COLOR = '#5a7d8b';

// Muted color palette (professional earth tones)
export const CLUSTER_COLORS: Record<ClusterType, string> = {
  // v2 clusters (legacy)
  c_family: '#8b5a5a',
  jvm_dotnet: '#5a7d8b',
  js_engines: '#8b7d5a',
  functional: '#6b5a8b',
  systems: '#5a8b7d',
  scripting: '#5a8b6b',
  compilers: '#7d7d7d',
  other: '#545454',
  // v4 clusters
  clr: '#5a7d8b',
  dynamic: '#5a8b6b',
  historical: '#8b7d5a',
  jvm: '#5a7d8b',
  roots: '#7d7d7d',
  scientific: '#6b5a8b',
  tools: '#7d7d7d',
};

export const RELATIONSHIP_COLORS: Record<RelationshipType, string> = {
  compiler_written_in: '#c45a5a',
  runtime_written_in: '#5a7d9b',
  bootstrap_written_in: '#5a9b7d',
  rewritten_in: '#9b7d5a',
  influenced: '#8b8b5a',
  influenced_by: '#8b8b5a',
  transpiled_to: '#9b5a9b',
};

export const RELATIONSHIP_LINE_STYLES: Record<RelationshipType, string> = {
  compiler_written_in: 'solid',
  runtime_written_in: 'solid',
  bootstrap_written_in: 'dashed',
  rewritten_in: 'dashed',
  influenced: 'dotted',
  influenced_by: 'dotted',
  transpiled_to: 'dashed',
};

export function getCytoscapeStyle(
  clusterColoring: boolean,
  _showAllLabels: boolean
): StylesheetStyle[] {
  return [
    // Base node style - degree-based sizing
    {
      selector: 'node',
      style: {
        width: `mapData(degree, 0, 30, ${MIN_NODE_SIZE}, ${MAX_NODE_SIZE})` as any,
        height: `mapData(degree, 0, 30, ${MIN_NODE_SIZE}, ${MAX_NODE_SIZE})` as any,
        'background-color': clusterColoring
          ? ((ele: any) => {
              const cluster = ele.data('cluster') as ClusterType;
              return CLUSTER_COLORS[cluster] || DEFAULT_NODE_COLOR;
            })
          : DEFAULT_NODE_COLOR,
        'border-width': 3,
        'border-color': '#fff',
        'border-opacity': 0.8,
        'font-size': 'mapData(degree, 0, 30, 9, 14)' as any,
        'font-weight': 700 as any,
        'color': '#fff',
        'text-valign': 'center',
        'text-halign': 'center',
        'text-outline-width': 3,
        'text-outline-color': '#000',
        'text-outline-opacity': 0.9,
        'min-zoomed-font-size': 8,
        label: 'data(label)',
        'text-wrap': 'wrap' as any,
        'text-max-width': 'mapData(degree, 0, 30, 60, 110)' as any,
      },
    },

    // Compound parent nodes (cluster layout)
    {
      selector: ':parent',
      style: {
        'background-opacity': 0.08,
        'background-color': ((ele: any) => {
          const id = ele.id().replace('cluster:', '') as ClusterType;
          return CLUSTER_COLORS[id] || '#ddd';
        }) as any,
        'border-width': 1,
        'border-color': '#ccc',
        'border-opacity': 0.5,
        label: 'data(label)',
        'font-size': '14px',
        'text-valign': 'top' as any,
        'text-halign': 'center',
        color: '#666',
        'text-outline-width': 0,
        shape: 'roundrectangle' as any,
        padding: '20px' as any,
      },
    },

    // Hidden labels (zoom-dependent)
    {
      selector: 'node.labels-hidden',
      style: {
        label: '' as any,
      },
    },

    // Hovered node (always show label, bring to front)
    {
      selector: 'node.hovered',
      style: {
        label: 'data(label)' as any,
        'border-width': 4,
        'border-color': '#fff',
        'border-opacity': 1,
        'z-index': 1001,
      },
    },

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
        width: ((ele: any) => {
          const relationship = ele.data('relationship') as RelationshipType;
          return relationship === 'runtime_written_in' ? 1.5 : 2;
        }) as any,
        'line-color': ((ele: any) => {
          const relationship = ele.data('relationship') as RelationshipType;
          return RELATIONSHIP_COLORS[relationship] || '#999';
        }) as any,
        'line-style': ((ele: any) => {
          const relationship = ele.data('relationship') as RelationshipType;
          return RELATIONSHIP_LINE_STYLES[relationship] || 'solid';
        }) as any,
        'line-dash-pattern': [6, 3] as any,
        'target-arrow-color': ((ele: any) => {
          const relationship = ele.data('relationship') as RelationshipType;
          return RELATIONSHIP_COLORS[relationship] || '#999';
        }) as any,
        'target-arrow-shape': 'triangle',
        'curve-style': 'bezier',
        opacity: ((ele: any) => {
          const confidence = ele.data('confidence') as number;
          if (confidence >= 0.9) return 1.0;
          if (confidence >= 0.7) return 0.6;
          return 0.3;
        }) as any,
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

    // Timeline-hidden nodes
    {
      selector: 'node.timeline-hidden',
      style: {
        display: 'none' as any,
      },
    },

    // Timeline-hidden edges
    {
      selector: 'edge.timeline-hidden',
      style: {
        display: 'none' as any,
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
