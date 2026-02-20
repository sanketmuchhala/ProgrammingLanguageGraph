import { useState } from 'react';
import { CLUSTER_COLORS, RELATIONSHIP_COLORS } from '../graph/style';

export function Legend() {
  const [collapsed, setCollapsed] = useState(true);

  return (
    <div className={`legend ${collapsed ? 'collapsed' : ''}`}>
      <button className="legend-toggle" onClick={() => setCollapsed(!collapsed)}>
        {collapsed ? '▶ Legend' : '▼ Legend'}
      </button>

      {!collapsed && (
        <div className="legend-content">
          <div className="legend-section">
            <h4>Node Clusters</h4>
            {Object.entries(CLUSTER_COLORS).map(([cluster, color]) => (
              <div key={cluster} className="legend-item">
                <span className="legend-color" style={{ backgroundColor: color }} />
                <span className="legend-text">{cluster.replace('_', ' ')}</span>
              </div>
            ))}
          </div>

          <div className="legend-section">
            <h4>Edge Types</h4>
            {Object.entries(RELATIONSHIP_COLORS).map(([relationship, color]) => (
              <div key={relationship} className="legend-item">
                <span className="legend-color" style={{ backgroundColor: color }} />
                <span className="legend-text">{relationship.replace(/_/g, ' ')}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
