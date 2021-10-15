let currentColorOnMove = "red"
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
        if (currentColorOnMove == "red") {
            if (gameBoard[j][y] == 0 && gameBoard[x][y] == 0) {
                gameBoard[j][y] = 1
                currentColorOnMove = "yellow"
                return
            }
        }
        else {
            if (gameBoard[j][y] == 0 && gameBoard[x][y] == 0) {
                gameBoard[j][y] = 2
                currentColorOnMove = "red"
                return
            }
        }
    }

}

function playerOnMoveNodeColor(playerOnMoveNode) {
    if (currentColorOnMove == "red") {
        playerOnMoveNode.style.backgroundColor = "#d96666"
    }
    else {
        playerOnMoveNode.style.backgroundColor = "#ffeb79"
    }
}

function checkHorizontalAndVerticalWin(gameBoard, redPinValue, yellowPinValue, j, i) {
    if (j >= 0 && gameBoard[j][i] == redPinValue &&
        gameBoard[j][i + 1] == redPinValue &&
        gameBoard[j][i + 2] == redPinValue &&
        gameBoard[j][i + 3] == redPinValue) {
        return redPinValue
    }
    else if (j >= 3 && gameBoard[j][i] == redPinValue &&
        gameBoard[j - 1][i] == redPinValue &&
        gameBoard[j - 2][i] == redPinValue &&
        gameBoard[j - 3][i] == redPinValue) {
        return redPinValue
    }

    if (j >= 0 && gameBoard[j][i] == yellowPinValue &&
        gameBoard[j][i + 1] == yellowPinValue &&
        gameBoard[j][i + 2] == yellowPinValue &&
        gameBoard[j][i + 3] == yellowPinValue) {
        return yellowPinValue
    }
    else if (j >= 3 && gameBoard[j][i] == yellowPinValue &&
        gameBoard[j - 1][i] == yellowPinValue &&
        gameBoard[j - 2][i] == yellowPinValue &&
        gameBoard[j - 3][i] == yellowPinValue) {
        return yellowPinValue
    }
}

function checkDiagonalWin(gameBoard, redPinValue, yellowPinValue, j, i) {
    if (j >= 3 && gameBoard[j][i] == redPinValue &&
        gameBoard[j - 1][i - 1] == redPinValue &&
        gameBoard[j - 2][i - 2] == redPinValue &&
        gameBoard[j - 3][i - 3] == redPinValue) {
        return redPinValue
    }

    else if (j >= 3 && gameBoard[j][i] == redPinValue &&
        gameBoard[j - 1][i + 1] == redPinValue &&
        gameBoard[j - 2][i + 2] == redPinValue &&
        gameBoard[j - 3][i + 3] == redPinValue) {
        return redPinValue
    }

    else if (j >= 3 && gameBoard[j][i] == yellowPinValue &&
        gameBoard[j - 1][i - 1] == yellowPinValue &&
        gameBoard[j - 2][i - 2] == yellowPinValue &&
        gameBoard[j - 3][i - 3] == yellowPinValue) {
        return yellowPinValue
    }

    else if (j >= 3 && gameBoard[j][i] == yellowPinValue &&
        gameBoard[j - 1][i + 1] == yellowPinValue &&
        gameBoard[j - 2][i + 2] == yellowPinValue &&
        gameBoard[j - 3][i + 3] == yellowPinValue) {
        return yellowPinValue
    }
}

function checkDraw(gameBoard, gameBoardHeight, gameBoardWidth) {
    let zerosCounter = 0
    for (let j = gameBoardHeight; j >= 0; j--) {
        for (let i = 0; i < gameBoardWidth; i++) {
            if (gameBoard[i][j] == 0) {
                zerosCounter++
            }

        }
    }
    return zerosCounter
}

function gameOver(gameBoardWidth, gameBoardHeight, redWon, yellowWon, gameDraw, redPinValue, yellowPinValue) {
    for (let j = gameBoardHeight; j >= 0; j--) {
        for (let i = 0; i < gameBoardWidth; i++) {
            let horisontalAndVerticalWinResult = checkHorizontalAndVerticalWin(gameBoard, redPinValue, yellowPinValue, j, i)
            if (horisontalAndVerticalWinResult == redPinValue) {
                redWon = true
            }
            else if (horisontalAndVerticalWinResult == yellowPinValue) {
                yellowWon = true
            }

            let verticalWinResult = checkDiagonalWin(gameBoard, redPinValue, yellowPinValue, j, i)
            if (verticalWinResult == redPinValue) {
                redWon = true
            }
            else if (horisontalAndVerticalWinResult == yellowPinValue) {
                yellowWon = true
            }
        }
    }
    let checkDrawResult = checkDraw(gameBoard, gameBoardHeight, gameBoardWidth)

    if (checkDrawResult == 0) {
        gameDraw = false
        setTimeout(() => {
            confirm("Draw!");
            gameSholudEnd = true
        }, 10)
    }

    if (redWon) {
        redWon = false
        setTimeout(() => {
            confirm("Red win!");
            gameSholudEnd = true
        }, 10)
    }
    else if (yellowWon) {
        yellowWon = false
        setTimeout(() => {
            confirm("Yellow win!");
            gameSholudEnd = true
        }, 10)
    }
}

function main() {
    let gameBoardWidth = 7
    let gameBoardHeight = 6
    gameBoard = createGameBoard(gameBoardWidth, gameBoardHeight)

    let playerOnMoveNode = document.getElementById("color")

    let redWon = false
    let yellowWon = false
    let gameDraw = false

    let redPinValue = 1
    let yellowPinValue = 2

    let gameTable = document.getElementById("gameTable")
    createGameCells(gameBoardWidth, gameBoardHeight)
    placeEventListnerOnCell(gameBoardWidth, gameBoardHeight)

    function loop(timestamp) {
        draw(gameBoardWidth, gameBoardHeight)
        if (gameSholudEnd) {
            gameBoard = []
            gameBoard = createGameBoard(gameBoardWidth, gameBoardHeight)
            currentColorOnMove = "red"
            gameSholudEnd = false
        }
        gameOver(gameBoardWidth, gameBoardHeight, redWon, yellowWon, gameDraw, redPinValue, yellowPinValue)
        playerOnMoveNodeColor(playerOnMoveNode)
        window.requestAnimationFrame(loop);
    }

    window.requestAnimationFrame(loop);

}
main()