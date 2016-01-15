import React, { Component } from 'react';
import { createGraph } from './graph';

const EDGES = [
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
];


const WIDTH = 1000, HEIGHT = 800;

const GRAPH = createGraph(EDGES, WIDTH, HEIGHT);

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nodeStates: {}
    };
    this.guess('technology');
  }
  render() {
    return (
      <div>
	<Board graph={GRAPH} />
	<input onChange="" />
      </div>
    );
  }

  guess(name) {
    let found = false;
    for (let node of GRAPH.nodes) {
      if (node.name == name && this.state.nodeStates[name] == 'visible') {
	found = true;
      }
    }
    if (!found) return;
    this.state.nodeStates[name] = 'guessed';

    for (let edge of GRAPH.edges) {
      if (name == edge[0] || name == edge[1]) {
	let otherName = name == edge[0] ? edge[1] : edge[0];
	if (this.state.nodeStates[otherName] === null) {
	  this.state.nodeStates[otherName] = 'visible';
	}
      }
    }
  }

}


function Board({graph}) {
  return (
    <svg width={WIDTH} height={WIDTH}>
      <rect x="0" y="0" width={WIDTH} height={HEIGHT} stroke="black" fill="white" strokeWidth="2"/>
      {graph.edges.map(([name1, name2]) => <BoardEdge name1={name1} name2={name2} nodes={graph.nodes} />)}
      {graph.nodes.map(({name, x, y}) => <BoardNode name={name} x={x} y={y} state={this.state.nodeStates[name]} />)}
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

function BoardNode({name, x, y, state}) {
  let h = 20, w = name.length * 10, padding = 5;
  let color = 'white';
  if (state == 'visible') color = 'yellow';
  else if (state == 'guessed') color = 'red';
  return (
    <g>
      <rect x={x-w/2-padding} y={y-h/2} width={w+padding*2} height={h} stroke="black" fill={color} strokeWidth="2" />
      <text x={x-w/2} y={y+h/4} fontFamily="monospace" fontSize="16">{name}</text>
    </g>
  );
}
