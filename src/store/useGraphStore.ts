import { create } from 'zustand';
import type { Core } from 'cytoscape';
import type { NormalizedDataset, FilterState, ValidationReport } from '../data/types';
import { DatasetIndex } from '../data/indexDataset';

interface GraphStore {
  // Data
  dataset: NormalizedDataset | null;
  datasetIndex: DatasetIndex | null;
  validationReport: ValidationReport | null;

  // Cytoscape instance
  cy: Core | null;

  // Filters
  filters: FilterState;

  // UI State
  selectedNodeId: string | null;
  selectedEdgeId: string | null;
  sideDrawerOpen: boolean;

  // Actions
  setDataset: (dataset: NormalizedDataset) => void;
  setDatasetIndex: (index: DatasetIndex) => void;
  setValidationReport: (report: ValidationReport) => void;
  setCytoscape: (cy: Core | null) => void;
  updateFilters: (filters: Partial<FilterState>) => void;
  setSelectedNode: (nodeId: string | null) => void;
  setSelectedEdge: (edgeId: string | null) => void;
  setSideDrawerOpen: (open: boolean) => void;
  resetFilters: () => void;
}

const DEFAULT_FILTERS: FilterState = {
  searchQuery: '',
  confidenceThreshold: 0.0,
  relationshipFilters: {
    compiler_written_in: true,
    runtime_written_in: true,
    bootstrap_written_in: true,
    rewritten_in: true,
  },
  showSelfLoops: false,
  clusterColoring: true,
  showAllLabels: false,
  layoutMode: 'dag',
};

export const useGraphStore = create<GraphStore>((set) => ({
  // Initial state
  dataset: null,
  datasetIndex: null,
  validationReport: null,
  cy: null,
  filters: DEFAULT_FILTERS,
  selectedNodeId: null,
  selectedEdgeId: null,
  sideDrawerOpen: false,

  // Actions
  setDataset: (dataset) => set({ dataset }),
  setDatasetIndex: (index) => set({ datasetIndex: index }),
  setValidationReport: (report) => set({ validationReport: report }),
  setCytoscape: (cy) => set({ cy }),

  updateFilters: (newFilters) =>
    set((state) => ({
      filters: { ...state.filters, ...newFilters },
    })),

  setSelectedNode: (nodeId) =>
    set({
      selectedNodeId: nodeId,
      selectedEdgeId: null,
      sideDrawerOpen: nodeId !== null,
    }),

  setSelectedEdge: (edgeId) =>
    set({
      selectedEdgeId: edgeId,
      selectedNodeId: null,
      sideDrawerOpen: edgeId !== null,
    }),

  setSideDrawerOpen: (open) => set({ sideDrawerOpen: open }),

  resetFilters: () => set({ filters: DEFAULT_FILTERS }),
}));
