import type { Core } from 'cytoscape';

// Focus mode: Highlight selected node and its 1-hop neighbors, fade everything else
export function activateFocusMode(cy: Core, nodeId: string): void {
  const node = cy.getElementById(nodeId);

  if (!node || node.length === 0) {
    return;
  }

  const neighbors = node.neighborhood('node');
  const connectedEdges = node.connectedEdges();

  // Fade all elements
  cy.elements().addClass('faded');

  // Highlight selected node, neighbors, and connecting edges
  node.removeClass('faded').addClass('highlighted');
  neighbors.removeClass('faded').addClass('highlighted');
  connectedEdges.removeClass('faded').addClass('highlighted');
}

// Deactivate focus mode: Remove all highlighting and fading
export function deactivateFocusMode(cy: Core): void {
  cy.elements().removeClass('faded highlighted');
}

// Highlight a specific edge
export function highlightEdge(cy: Core, edgeId: string): void {
  const edge = cy.getElementById(edgeId);

  if (!edge || edge.length === 0) {
    return;
  }

  const sourceNode = edge.source();
  const targetNode = edge.target();

  // Fade all elements
  cy.elements().addClass('faded');

  // Highlight edge and connected nodes
  edge.removeClass('faded').addClass('highlighted');
  sourceNode.removeClass('faded').addClass('highlighted');
  targetNode.removeClass('faded').addClass('highlighted');
}
