let currentColorOnMove = 1
let gameSholudEnd = false
let gameBoard = []
function createGameBoard(gameBoardWidth, gameBoardHeight) {
    let gameBoardArray = []
    for (let i = 0; i < gameBoardWidth; i++) {
        let gameBoardRow = [];
        for (let j = 0; j < gameBoardHeight; j++) {
            gameBoardRow.push(0)
        }
        gameBoardArray.push(gameBoardRow)
    }
    return gameBoardArray
}

function createGameCells(gameBoardWidth, gameBoardHeight) {
    let gameContainer = document.getElementById("gameTable")

    for (let i = 0; i < gameBoardWidth; i++) {
        let rowNode = document.createElement("div")
        rowNode.classList.add("row_" + i)
        rowNode.classList.add("row")

        for (let j = 0; j < gameBoardHeight; j++) {
            let block = document.createElement("div")
            let cell = document.createElement("div")
            block.classList.add("block")
            cell.classList.add("cell", j, i)
            block.appendChild(cell)
            rowNode.appendChild(block)
        }
        gameContainer.appendChild(rowNode)
    }
}

function draw(gameBoardWidth, gameBoardHeight) {
    for (let i = 0; i < gameBoardWidth; i++) {
        let rowNode = document.querySelectorAll(".row_" + i);
        let rowElements = rowNode[0].getElementsByClassName("cell")

        for (let j = 0; j < gameBoardHeight; j++) {
            if (gameBoard[i][j] == 1) {
                rowElements[j].style.backgroundColor = "#d96666";
            }

            else if (gameBoard[i][j] == 2) {
                rowElements[j].style.backgroundColor = "#ffeb79";
            }
            else if (gameBoard[i][j] == 0) {
                rowElements[j].style.backgroundColor = "white";
            }
        }
    }
}

function placeEventListnerOnCell(gameBoardWidth, gameBoardHeight) {
    for (let i = 0; i < gameBoardWidth; i++) {
        let rowNode = document.querySelectorAll(".row_" + i);
        let rowElements = rowNode[0].getElementsByClassName("cell")

        for (let j = 0; j < gameBoardHeight; j++) {
            rowElements[j].addEventListener("click", (e) => {
                let y = 0
                let x = 0
                if (e.target.classList[2] == undefined) {
                    y = e.target.classList[1]
                    x = e.target.classList[1]
                }
                else {
                    y = parseInt(e.target.classList[1])
                    x = parseInt(e.target.classList[2])
                }
                placeYellowOrRedDot(x, y, gameBoardHeight, gameBoardWidth)
            })
        }
    }
}

function placeYellowOrRedDot(x, y, gameBoardHeight, gameBoardWidth) {
    for (let j = gameBoardHeight; j >= 0; j--) {
        if (currentColorOnMove == 1) {
            if (gameBoard[j][y] == 0 && gameBoard[x][y] == 0) {
                gameBoard[j][y] = 1
                currentColorOnMove++
                return
            }
        }
        else {
            if (gameBoard[j][y] == 0 && gameBoard[x][y] == 0) {
                gameBoard[j][y] = 2
                currentColorOnMove--
                return
            }
        }
    }

}

function playerOnMoveNodeColor(playerOnMoveNode) {
    if (currentColorOnMove == 1) {
        playerOnMoveNode.style.backgroundColor = "#d96666"
    }
    else {
        playerOnMoveNode.style.backgroundColor = "#ffeb79"
    }
}

let redWon = false
let yellowWon = false
let gameDraw = false
function gameOver(gameBoardWidth, gameBoardHeight) {
    for (let j = gameBoardHeight; j >= 0; j--) {
        for (let i = 0; i < gameBoardWidth; i++) {
            
            if (j >= 0 && gameBoard[j][i] == 1 &&
                gameBoard[j][i + 1] == 1 &&
                gameBoard[j][i + 2] == 1 &&
                gameBoard[j][i + 3] == 1) {
                redWon = true
            }
            else if (j >= 3 && gameBoard[j][i] == 1 &&
                gameBoard[j - 1][i] == 1 &&
                gameBoard[j - 2][i] == 1 &&
                gameBoard[j - 3][i] == 1) {
                redWon = true
            }
            else if (j >= 3 && gameBoard[j][i] == 1 &&
                gameBoard[j - 1][i - 1] == 1 &&
                gameBoard[j - 2][i - 2] == 1 &&
                gameBoard[j - 3][i - 3] == 1) {
                redWon = true
            }

            else if (j >= 3 && gameBoard[j][i] == 1 &&
                gameBoard[j - 1][i + 1] == 1 &&
                gameBoard[j - 2][i + 2] == 1 &&
                gameBoard[j - 3][i + 3] == 1) {
                redWon = true
            }

            if (j >= 0 && gameBoard[j][i] == 2 &&
                gameBoard[j][i + 1] == 2 &&
                gameBoard[j][i + 2] == 2 &&
                gameBoard[j][i + 3] == 2) {
                yellowWon = true
            }
            else if (j >= 3 && gameBoard[j][i] == 2 &&
                gameBoard[j - 1][i] == 2 &&
                gameBoard[j - 2][i] == 2 &&
                gameBoard[j - 3][i] == 2) {
                yellowWon = true
            }
            else if (j >= 3 && gameBoard[j][i] == 2 &&
                gameBoard[j - 1][i - 1] == 2 &&
                gameBoard[j - 2][i - 2] == 2 &&
                gameBoard[j - 3][i - 3] == 2) {
                yellowWon = true
            }

            else if ( j >= 3 && gameBoard[j][i] == 2 &&
                gameBoard[j - 1][i + 1] == 2 &&
                gameBoard[j - 2][i + 2] == 2 &&
                gameBoard[j - 3][i + 3] == 2) {
                yellowWon = true
            }

        }
    }

    let zerosCounter = 0
    for (let j = gameBoardHeight; j >= 0; j--) {
        for (let i = 0; i < gameBoardWidth; i++) {
            if (gameBoard[i][j] == 0) {
                zerosCounter++
            }

        }
    }

    if (zerosCounter == 0) {
        gameDraw = false
        setTimeout(() => {
            confirm("Draw!");
            gameSholudEnd = true
        },10)
    }

    
    if (redWon) {
        redWon = false
        setTimeout(() => {
            confirm("Red win!");
            gameSholudEnd = true
        },10)
    }
    else if (yellowWon) {
        yellowWon = false
        setTimeout(() => {
            confirm("Yellow win!");
            gameSholudEnd = true
        },10)
    }
}

function main() {
    let gameBoardWidth = 7
    let gameBoardHeight = 6
    gameBoard = createGameBoard(gameBoardWidth, gameBoardHeight)

    let playerOnMoveNode = document.getElementById("color")

    let gameTable = document.getElementById("gameTable")
    createGameCells(gameBoardWidth, gameBoardHeight)
    placeEventListnerOnCell(gameBoardWidth, gameBoardHeight)

    function loop(timestamp) {
        draw(gameBoardWidth, gameBoardHeight)
        if (gameSholudEnd) {
            gameBoard = []
            gameBoard = createGameBoard(gameBoardWidth, gameBoardHeight)
            currentColorOnMove = 1
            gameSholudEnd = false
        }
        gameOver(gameBoardWidth, gameBoardHeight)
        playerOnMoveNodeColor(playerOnMoveNode)
        window.requestAnimationFrame(loop);
    }

    window.requestAnimationFrame(loop);

}
main()