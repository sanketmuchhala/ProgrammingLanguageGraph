import type { StylesheetStyle } from 'cytoscape';
import type { ClusterType, RelationshipType } from '../data/types';

const MIN_NODE_SIZE = 50;
const MAX_NODE_SIZE = 110;
const DEFAULT_NODE_COLOR = '#42a5f5';

export const CLUSTER_COLORS: Record<ClusterType, string> = {
  c_family: '#ef5350',
  jvm_dotnet: '#42a5f5',
  js_engines: '#ffa726',
  functional: '#ab47bc',
  systems: '#26a69a',
  scripting: '#66bb6a',
  compilers: '#78909c',
  other: '#90a4ae',
  clr: '#5c6bc0',
  dynamic: '#66bb6a',
  historical: '#ffa726',
  jvm: '#42a5f5',
  roots: '#78909c',
  scientific: '#29b6f6',
  tools: '#78909c',
};

export const RELATIONSHIP_COLORS: Record<RelationshipType, string> = {
  compiler_written_in: '#ef5350',
  runtime_written_in: '#42a5f5',
  bootstrap_written_in: '#26a69a',
  rewritten_in: '#ffa726',
  influenced: '#90a4ae',
  influenced_by: '#90a4ae',
  transpiled_to: '#ab47bc',
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
  _showAllLabels: boolean,
  isDarkMode: boolean = false
): StylesheetStyle[] {
  const labelColor = isDarkMode ? '#e6edf3' : '#1a1b1e';
  const labelOutlineColor = isDarkMode ? '#0d1117' : '#ffffff';
  const parentBorderColor = isDarkMode ? '#30363d' : '#e2e5e9';
  const parentTextColor = isDarkMode ? '#8b949e' : '#5c6370';

  return [
    // Base node style
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
        'border-width': 2,
        'border-color': '#00000020',
        'border-opacity': 1,
        'font-size': 'mapData(degree, 0, 30, 10, 16)' as any,
        'font-weight': 600 as any,
        'color': labelColor,
        'text-valign': 'bottom',
        'text-halign': 'center',
        'text-margin-y': 8,
        'text-outline-width': 2,
        'text-outline-color': labelOutlineColor,
        'text-outline-opacity': 0.8,
        'min-zoomed-font-size': 8,
        label: 'data(label)',
        'text-wrap': 'wrap' as any,
        'text-max-width': 'mapData(degree, 0, 30, 70, 130)' as any,
      },
    },

    // TODO: Logo display in graph nodes - commented out for now, will show logos in sidebar instead
    // Nodes with logos: use logo's dominant color as background
    // {
    //   selector: 'node[logoUrl][logoColor]',
    //   style: {
    //     'background-color': ((ele: any) => {
    //       const logoColor = ele.data('logoColor');
    //       if (!logoColor) {
    //         // No color defined - use inverted theme color for contrast
    //         return isDarkMode ? '#ffffff' : '#1c2128';
    //       }
    //       return logoColor;
    //     }) as any,
    //     'background-image': 'data(logoUrl)' as any,
    //     'background-fit': 'contain' as any,
    //     'background-clip': 'node' as any,
    //     'background-width': '80%' as any,
    //     'background-height': '80%' as any,
    //     'background-image-opacity': 1,
    //     'background-position-x': '50%' as any,
    //     'background-position-y': '50%' as any,
    //     'background-offset-x': 0,
    //     'background-offset-y': 0,
    //     'border-width': 2,
    //     'border-color': isDarkMode ? '#ffffff20' : '#00000015',
    //     'border-opacity': 1,
    //   },
    // },

    // Nodes with logos but no logoColor defined: use inverted theme color
    // {
    //   selector: 'node[logoUrl][!logoColor]',
    //   style: {
    //     'background-color': isDarkMode ? '#ffffff' : '#1c2128',
    //     'background-image': 'data(logoUrl)' as any,
    //     'background-fit': 'contain' as any,
    //     'background-clip': 'node' as any,
    //     'background-width': '80%' as any,
    //     'background-height': '80%' as any,
    //     'background-image-opacity': 1,
    //     'background-position-x': '50%' as any,
    //     'background-position-y': '50%' as any,
    //     'background-offset-x': 0,
    //     'background-offset-y': 0,
    //     'border-width': 2,
    //     'border-color': isDarkMode ? '#30363d' : '#e2e5e9',
    //     'border-opacity': 1,
    //   },
    // },

    // Compound parent nodes (cluster layout)
    {
      selector: ':parent',
      style: {
        'background-opacity': 0.06,
        'background-color': ((ele: any) => {
          const id = ele.id().replace('cluster:', '') as ClusterType;
          return CLUSTER_COLORS[id] || '#999';
        }) as any,
        'border-width': 1,
        'border-color': parentBorderColor,
        'border-opacity': 0.6,
        label: 'data(label)',
        'font-size': '14px',
        'text-valign': 'top' as any,
        'text-halign': 'center',
        color: parentTextColor,
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

    // Hovered node
    {
      selector: 'node.hovered',
      style: {
        label: 'data(label)' as any,
        'border-width': 3,
        'border-color': isDarkMode ? '#ffffff40' : '#00000030',
        'border-opacity': 1,
        'z-index': 1001,
      },
    },

    // Selected/highlighted node
    {
      selector: 'node.highlighted',
      style: {
        'border-width': 3,
        'border-color': isDarkMode ? '#ffffff40' : '#00000030',
        'border-opacity': 1,
        'z-index': 1000,
      },
    },

    // Attribute-faded nodes
    {
      selector: 'node.attribute-faded',
      style: {
        opacity: 0.15,
      },
    },

    // Faded nodes (focus mode)
    {
      selector: 'node.faded',
      style: {
        opacity: 0.15,
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
          return RELATIONSHIP_COLORS[relationship] || '#90a4ae';
        }) as any,
        'line-style': ((ele: any) => {
          const relationship = ele.data('relationship') as RelationshipType;
          return RELATIONSHIP_LINE_STYLES[relationship] || 'solid';
        }) as any,
        'line-dash-pattern': [6, 3] as any,
        'target-arrow-color': ((ele: any) => {
          const relationship = ele.data('relationship') as RelationshipType;
          return RELATIONSHIP_COLORS[relationship] || '#90a4ae';
        }) as any,
        'target-arrow-shape': 'triangle',
        'curve-style': 'bezier',
        opacity: ((ele: any) => {
          const confidence = ele.data('confidence') as number;
          if (confidence >= 0.9) return 0.7;
          if (confidence >= 0.7) return 0.5;
          return 0.3;
        }) as any,
        'arrow-scale': 1.0,
      },
    },

    // Highlighted edges
    {
      selector: 'edge.highlighted',
      style: {
        width: 3,
        opacity: 1,
        'z-index': 999,
      },
    },

    // Attribute-faded edges
    {
      selector: 'edge.attribute-faded',
      style: {
        opacity: 0.06,
      },
    },

    // Faded edges (focus mode)
    {
      selector: 'edge.faded',
      style: {
        opacity: 0.06,
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

    // Self-loop edges
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
