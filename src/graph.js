
import Springy from 'springy';

export function createGraph(edges) {
  const names = getNamesFromEdges(edges);

  const sGraph = new Springy.Graph();
  sGraph.loadJSON({ nodes: names, edges: edges });

  const sLayout = new Springy.Layout.ForceDirected(
    sGraph,
    400.0, // spring stiffness
    400.0, // node repulsion
    0.5 // damping
  );

  for (let i = 0; i < 100; i++) {
    sLayout.tick(1);
  }

  var nodes = [];
  sLayout.eachNode((sNode, sPoint) => {
    console.log(sPoint.p);
    nodes.push({
      name: sNode.data.label,
      /*x: sPoint.p.x,
      y: sPoint.p.y,*/
      x: Math.random()*500,
      y: Math.random()*500
    });
  });

  return {
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
