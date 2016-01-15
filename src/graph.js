
import Springy from 'springy';

export function createGraph(edges, width, height) {
  const names = getNamesFromEdges(edges);

  let sGraph = new Springy.Graph();
  sGraph.loadJSON({ nodes: names, edges: edges });

  let sLayout = new Springy.Layout.ForceDirected(
    sGraph,
    400.0, // spring stiffness
    400.0, // node repulsion
    0.3 // damping
  );

  for (let i = 0; i < 100; i++) {
    sLayout.tick(0.03);
  }

  const bb = sLayout.getBoundingBox();

  let nodes = [];
  const size = bb.topright.subtract(bb.bottomleft);
  sLayout.eachNode((sNode, sPoint) => {
    const p = sPoint.p.subtract(bb.bottomleft);
    nodes.push({
      name: sNode.data.label,
      x: p.x/size.x*width,
      y: p.y/size.y*height,
    });
  });

  let nodeMap = {};
  for (let node of nodes) {
    nodeMap[node.name] = node;
  }

  return {
    names: names,
    nodeMap: nodeMap,
    nodes: nodes,
    edges: edges,
  };
}

function getNamesFromEdges(edges) {
  let nameSet = {};
  for (let [name1, name2] of edges) {
    nameSet[name1] = true;
    nameSet[name2] = true;
  }

  let names = [];
  for (let name in nameSet) {
    names.push(name);
  };
  return names;
}
