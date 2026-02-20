import type { CytoscapeOptions } from 'cytoscape';

export const BASE_CYTOSCAPE_CONFIG: Partial<CytoscapeOptions> = {
  // Zoom and pan settings
  minZoom: 0.3,
  maxZoom: 3,
  wheelSensitivity: 0.2,

  // Interaction settings
  autoungrabify: false,
  autounselectify: false,
  boxSelectionEnabled: false,

  // Performance
  hideEdgesOnViewport: false,
  textureOnViewport: false,
  motionBlur: false,

  // Style
  pixelRatio: 'auto',
};
