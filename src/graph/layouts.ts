import type { LayoutOptions } from 'cytoscape';

// Deterministic random seed for reproducible layouts
const RANDOM_SEED = 42;

// DAG (Directed Acyclic Graph) layout - hierarchical top-down
export const DAG_LAYOUT: LayoutOptions = {
  name: 'breadthfirst',
  directed: true,
  padding: 50,
  spacingFactor: 1.5,
  avoidOverlap: true,
  nodeDimensionsIncludeLabels: true,
  animate: false,
  animationDuration: 500,
  animationEasing: 'ease-out',
};

// Force-directed layout - organic clustering
export const FORCE_LAYOUT: any = {
  name: 'cose-bilkent',
  randomize: false,
  animate: true,
  animationDuration: 1500,
  animationEasing: 'ease-in-out',
  // Quality settings
  quality: 'default',
  nodeDimensionsIncludeLabels: true,
  // Repulsion and attraction - increased spacing
  nodeRepulsion: 12000, // Increased for more spacing
  idealEdgeLength: 150, // Increased for better spread
  edgeElasticity: 0.45,
  nestingFactor: 0.1,
  gravity: 0.2, // Reduced gravity for less clumping
  numIter: 3000, // More iterations for better layout
  // Deterministic
  randomizationSeed: RANDOM_SEED,
  // Layout boundaries
  tile: true,
  tilingPaddingVertical: 40,
  tilingPaddingHorizontal: 40,
};
