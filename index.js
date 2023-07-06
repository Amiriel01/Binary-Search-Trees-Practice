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
    }
};
//create test array variable so you only have to change it once if you change the array values//
let testInputArray = [1, 2, 3, 4, 5, 6, 7];
//take the testInputArray and start at 1 and end at 7//
balancedBST = new tree (testInputArray, 1, 7);

