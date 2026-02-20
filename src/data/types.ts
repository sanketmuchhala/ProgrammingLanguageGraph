// Core data types from the dataset

export type ClusterType =
  | 'c_family'
  | 'jvm_dotnet'
  | 'js_engines'
  | 'functional'
  | 'systems'
  | 'scripting'
  | 'compilers'
  | 'other';

export type RelationshipType =
  | 'compiler_written_in'
  | 'runtime_written_in'
  | 'bootstrap_written_in'
  | 'rewritten_in';

// Raw dataset types (from JSON)
export interface RawLanguageNode {
  id: string;
  name: string;
  first_release_year: number;
  current_primary_implementation_language: string;
  notes: string;
}

export interface RawImplementation {
  id: string;
  name: string;
  implementation_language: string;
  notes: string;
}

export interface RawEdge {
  from_language: string;
  to_language: string;
  relationship: RelationshipType;
  start_year: number;
  end_year: number | null;
  confidence: number;
  evidence_source: string;
}

export interface RawDataset {
  languages: RawLanguageNode[];
  implementations: RawImplementation[];
  edges: RawEdge[];
}

// Normalized types (after processing)
export interface NormalizedLanguageNode extends RawLanguageNode {
  degree: number;
  cluster: ClusterType;
}

export interface NormalizedEdge extends RawEdge {
  id: string; // Computed unique ID
}

export interface NormalizedDataset {
  languages: NormalizedLanguageNode[];
  implementations: RawImplementation[];
  edges: NormalizedEdge[];
  languageMap: Map<string, NormalizedLanguageNode>;
  edgeMap: Map<string, NormalizedEdge>;
}

// Filter state
export interface FilterState {
  searchQuery: string;
  confidenceThreshold: number;
  relationshipFilters: {
    compiler_written_in: boolean;
    runtime_written_in: boolean;
    bootstrap_written_in: boolean;
    rewritten_in: boolean;
  };
  showSelfLoops: boolean;
  clusterColoring: boolean;
  showAllLabels: boolean;
  layoutMode: 'dag' | 'force';
}

// Cytoscape element types
export interface CytoscapeNodeData {
  id: string;
  label: string;
  name: string;
  first_release_year: number;
  current_primary_implementation_language: string;
  notes: string;
  degree: number;
  cluster: ClusterType;
}

export interface CytoscapeEdgeData {
  id: string;
  source: string;
  target: string;
  relationship: RelationshipType;
  start_year: number;
  end_year: number | null;
  confidence: number;
  evidence_source: string;
}

export interface CytoscapeNode {
  data: CytoscapeNodeData;
  group: 'nodes';
}

export interface CytoscapeEdge {
  data: CytoscapeEdgeData;
  group: 'edges';
}

export type CytoscapeElement = CytoscapeNode | CytoscapeEdge;

// Validation report types
export interface ValidationIssue {
  type: string;
  message: string;
  data?: unknown;
}

export interface ValidationReport {
  missing_nodes_referenced_by_edges: string[];
  duplicate_ids: string[];
  edges_with_missing_fields: RawEdge[];
  nodes_with_missing_fields: RawLanguageNode[];
  edges_confidence_lt_0_8: Array<{
    from_language: string;
    to_language: string;
    confidence: number;
  }>;
  summary: {
    total_languages: number;
    total_edges: number;
    valid_edges: number;
    warnings: number;
  };
}

// Dataset version info
export interface DatasetVersion {
  version: string;
  path: string;
  label: string;
}
