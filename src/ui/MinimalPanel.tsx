import { useGraphStore } from '../store/useGraphStore';
import { SearchBox } from './SearchBox';
import { Slider } from './Slider';
import { Toggle } from './Toggle';
import { RelationshipFilters } from './RelationshipFilters';
import type { RelationshipType } from '../data/types';
import './MinimalPanel.css';

export function MinimalPanel() {
  const { filters, validationReport, updateFilters } = useGraphStore();

  const handleLayoutChange = (mode: 'dag' | 'force') => {
    updateFilters({ layoutMode: mode });
  };

  const handleRelationshipFilter = (relationship: RelationshipType, enabled: boolean) => {
    updateFilters({
      relationshipFilters: {
        ...filters.relationshipFilters,
        [relationship]: enabled,
      },
    });
  };

  const hasWarnings = validationReport && validationReport.summary.warnings > 0;

  return (
    <aside className="minimal-panel">
      <header className="panel-header">
        <h1>Language Lineage</h1>
        <p>Programming language implementations &amp; bootstrapping</p>
      </header>

      {hasWarnings && (
        <div className="validation-warning">
          ⚠️ {validationReport!.summary.warnings} validation warnings
        </div>
      )}

      <section className="panel-section">
        <h3>Layout</h3>
        <div className="layout-toggle">
          <button
            className={filters.layoutMode === 'dag' ? 'active' : ''}
            onClick={() => handleLayoutChange('dag')}
          >
            Tree
          </button>
          <button
            className={filters.layoutMode === 'force' ? 'active' : ''}
            onClick={() => handleLayoutChange('force')}
          >
            Network
          </button>
        </div>
      </section>

      <section className="panel-section">
        <h3>Search</h3>
        <SearchBox
          value={filters.searchQuery}
          onChange={(value) => updateFilters({ searchQuery: value })}
          placeholder="Search languages..."
        />
      </section>

      <section className="panel-section">
        <Slider
          label="Confidence Threshold"
          value={filters.confidenceThreshold}
          min={0}
          max={1}
          step={0.05}
          onChange={(value) => updateFilters({ confidenceThreshold: value })}
        />
      </section>

      <section className="panel-section">
        <RelationshipFilters
          filters={filters.relationshipFilters}
          onChange={handleRelationshipFilter}
        />
      </section>

      <section className="panel-section">
        <h3>Display Options</h3>
        <Toggle
          label="Show Self-Loops"
          checked={filters.showSelfLoops}
          onChange={(checked) => updateFilters({ showSelfLoops: checked })}
        />
        <Toggle
          label="Cluster Coloring"
          checked={filters.clusterColoring}
          onChange={(checked) => updateFilters({ clusterColoring: checked })}
        />
        <Toggle
          label="Show All Labels"
          checked={filters.showAllLabels}
          onChange={(checked) => updateFilters({ showAllLabels: checked })}
        />
      </section>
    </aside>
  );
}
