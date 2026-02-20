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
  animationDuration: 1000,
  animationEasing: 'ease-out',
  // Quality settings
  quality: 'default',
  nodeDimensionsIncludeLabels: true,
  // Repulsion and attraction
  nodeRepulsion: 8000,
  idealEdgeLength: 100,
  edgeElasticity: 0.45,
  nestingFactor: 0.1,
  gravity: 0.25,
  numIter: 2500,
  // Deterministic
  randomizationSeed: RANDOM_SEED,
  // Layout boundaries
  tile: true,
  tilingPaddingVertical: 20,
  tilingPaddingHorizontal: 20,
};
