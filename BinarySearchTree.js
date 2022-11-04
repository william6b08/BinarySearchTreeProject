class Node{
  constructor(value){
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  }
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.value}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
  }
}

class Tree{
  constructor(arr){
    this.tree = this.buildTree(arr, 0, arr.length-1);
  }

  buildTree(arr, arrStart, arrEnd){
    if(arrStart > arrEnd){
      return null;
    }
    else{
      let midPoint = Math.floor((arrStart+arrEnd)/2);
      let node = new Node(arr[midPoint])
      node.left = this.buildTree(arr, arrStart, midPoint-1);
      node.right = this.buildTree(arr, midPoint+1, arrEnd);
      return node;
    }
  }

  delete(value){
    const deleteNode = (value, node)=>{
      //Situation 1) the node is empty, we return null
      if(node === null){
        return null; // base case, the node is empty
      }
      //Situation 2) the Node is not empty, we move to other conditions
      else{
        // Situation 2A) We found the node match our value
        if(value === node.value){
          // Situation 2A1) the node does not have any children, we return null;
          if(!node.left && !node.right){
            return null; // base case, found the node, and remove it.
          }
          // Situation 2A2) the node has right child
          if(!node.left && node.right){
            return node.right;
          }
          //Situation 2A3) the node has left child
          if(node.left && !node.right){
            return node.left;
          }
          //Situation 2A4) the node has both children
          if(node.left && node.right){
            // find the number that is just slightly larger than the target value.
            // we will start the search from node.right
            //(right side contain value greater than the node.)
            let tempnode = node.right; // initialize a tempnode to store the next value;
            while (tempnode.left){ // use while loop to loop the left side of the node to find the next suitable value;
              tempnode = tempnode.left;
            }
            // we assign the next suitable number to replace the deleted node number.
            node.value = tempnode.value;
            //we have to reconstruct the right side of the target node since we pull a value up.
            // we do that via recursing the deletenode function
            node.right = deleteNode(tempnode.value, node.right)

          }
        }
        if(value > node.value){ // 100 > 60
          node.right = deleteNode(value, node.right);
          return node;
        }
        
        if(value < node.value){
          node.left = deleteNode(value, node.left);
          return node;
        }
      }
    }

    deleteNode(value, this.tree);
  }

  BreathFirstTraverse() {
    let currentNode = this.tree
    let queue = []
    let results = []
    queue.push(currentNode);
    while(queue.length){
      currentNode = queue.shift();
      results.push(currentNode.value)
      if(currentNode.left){
        queue.push(currentNode.left);
      }
      if(currentNode.right){
        queue.push(currentNode.right)
      }
    }
    return results;
  }

  inOrderTraverse(tree){
    let result = []
    if(tree == null){
      return;
    }
    else{
      if(tree.left){
        result = result.concat(this.inOrderTraverse(tree.left));
      }

      result = result.concat(tree.value);

      if(tree.right){
        result = result.concat(this.inOrderTraverse(tree.right));
      }
    }
    return result;
  
  }

  preOrderTraverse(tree){
    let result = [];
    if(tree === null){
      return;
    }
    else{
      result = result.concat(tree.value);
      if(tree.left){
        result = result.concat(this.preOrderTraverse(tree.left));
      }
      if(tree.right){
        result = result.concat(this.preOrderTraverse(tree.right));
      }
      return result;
    }
  }

  postOrderTraverse(tree){
    let result = [];
    if(tree === null){
      return;
    }
    else{
      if(tree.left){
        result = result.concat(this.postOrderTraverse(tree.left))
      }
      if(tree.right){
        result = result.concat(this.postOrderTraverse(tree.right))
      }
      result = result.concat(tree)
      return result;
    }

  }
  
}
let x = [3,43,45,47,60, 70, 90,99,100]
let root = new Tree(x, 0, x.length-1)

prettyPrint(root.tree)
root.delete(43)
prettyPrint(root.tree)
console.log(root.BreathFirstTraverse())
console.log('In Order Traversal')
console.log(root.inOrderTraverse(root.tree))
console.log('Pre Order Traversal')
console.log(root.preOrderTraverse(root.tree))
console.log('Post Order Traversal')
console.log(root.postOrderTraverse(root.tree))



    
