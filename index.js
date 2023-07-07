//function that prints balanced bst in terminal//
const prettyPrint = (node, prefix = '', isLeft = true) => {
    if (node === null) {
        return;
    }
    if (node.right !== null) {
        prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
        prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
};

//node factory that has attribute for the data it stores and left/right children//
class node {
    //if data, left, or right has no data the value will return null//
    constructor(data = null, left = null, right = null) {
        //if data, left, or right has a value it will overwrite the null data//
        this.data = data;
        this.left = left;
        this.right = right;
    }
};

class tree {
    //input array is input from the user//
    constructor(inputArray) {
        //calls the build tree function and inputs the inputArray(user input), start(location 0), and end(inputArray.length -1 is the end of the array) parameters from the function//
        this.root = this.buildTree(inputArray, 0, inputArray.length - 1);
        this.preOrderData = [];
        this.inOrderData = [];
        this.postOrderData = [];
        //will input the value from the root in the prettry print function to print it in a bst format//
        prettyPrint(this.root);
    }

    //recursive function with the inputArray, start, and end parameters//
    buildTree(inputArray, start, end) {
        //it will be null if the scanned array is complete and the root is flipped the opposite direction//
        if (start > end) return null;
        //mid is the average of start and end//
        let mid = parseInt((start + end) / 2);
        //root is the inputArray mid value found above//
        let root = new node(inputArray[mid]);

        //the left side is found by taking the array start and going to the left of mid (-1)//
        root.left = this.buildTree(inputArray, start, mid - 1);
        //the right is found by taking the array and going to the right from the mid (+1) to the end//
        root.right = this.buildTree(inputArray, mid + 1, end);
        //return the root value//
        return root;
    };
    //insert will insert a value//
    insert(value, root = this.root) {
        //if root is null create a new node with the user's value given//
        if (root === null) {
            return (root = new node(value));
        }
        //if what the user puts in to insert is larger than the value then look at the right of the root till it finds the correct location to insert//
        if (root.data < value) {
            root.right = this.insert(value, root.right);
            //if what the user puts in to insert is lesser than the value then look at the left of the root till it finds the correct location to insert//
        } else {
            root.left = this.insert(value, root.left);
        }
        prettyPrint(this.root);
        return root;
    };

    //delete will delete items from the array//
    delete(value, root = this.root) {
        //if root is equal to null return the root because the user's value to delete was not available//
        if (root === null) {
            return root;
        }
        //if the value entered is less than the root data search down the left of the tree//
        if (root.data > value) {
            root.left = this.delete(value, root.left);
            //if the value entered is more than the root data search down the right of the tree//
        } else if (root.data < value) {
            root.right = this.delete(value, root.right);
            //if the value is not less or greater return the side that is not null//
        } else {
            if (root.left === null) {
                return root.right;
            } else if (root.right === null) {
                return root.left;
            }
            //minValue helper function written below//
            root.data = minValue(root);
            root.right = this.delete(root.right, root.data);
        }
        prettyPrint(this.root);
        return root;
    }

    //find will accept a value and return the node the value is in//
    find(value, root = this.root) {
        //if the value the user inputs is not in the tree returns null//
        if (root === null) return false;
        //if the user value entered is the root then return the root//
        if (root.data === value) return root;
        //if the user value is less than the root search the left tree for the value//
        if (root.data > value) {
            return this.find(value, root.left);
            //if the user value is greater than the root search the right tree for the value//
        } else if (root.data < value) {
            return this.find(value, root.right);
        }
        prettyPrint(this.root);
        return root;
    }

    //
    levelOrder(root = this.root) {
        //queue is a temp storage space, final result will go in result//
        let queue = [];
        let result = [];

        if (root === null) return;
        //push current root value to queue//
        queue.push(root);

        while (queue.length > 0) {
            let current = queue.shift(root);
            result.push(current.data);

            if (current.left !== null) queue.push(current.left);
            if (current.right !== null) queue.push(current.right);
        }
        console.log("level ordered tree", result);
        return result;
    }
    inOrder(root = this.root) {
        if (root === null) return;

        if (root.left !== null) {
            this.inOrder(root.left);
        }

        if (root.data !== undefined) {
            this.inOrderData.push(root.data);
        }

        if (root.right !== null) {
            this.inOrder(root.right);
        }
        console.log("print tree in order", `${this.inOrderData}`);
    }
    preOrder(root = this.root) {
        if (root === null) return;

        if (root.data !== undefined) {
            this.preOrderData.push(root.data);
        }

        if (root.left !== null) {
            this.preOrder(root.left);
        }

        if (root.right !== null) {
            this.preOrder(root.right);
        }
        console.log("print tree in preorder", `${this.preOrderData}`);
    }

    postOrder(root = this.root) {
        if (root === null) return;

        if (root.left !== null) {
            this.postOrder(root.left);
        }

        if (root.right !== null) {
            this.postOrder(root.right);
        }

        if (root.data !== undefined) {
            this.postOrderData.push(root.data);
        }

        console.log("print tree in postorder", `${this.postOrderData}`);
    }

    height(root = this.root) {
        if (root === null) {
            //-1 tells the user they have entered a value that isn't there//
            return -1;
        } else {
            let left = this.height(root.left);
            let right = this.height(root.right);
            //this will give a value of 0 (-1 + 1 = 0) if there is a height of one//
            //max will return the largest of left or right then add one//
            return Math.max(left, right) + 1;
        }
    }
    //nodeVal is the input from the user//
    //edge count starts at zero, depth is the number of edges in a path from a node to the root node//
    depth(nodeVal, root = this.root, edgeCount = 0) {
        if (root === null) return;
        //if the root and the user input are equal the edge count will return 0 because it never moved//
        if (root.data === nodeVal) return edgeCount;
        //node value is less than than the user value given check the right tree and count edges//
        if (root.data < nodeVal) {
            return this.depth(nodeVal, root.right, (edgeCount +1));
            //node value is greater than than the user value given check the left tree and count edges//
        } else {
            return this.depth(nodeVal, root.left, (edgeCount +1));
        }
    }

    //checks to see if the heights of the left and right trees are within one node of each other//
    isBalanced(root = this.root) {
        if (root === null) return false;

        let leftHalf = root.left;
        let rightHalf = root.right;
        //call height and go through height method with both halves then subtract left minus right then return false or true//
        //abs means absolute and it returns the absolute value of the equation//
        if (Math.abs(this.height(leftHalf) - this.height(rightHalf)) > 1) {
            return false;
        } else {
            return true;
        }
    }

    //this function will rebalance an unbalanced tree//
    rebalance() {
    //shows what it looks like before rebalancing//
    prettyPrint(this.root);
    if (this.isBalanced(this.root)) return this.root;

    let rebalancedNewTreeArray = [];
    //the empty array is filled when the recursion is run//
    //traverse function written below//
    rebalancedNewTreeArray = this.traverse(this.root, rebalancedNewTreeArray);

    let balancedTree = new tree(rebalancedNewTreeArray);
    //shows what it looks like after rebalancing//
    prettyPrint(balancedTree.root);

    console.log("Is the tree is balanced?", balancedTree.isBalanced());
    return balancedTree.root;
    }

    //traverses over the left and right until null is located then return the array into the newBalancedTreeArray above//
    traverse(root, array) {
        if (array !== undefined) array.push(root.data);
        if (root.left !== null) {
            this.traverse(root.left, array);
        }

        if (root.right !== null) {
            this.traverse(root.right, array);
        }
        return array;
    }
}

//when root is available iterate through root.left to find the minimum value of the root and return the minimum found//
function minValue(root) {
    let min = root.data;
    while (root != null) {
        min = root.data;
        root = root.left;
    }
    prettyPrint(this.root);
    return min;
}


// create test array variable so you only have to change it once if you change the array values//
let testInputArray = [1, 2, 3, 4, 5, 6, 7];
// take the testInputArray and start at 1 and end at 7//
balancedBST = new tree(testInputArray, 1, 7);
balancedBST.insert(8);
balancedBST.delete(3);
console.log(balancedBST.find(10));
balancedBST.levelOrder();
balancedBST.inOrder();
balancedBST.preOrder();
balancedBST.postOrder();
console.log("tree height", balancedBST.height());
console.log("tree depth", balancedBST.depth(7));
console.log("Is the tree balanced?", balancedBST.isBalanced());
console.log("tree rebalancing", balancedBST.rebalance());



