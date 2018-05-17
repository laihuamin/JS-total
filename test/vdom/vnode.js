var VNode = require("vtree/vnode")
var diff = require("vtree/diff")

var createElement = require("vdom/create-element")
var patch = require("vdom/patch")

var leftNode = new VNode("div")
console.log(leftNode);
var rightNode = new VNode("text")
console.log(rightNode);

// Render the left node to a DOM node
var rootNode = createElement(leftNode)
// document.body.appendChild(rootNode)

// Update the DOM with the results of a diff
var patches = diff(leftNode, rightNode)
patch(rootNode, patches)