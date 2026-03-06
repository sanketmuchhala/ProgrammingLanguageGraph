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

// Timeline visibility: hide nodes/edges beyond the selected year
export function applyTimelineVisibility(cy: Core, year: number): void {
  cy.batch(() => {
    cy.nodes().forEach((node: any) => {
      if (node.isParent()) return;
      const releaseYear = node.data('first_release_year') || 0;
      if (releaseYear > year) {
        node.addClass('timeline-hidden');
      } else {
        node.removeClass('timeline-hidden');
      }
    });

    cy.edges().forEach((edge: any) => {
      const sourceYear = edge.source().data('first_release_year') || 0;
      const targetYear = edge.target().data('first_release_year') || 0;
      const startYear = edge.data('start_year');
      const endYear = edge.data('end_year');

      const hidden =
        sourceYear > year ||
        targetYear > year ||
        (startYear !== null && startYear > year) ||
        (endYear !== null && endYear < year);

      if (hidden) {
        edge.addClass('timeline-hidden');
      } else {
        edge.removeClass('timeline-hidden');
      }
    });
  });
}

// Clear all timeline visibility classes
export function clearTimelineVisibility(cy: Core): void {
  cy.batch(() => {
    cy.elements().removeClass('timeline-hidden');
  });
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
