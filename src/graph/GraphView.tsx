import { useEffect, useRef } from 'react';
import cytoscape from 'cytoscape';
import coseBilkent from 'cytoscape-cose-bilkent';
import { useGraphStore } from '../store/useGraphStore';
import { buildCytoscapeElements } from './buildElements';
import { getCytoscapeStyle } from './style';
import { BASE_CYTOSCAPE_CONFIG } from './cytoscapeConfig';
import { DAG_LAYOUT, FORCE_LAYOUT } from './layouts';
import { activateFocusMode, deactivateFocusMode } from './selectors';
import './GraphView.css';

// Register cose-bilkent layout
cytoscape.use(coseBilkent);

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
    const layout = filters.layoutMode === 'dag' ? DAG_LAYOUT : FORCE_LAYOUT;

    const instance = cytoscape({
      container: containerRef.current,
      elements,
      style,
      layout,
      ...BASE_CYTOSCAPE_CONFIG,
    });

    setCytoscape(instance);

    // Event handlers
    instance.on('tap', 'node', (evt) => {
      const nodeId = evt.target.id();
      setSelectedNode(nodeId);
      activateFocusMode(instance, nodeId);
    });

    instance.on('tap', 'edge', (evt) => {
      const edgeId = evt.target.id();
      setSelectedEdge(edgeId);
    });

    // Click on background deselects
    instance.on('tap', (evt) => {
      if (evt.target === instance) {
        setSelectedNode(null);
        setSelectedEdge(null);
        deactivateFocusMode(instance);
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

    const layout = filters.layoutMode === 'dag' ? DAG_LAYOUT : FORCE_LAYOUT;
    cy.layout(layout).run();
  }, [cy, filters.layoutMode]);

  return <div ref={containerRef} className="graph-view" />;
}
