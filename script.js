array1d = [5, 9, 7, 2, 1, 3, 4, 8, 6];

var arr2D = [];
arr2D.push([1, 9, 3]);
arr2D.push([4, 2, 6]);
arr2D.push([7, 5, 8]);


var arrayOk = [];
arrayOk.push([1, 2, 3]);
arrayOk.push([4, 5, 6]);
arrayOk.push([7, 8, 9]);


var max_depth = 10;

var best_depth = 0;
var best_movement = '';

function display1D(resultTab) {
    document.getElementById("tab1d").innerHTML = array1d;
    document.getElementById("resultTab").innerHTML = resultTab;
}

// Display Array

function displayArray() {

    let cellNumber = 0;
    for (let y = 0; y < arr2D.length; y++) {

        for (let x = 0; x < arr2D.length; x++) {
            document.getElementById("cell" + cellNumber).innerHTML = arr2D[y][x];
            cellNumber++;
        }
    }
}

// Array 1D sort by insertion

function sortArraybyInsertion() {

    for (let i = 1; i < array1d.length; i++) {
        for (let k = i; k >= 1; k--) {
            if (array1d[k] < array1d[k - 1]) {
                a = array1d[k - 1];
                array1d[k - 1] = array1d[k];
                array1d[k] = a;
            }
        }
    }
    display1D();
}


// Array 1D sort by Bubbles
let count = 0;
let swap = 0;


function sortArraybyBubbles() {
    let arrSorted = false;

    while (arrSorted === false) {
        for (let i = 0; i < array1d.length; i++) {

            let j = i + 1;

            if (array1d[i] > array1d[j]) {

                a = array1d[j];
                array1d[j] = array1d[i];
                array1d[i] = a;
                arrSorted = false;
            }
            arrSorted = true;
        }
    }
    console.log(count);
    console.log("swaps :" + swap);
    display1D();
}


// Array 1D sort by Quick Sort

function sortArraybyQuickSort() {


    // Je choisis un nombre au hasard
    console.log(array1d);
    let randPivot = array1d[Math.floor(Math.random() * array1d.length)];


    console.log("Valeur du pivot : " + randPivot);

    let indexPivot = array1d.indexOf(randPivot);

    //Je mets le pivot au début du tableau
    array1d.splice(indexPivot, 1);
    array1d.unshift(randPivot);

    //Je mets les éléments plus petits au début du tableau
    for (let i = 1; i < array1d.length; i++) {
        let elmt = array1d[i];

        if (elmt < randPivot && elmt !== randPivot) {
            array1d.splice(i, 1);
            array1d.unshift(elmt);
        }
    }

    console.log("array1D après définition des sous-listes : " + array1d);


    //Je récupère l'indice de la nouvelle position du pivot
    let newIndexPivot = array1d.indexOf(randPivot);

    let leftListSorted = false;

    // Je trie la partie gauche du pivot
    while (leftListSorted === false) {
        let swapCount = 0;
        for (let i = 0; i < newIndexPivot; i++) {

            let j = i + 1;

            if (array1d[i] > array1d[j]) {

                a = array1d[j];
                array1d[j] = array1d[i];
                array1d[i] = a;
                leftListSorted = false;
                swapCount++;
            }
            if (swapCount === 0) {
                leftListSorted = true;
            }
        }
    }

    console.log("array1D après tri liste de gauche : " + array1d);


    // Je trie la partie droite du pivot
    let rightListSorted = false;

    while (rightListSorted === false) {
        let swapCount = 0;
        for (let j = newIndexPivot + 1; j < array1d.length; j++) {
            if (array1d[j] > array1d[j + 1]) {
                let a = array1d[j + 1];
                array1d[j + 1] = array1d[j];
                array1d[j] = a;
                rightListSorted = false;
                swapCount++;
            }
            if (swapCount === 0) {
                rightListSorted = true;
            }
        }
    }
    console.log("array1D après tri liste de droite : " + array1d);

    display1D();
}


// Sort by Fusion

function sortArraybyFusion() {


    display1D(sliceTab(array1d));
}

function sliceTab(array1d) {

    if (array1d.length < 2) {
        return array1d;
    }

    let mid = parseInt(array1d.length / 2);
    let leftTab = array1d.slice(0, mid);
    let rightTab = array1d.slice(mid, array1d.length);


    console.log("left-> " + leftTab);
    console.log("right-> " + rightTab);

    return mergeTabs(sliceTab(leftTab), sliceTab(rightTab));
}

function mergeTabs(leftTab, rightTab) {
    let resultTab = [];

    while (leftTab.length && rightTab.length) {
        if (leftTab[0] < rightTab[0]) {
            resultTab.push(leftTab[0]);
            leftTab.shift();
        } else {
            resultTab.push(rightTab[0]);
            rightTab.shift();
        }
    }
    while (leftTab.length) {
        resultTab.push(leftTab.shift())
    }
    while (rightTab.length) {
        resultTab.push(rightTab.shift())
    }
    console.log(resultTab);
    return resultTab;
}


//Sort by Shell

function sortArraybyShell() {

}


// Sort by Heap

function sortArraybyHeap() {

}








// PUZZLE RESOLUTION


//Main
displayArray();
display1D();


function findVoidCell(arr) {
    for (let y = 0; y < arr.length; y++) {
        for (let x = 0; x < arr.length; x++) {
            if (arr[y][x] === 9) {
                return [y, x];
            }
        }
    }
}

//Fonction de vérification du taquin


function isCorrect(arr) {
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length; j++) {
            if (arr[i][j] !== arrayOk[i][j]) {
                return 0;
            }
        }
    }
    return 1;
}


function swapCells(myArray, void_coord, possibleMove) {
    x1_up = void_coord[1];
    y1_up = void_coord[0] - 1;

    x2_down = void_coord[1];
    y2_down = void_coord[0] + 1;

    x3_left = void_coord[1] - 1;
    y3_left = void_coord[0];

    x4_right = void_coord[1] + 1;
    y4_right = void_coord[0];

    if (possibleMove === "Up") {
        let a = myArray[y1_up][x1_up];
        myArray[y1_up][x1_up] = myArray[void_coord[0]][void_coord[1]];
        myArray[void_coord[0]][void_coord[1]] = a;
        return myArray;
    }

    if (possibleMove === "Down") {
        let a = myArray[y2_down][x2_down];
        myArray[y2_down][x2_down] = myArray[void_coord[0]][void_coord[1]];
        myArray[void_coord[0]][void_coord[1]] = a;
        return myArray;
    }

    if (possibleMove === "Left") {
        let a = myArray[y3_left][x3_left];
        myArray[y3_left][x3_left] = myArray[void_coord[0]][void_coord[1]];
        myArray[void_coord[0]][void_coord[1]] = a;
        return myArray;
    }

    if (possibleMove === "Right") {
        let a = myArray[y4_right][x4_right];
        myArray[y4_right][x4_right] = myArray[void_coord[0]][void_coord[1]];
        myArray[void_coord[0]][void_coord[1]] = a;
        return myArray;
    }
    return myArray;
}

var array_Clone = arra1 => JSON.parse(JSON.stringify(arra1));

var arrMovesPossible = (arr, void_coord, lastMove) => {
    let arrMoves = [];

    if (void_coord[0] > 0 && lastMove !== "Down") {
        arrMoves.push("Up");
    }
    if (void_coord[0] < (arr.length - 1) && lastMove !== "Up") {
        arrMoves.push("Down");
    }
    if (void_coord[1] > 0 && lastMove !== "Right") {
        arrMoves.push("Left");
    }
    if (void_coord[1] < (arr[0].length - 1) && lastMove !== "Left") {
        arrMoves.push("Right");
    }
    return arrMoves;
};

function resolve_puzzle(arr, depth = 0, lastMove = '', historicalMoves = '') {

    //If tableau résolu
    if (isCorrect(arr)) {
        var tmp_best_movement = best_movement;
        if (tmp_best_movement === '' || tmp_best_movement.length > historicalMoves.length) {
            document.getElementById("solutionFound").innerHTML = "<br/>Solution found with " + depth + " steps - " + historicalMoves;
            displayArray();
            best_depth = depth;
            best_movement = historicalMoves;
        }
    }

    //If profondeur max atteinte
    if (depth > max_depth) {
        return;
    }
    var void_coord = findVoidCell(arr);
    var arrMoves = arrMovesPossible(arr, void_coord, lastMove);


    // Définition d'un mouvement
    for (let i = 0; i < arrMoves.length; i++) {
        let possibleMove = arrMoves[i];
        let newArray = swapCells(array_Clone(arr), void_coord, possibleMove);
        let newDepth = depth + 1;
        let newHistoricalMoves = historicalMoves + ' - ' + possibleMove;
        resolve_puzzle(newArray, newDepth, possibleMove, newHistoricalMoves);
    }
}






// Résolution BFS


var arrMovesPossible_bfs = (arr, depth, void_coord, lastMove ) => {

    let arrMoves= [];

    if (void_coord[0] > 0 && lastMove !== "Down") {
        arrMoves.push("Up");
    }
    if (void_coord[0] < (arr.length - 1) && lastMove !== "Up") {
        arrMoves.push("Down");
    }
    if (void_coord[1] > 0 && lastMove !== "Right") {
        arrMoves.push("Left");
    }
    if (void_coord[1] < (arr.length - 1) && lastMove !== "Left") {
        arrMoves.push("Right");
    }
    return arrMoves;
};

function arrayMovesInChain(arr, oneQueueMove) {
    var newArray = array_Clone(arr);

    for (let i =0; i <oneQueueMove.length; i++) {

        newArray = swapCells(newArray, findVoidCell(newArray), oneQueueMove[i]);

    }
    return newArray;
}

function resolve_BFS(arr, depth = 0) {
    var queueMoves = [];
    var newArray = array_Clone(arr);
    var lastMove = [];
    var allQueues = [];

    while(true) {
        if (isCorrect(newArray)) {
            document.getElementById("solutionFound").innerHTML = "<br/>Solution found with these movements : " + lastMove ;
            return true;
        }

        var arrMovesBFS = arrMovesPossible_bfs(newArray, depth, findVoidCell(newArray),  lastMove[lastMove.length-1]);

        for (let i = 0; i < arrMovesBFS.length; i++) {
            if (lastMove.length !== 0) {
                allQueues = lastMove.concat(new Array(arrMovesBFS[i]));
                queueMoves.push(allQueues);
            } else {
                allQueues = new Array(arrMovesBFS[i]);
                queueMoves.push(allQueues);
            }
        }

        lastMove = queueMoves[0];
        newArray = arrayMovesInChain(arr, queueMoves[0]);
        queueMoves.shift();
    }
}
