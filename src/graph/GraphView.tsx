import { useEffect, useRef } from 'react';
import cytoscape from 'cytoscape';
import coseBilkent from 'cytoscape-cose-bilkent';
import { useGraphStore } from '../store/useGraphStore';
import { buildCytoscapeElements } from './buildElements';
import { getCytoscapeStyle } from './style';
import { BASE_CYTOSCAPE_CONFIG } from './cytoscapeConfig';
import { DAG_LAYOUT, FORCE_LAYOUT, CLUSTER_LAYOUT, buildTimelineLayout } from './layouts';
import { activateFocusMode, deactivateFocusMode } from './selectors';
import './GraphView.css';

// Register cose-bilkent layout
cytoscape.use(coseBilkent);

function getLayout(mode: string, cy?: cytoscape.Core): any {
  switch (mode) {
    case 'dag': return DAG_LAYOUT;
    case 'cluster': return CLUSTER_LAYOUT;
    case 'timeline': return cy ? buildTimelineLayout(cy) : DAG_LAYOUT;
    case 'force':
    default: return FORCE_LAYOUT;
  }
}

export function GraphView() {
  const containerRef = useRef<HTMLDivElement>(null);
  const {
    dataset,
    cy,
    filters,
    setCytoscape,
    setSelectedNode,
    setSelectedEdge,
  } = useGraphStore();

  // Initialize Cytoscape instance
  useEffect(() => {
    if (!containerRef.current || !dataset) {
      return;
    }

    const elements = buildCytoscapeElements(dataset, filters);
    const style = getCytoscapeStyle(filters.clusterColoring, filters.showAllLabels);
    const layout = getLayout(filters.layoutMode);

    const instance = cytoscape({
      container: containerRef.current,
      elements,
      style,
      layout,
      ...BASE_CYTOSCAPE_CONFIG,
    });

    setCytoscape(instance);

    // Node tap: lock selection
    instance.on('tap', 'node', (evt) => {
      const nodeId = evt.target.id();
      setSelectedNode(nodeId);
      activateFocusMode(instance, nodeId);
    });

    // Edge tap
    instance.on('tap', 'edge', (evt) => {
      const edgeId = evt.target.id();
      setSelectedEdge(edgeId);
    });

    // Background tap: clear selection
    instance.on('tap', (evt) => {
      if (evt.target === instance) {
        setSelectedNode(null);
        setSelectedEdge(null);
        deactivateFocusMode(instance);
      }
    });

    // Node hover: highlight neighbors (only when no click selection is active)
    instance.on('mouseover', 'node', (evt) => {
      const { selectedNodeId } = useGraphStore.getState();
      if (selectedNodeId) return;
      const nodeId = evt.target.id();
      evt.target.addClass('hovered');
      activateFocusMode(instance, nodeId);
    });

    instance.on('mouseout', 'node', (evt) => {
      const { selectedNodeId } = useGraphStore.getState();
      if (selectedNodeId) return;
      evt.target.removeClass('hovered');
      deactivateFocusMode(instance);
    });

    // Edge hover: show tooltip
    instance.on('mouseover', 'edge', (evt) => {
      const edge = evt.target;
      const midpoint = edge.renderedMidpoint();
      useGraphStore.getState().setHoveredEdge(edge.id(), { x: midpoint.x, y: midpoint.y });
    });

    instance.on('mouseout', 'edge', () => {
      useGraphStore.getState().setHoveredEdge(null);
    });

    // Zoom-dependent label visibility
    instance.on('zoom', () => {
      const { filters: currentFilters } = useGraphStore.getState();
      if (currentFilters.showAllLabels) {
        instance.batch(() => {
          instance.nodes().removeClass('labels-hidden');
        });
        return;
      }

      const zoom = instance.zoom();
      instance.batch(() => {
        if (zoom < 0.6) {
          instance.nodes().addClass('labels-hidden');
        } else if (zoom <= 1.2) {
          instance.nodes().filter('[degree < 8]').addClass('labels-hidden');
          instance.nodes().filter('[degree >= 8]').removeClass('labels-hidden');
        } else {
          instance.nodes().removeClass('labels-hidden');
        }
      });
    });

    // Hide edge tooltip on viewport changes
    instance.on('pan zoom', () => {
      const { hoveredEdgeId } = useGraphStore.getState();
      if (hoveredEdgeId) {
        useGraphStore.getState().setHoveredEdge(null);
      }
    });

    // Cleanup on unmount
    return () => {
      instance.destroy();
      setCytoscape(null);
    };
  }, [dataset, setCytoscape, setSelectedNode, setSelectedEdge]);

  // Update graph when filters change
  useEffect(() => {
    if (!cy || !dataset) {
      return;
    }

    const elements = buildCytoscapeElements(dataset, filters);
    const style = getCytoscapeStyle(filters.clusterColoring, filters.showAllLabels);

    cy.style(style);
    cy.json({ elements });

    // Deactivate focus mode when filters change
    deactivateFocusMode(cy);
  }, [cy, dataset, filters]);

  // Update layout when layout mode changes
  useEffect(() => {
    if (!cy) {
      return;
    }

    const layout = getLayout(filters.layoutMode, cy);
    cy.layout(layout).run();
  }, [cy, filters.layoutMode]);

  return <div ref={containerRef} className="graph-view" />;
}
