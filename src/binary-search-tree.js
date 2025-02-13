const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {

  constructor() {
    this._root = null;
  }

  root() {
    console.log(this._root)
    return this._root
  }

  add(data) {
    const newNode = new Node(data);
    console.log('IM HERE', newNode)
    
    if (!this._root) {
      this._root = newNode;
      return;
    }

    let current = this._root;
    while (true) {
      if (data < current.data) {
        if (!current.left) {
          current.left = newNode;
          return;
        }
        current = current.left;
      } else {
        if (!current.right) {
          current.right = newNode;
          return;
        }
        current = current.right;
      }
    }
  }

  has(data) {
    return this.find(data) !== null;
  }

  find(data) {
    let current = this._root;

    while (current) {
      if (data === current.data) {
        return current;
      }
      current = data < current.data ? current.left : current.right;
    }

    return null;
  }


  remove(data) {
    this._root = this._removeNode(this._root, data);
  }

  _removeNode(node, data) {
    if (!node) {
      return null;
    }

    if (data < node.data) {
      node.left = this._removeNode(node.left, data);
      return node;
    } else if (data > node.data) {
      node.right = this._removeNode(node.right, data);
      return node;
    } else {
      //  место для узла без потомков или с одним потомкомю
      if (!node.left) { 
        return node.right
      };
      if (!node.right) {
        return node.left;
      }

      // узел с двумя потомками- находим минимум в правом поддереве
      let minRight = node.right;
      while (minRight.left) {
        minRight = minRight.left;
      }

      node.data = minRight.data;
      node.right = this._removeNode(node.right, minRight.data);
      return node;
    }
  }

  min() {
    if (!this._root) return null;

    let current = this._root;
    while (current.left) {
      current = current.left;
    }
    return current.data;
  }

  max() {
    if (!this._root) return null;

    let current = this._root;
    while (current.right) {
      current = current.right;
    }
    return current.data;
  }
}

const btn = new BinarySearchTree();

btn.add(10);
btn.add(20);
btn.add(9);
btn.add(11);
btn.add(8);
btn.add(12);
btn.add(19);
btn.add(21);
btn.add(18);
btn.add(22);


module.exports = {
  BinarySearchTree
};