import React, { Component } from 'react';
import { createGraph } from './graph';

const EDGES = [
  ['computer', 'keyboard'],
  ['computer', 'programming'],
  ['keyboard', 'programming'],
];


const WIDTH = 500, HEIGHT = 500;

const GRAPH = createGraph(EDGES, WIDTH, HEIGHT);

/* {
  nodes: [
    { name: 'technology', x: 250, y: 250 },
    { name: 'computer', x: 100, y: 250 },
//    { name: 'large hadron collider', },
  ],
  edges: [
    ['technology', 'computer'],
/*    ['technology', 'large hadron collider'],
    ['computer', 'keyboard'],
    ['computer', 'programming'],
    ['keyboard', 'programming'],
    ['programming', 'cobol'],*/

/*    ['steve jobs']
    ['elon musk']
    ['nicola tesla']
  ],
};
*/

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    return (
      <div>
	<Board graph={GRAPH} />
      </div>
    );
  }

}


function Board({graph}) {
  return (
    <svg width={WIDTH} height={WIDTH}>
      <rect x="0" y="0" width={WIDTH} height={HEIGHT} stroke="black" fill="white" strokeWidth="2"/>
      {graph.edges.map(([name1, name2]) => <BoardEdge name1={name1} name2={name2} nodes={graph.nodes} />)}
      {graph.nodes.map(({name, x, y}) => <BoardNode name={name} x={x} y={y} />)}
    </svg>
  );
}

function getNode(nodes, name) {
  for (let node of nodes)
    if (node.name == name)
      return node;
  throw new Error(`There is no such node: ${name}.`);
}

function BoardEdge({name1, name2, nodes}) {
  let n1 = getNode(nodes, name1), n2 = getNode(nodes, name2);
  return (
    <line x1={n1.x} y1={n1.y} x2={n2.x} y2={n2.y} stroke="black" strokeWidth="1" />
  );
}

function BoardNode({name, x, y}) {
  let h = 20, w = name.length * 10, padding = 5;
  return (
    <g>
      <rect x={x-w/2-padding} y={y-h/2} width={w+padding*2} height={h} stroke="black" fill="yellow" strokeWidth="2" />
      <text x={x-w/2} y={y+h/4} fontFamily="monospace" fontSize="16">{name}</text>
    </g>
  );
}
