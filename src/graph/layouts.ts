// Deterministic random seed for reproducible layouts
const RANDOM_SEED = 42;

// Tree layout - vertical hierarchical (top-down)
export const DAG_LAYOUT: any = {
  name: 'breadthfirst',
  directed: true,
  padding: 40,
  spacingFactor: 1.8,
  avoidOverlap: true,
  nodeDimensionsIncludeLabels: true,
  animate: true,
  animationDuration: 500,
  animationEasing: 'ease-out',
  roots: undefined,
  circle: false,
  grid: false,
  // FORCE VERTICAL: top-to-bottom flow
  rankDir: 'TB', // TB = Top to Bottom
  ranker: 'network-simplex',
  fit: true,
};

// Network layout - organic clustering with better proportions
export const FORCE_LAYOUT: any = {
  name: 'cose-bilkent',
  randomize: false,
  animate: true,
  animationDuration: 1500,
  animationEasing: 'ease-in-out',
  // Quality settings
  quality: 'default',
  nodeDimensionsIncludeLabels: true,
  // Repulsion and attraction - better proportions
  nodeRepulsion: 15000, // Higher repulsion for bigger nodes
  idealEdgeLength: 100, // Shorter edges to match bigger nodes
  edgeElasticity: 0.45,
  nestingFactor: 0.1,
  gravity: 0.25, // Slightly more gravity for cohesion
  numIter: 3000, // More iterations for better layout
  // Deterministic
  randomizationSeed: RANDOM_SEED,
  // Layout boundaries
  tile: true,
  tilingPaddingVertical: 50,
  tilingPaddingHorizontal: 50,
};
