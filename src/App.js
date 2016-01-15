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
      nodeStates: {
        'technology': 'visible',
	'computer': 'visible',
      },
      currentName: '',
    };
  }
  render() {
    let guessNumber = 0, totalNumber = GRAPH.nodes.length;
    for (let name in this.state.nodeStates)
      if (this.state.nodeStates[name] == 'guessed')
	guessNumber += 1;
    return (
      <div style={{textAlign: 'center', fontFamily: 'monospace'}}>
        <h1>Edge Guessing Game</h1>
	<div>Your progress: {guessNumber} of {totalNumber}</div>
	<div style={{margin: '20px'}}><Board graph={GRAPH} nodeStates={this.state.nodeStates} /></div>
	<div>Enter your guess:&nbsp;
	  <input value={this.state.currentName} onChange={this.changeInput.bind(this)} onKeyDown={this.keyDown.bind(this)} />
	</div>
      </div>
    );
  }

  changeInput(e) {
    let currentName = e.target.value.toLowerCase();
    this.setState({currentName: currentName});
  }

  keyDown(e) {
    if (e.keyCode == 13) {
      this.guess(this.state.currentName);
      this.setState({currentName: ''});
    }
  }

  guess(name) {
    if (!(GRAPH.nodeMap[name] && this.state.nodeStates[name] == 'visible')) {
      return;
    }

    let nodeStates = Object.assign({}, this.state.nodeStates);

    nodeStates[name] = 'guessed';

    for (let [name1, name2] of GRAPH.edges) {
      if (name1 == name || name2 == name) {
	let otherName = name == name1 ? name2 : name1;

	if (nodeStates[otherName] === undefined)
	  nodeStates[otherName] = 'visible';
      }
    }
    this.setState({nodeStates: nodeStates});
  }

  componentDidMount() {
    this.guess('technology');
  }
}


class Board extends Component {
  render() {
    let {graph, nodeStates} = this.props;
    return (
      <svg width={WIDTH} height={HEIGHT}>
        <rect x="0" y="0" width={WIDTH} height={HEIGHT} stroke="black" fill="white" strokeWidth="2"/>
        {graph.edges.map(([name1, name2], i) =>
                         <BoardEdge name1={name1}
                                    name2={name2}
                                    state1={nodeStates[name1]}
                                    state2={nodeStates[name2]}
                                    nodes={graph.nodes}
                                    key={i} />)}
        {graph.nodes.map(({name, x, y}, i) => <BoardNode name={name} x={x} y={y} state={nodeStates[name]} key={i} />)}
      </svg>
    );
  }
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps !== this.props;
  }
}

function getNode(nodes, name) {
  for (let node of nodes)
    if (node.name == name)
      return node;
  throw new Error(`There is no such node: ${name}.`);
}

function BoardEdge({name1, name2, state1, state2, nodes}) {
  if (!(state1 && state2))
    return <g />;

  let n1 = getNode(nodes, name1), n2 = getNode(nodes, name2);

  return (
    <line x1={n1.x} y1={n1.y} x2={n2.x} y2={n2.y} stroke="black" strokeWidth="1" />
  );
}

function BoardNode({name, x, y, state}) {
  if (!state) {
    return <g />;
  }

  let color = 'white';
  if (state == 'guessed') color = 'yellow';

  if (state != 'guessed')
    name = name.replace(/[^ ]/g, '*');

  let lines = name.split(' ');

  let maxLength = 0;
  for (let s of lines) {
    maxLength = Math.max(s.length, maxLength);
  }

  let hLine = 20;
  let h = hLine * lines.length;
  let w = maxLength * 10;
  let padding = 5;

  function makeText(s, i) {
    return <text x={x-w/2} y={y-h/2+3*hLine/4+i*hLine} fontFamily="monospace" fontSize="16">{s}</text>;
  }

  return (
    <g>
      <rect x={x-w/2-padding} y={y-h/2} width={w+padding*2} height={h} stroke="black" fill={color} strokeWidth="2" />
      {lines.map(makeText)}
    </g>
  );
}
