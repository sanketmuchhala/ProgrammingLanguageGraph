import { useGraphStore } from '../store/useGraphStore';
import { DAG_LAYOUT, FORCE_LAYOUT, CLUSTER_LAYOUT, buildTimelineLayout } from '../graph/layouts';
import './NavigationControls.css';

export function NavigationControls() {
  const handleFit = () => {
    const cy = useGraphStore.getState().cy;
    if (!cy) return;
    cy.animate({ fit: { eles: cy.elements(), padding: 50 } } as any, { duration: 400 } as any);
  };

  const handleCenter = () => {
    const { cy, selectedNodeId } = useGraphStore.getState();
    if (!cy || !selectedNodeId) return;
    const node = cy.getElementById(selectedNodeId);
    if (node.length === 0) return;
    cy.animate({ center: { eles: node }, zoom: 1.5 } as any, { duration: 400 } as any);
  };

  const handleReset = () => {
    const { cy, filters } = useGraphStore.getState();
    if (!cy) return;
    let layout;
    switch (filters.layoutMode) {
      case 'dag': layout = DAG_LAYOUT; break;
      case 'cluster': layout = CLUSTER_LAYOUT; break;
      case 'timeline': layout = buildTimelineLayout(cy); break;
      case 'force':
      default: layout = FORCE_LAYOUT; break;
    }
    cy.layout(layout).run();
  };

  return (
    <div className="nav-controls">
      <button className="nav-btn" onClick={handleFit} title="Zoom to Fit">
        Fit
      </button>
      <button className="nav-btn" onClick={handleCenter} title="Center on Selection">
        Ctr
      </button>
      <button className="nav-btn" onClick={handleReset} title="Reset Layout">
        Rst
      </button>
    </div>
  );
}
