import React, { Component } from 'react';

const GRAPH = {
  nodes: [
    { name: 'technology', x: 250, y: 250 },
    { name: 'computer', x: 100, y: 250 },
//    { name: 'large hadron collider', },
  ],
  edges: [
    ['technology', 'hardware'],
    ['technology', 'software'],
    ['technology', 'network'],
    ['hardware', 'computer'],
    ['hardware', 'large hadron collider'],
    ['large hadron collider', 'quantum mechanics'],
    ['quantum mechanics', 'quantum computer'],
    ['quantum computer', 'computer'],
    ['network', 'phone'],
    ['network', 'internet'],
    ['phone', 'mobile'],
    ['computer', 'mobile'],
    ['internet', 'cloud'],
    ['internet', 'html'],
    ['internet', 'communication'],
    ['phone', 'communication'],
    ['communication', 'satellite'],
    ['satellite', 'global positioning system'],
    ['mobile', 'global positioning system'],
    ['global positioning system', 'car'],
    ['elon musk', 'car'],
    ['elon musk', 'satellite'],
    ['elon musk', 'engineer'],
    ['engineer', 'steve wozniak'],
    ['engineer', 'bill gates'],
    ['windows', 'bill gates'],
    ['car', 'windows'],
    ['windows', 'operating system'],
    ['linux', 'operating system'],
    ['operating system', 'software'],
    ['linux', 'android'],
    ['android', 'mobile'],
    ['android', 'google'],
    ['google', 'internet'],
    ['android', 'robot'],
    ['robot', 'technology'],
    ['software', 'programming'],
    ['programming', 'keyboard'],
    ['keyboard', 'computer'],
    ['keyboard', 'space'],
    ['space', 'satellite'],
    ['programming', 'algorithm'],
    ['programming', 'programming language'],
    ['programming language', 'cobol'],
    ['programming language', 'c'],
    ['c', 'operating system'],
    ['google', 'car'],
  ],
};

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
    <svg width="500" height="500">
      <rect x="0" y="0" width="500" height="500" stroke="black" fill="white" strokeWidth="2"/>
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
