var highlightRow=1;
var highlightCol=1;
function changeHighlight(row,col) {
    /*console.log("change highlight to "+row+" "+col);*/
    let oldCell=document.getElementById(("cell"+highlightRow)+highlightCol);
    oldCell.className = oldCell.className.replaceAll("highlight","");
    let newCell=document.getElementById(("cell"+row)+col);
    newCell.className+=" highlight";
    highlightRow=row;
    highlightCol=col;
}
console.log("executing script");
/*var input = document.getElementById("nrinput");
*/
document.addEventListener("keydown",function(event){
    press(event.key)
})

function press(key) {
    if (key>='1' && key<='9') {
        let cell=document.getElementById(("cell"+highlightRow)+highlightCol);
        if (cell.className.search('given')==-1) {
          cell.innerHTML = key;
        }
    }
    if (key == 'Delete' || key == 'Backspace') {
        let cell=document.getElementById(("cell"+highlightRow)+highlightCol);
        if (cell.className.search('given')==-1) {
          cell.innerHTML = '';
        }
    }
    if (key=='ArrowRight' && highlightCol<9) {changeHighlight(highlightRow,+highlightCol+1)}
    if (key=='ArrowLeft' && highlightCol>1) {changeHighlight(highlightRow,+highlightCol-1)}
    if (key=='ArrowUp' && highlightRow>1) {changeHighlight(+highlightRow-1,highlightCol)}
    if (key=='ArrowDown' && highlightRow<9) {changeHighlight(+highlightRow+1,highlightCol)}
    /*input.value='';*/
}
function fillGrid(grid) {
    let board = document.getElementById('sudoku')
    board.innerHTML = ''
    for (let box=0;box<9;box++) {
        let boxE = document.createElement('div')
        boxE.classList.add('sudoku-box')
        boxE.setAttribute('id','box'+(box+1))
        for (let inner=0;inner<9;inner++) {
            let cell = document.createElement('div')
            cell.classList.add('sudoku-cell')
            cell.setAttribute('id','cell'+(box-box%3+Math.floor(inner/3)+1)+(box%3*3+inner%3+1))
            cell.addEventListener('click',function(){
                let r=cell.id[4];
                let c=cell.id[5];
                /*input.focus();*/
                changeHighlight(r,c);
            });
            boxE.appendChild(cell)
        }
        board.appendChild(boxE)
    }
    
    for (let row=1;row<=9;row++) {
        for (let col=1;col<=9;col++) {
            let cell = document.getElementById(("cell"+row)+col);
            if (grid[row-1][col-1]==0) {
                cell.className="sudoku-cell";
                cell.innerHTML='';
            } else {
                cell.className="sudoku-cell given";
                cell.innerHTML=""+grid[row-1][col-1];
            }
        }
    }
}
function readGrid() {
    let grid=new Array(9)
    for (let row=1;row<=9;row++) {
        grid[row-1]=new Array(9);
        for (let col=1;col<=9;col++) {
            let cell=document.getElementById(("cell"+row)+col).innerHTML;
            if (cell=='') {
                grid[row-1][col-1]=0;
            } else {
                grid[row-1][col-1]=0+cell;
            }
        }
    }
    return grid;
}
function checkGrid(grid) {
    for (let i=0;i<9;i++) {
        let inRow=new Set();
        let inCol=new Set();
        let inBox=new Set();
        for (let j=0;j<9;j++) {
            if (inRow.has(grid[i][j])||inCol.has(grid[j][i])||inBox.has(grid[i-i%3+Math.floor(j/3)][i%3*3+j%3])) {
                return false;
            } else {
                inRow.add(grid[i][j])
                inCol.add(grid[j][i])
                inBox.add(grid[i-i%3+Math.floor(j/3)][i%3*3+j%3])
            }
        }
        if (inRow.has(0)||inCol.has(0)||inBox.has(0)) {
            return false;
        }
    }
    return true;
}
function addCheckListener() {
let check = document.getElementById("check");
check.addEventListener('click',function(){
    if(checkGrid(readGrid())) {
        alert("Congratulations, the solution is correct!")
    } else {
        alert("Sorry, there are some Errors.")
    }
})
}


var startpage
function play() {
    let body = document.getElementsByTagName("body")[0]
    startpage = body.innerHTML
    body.innerHTML=`
        <h2>Sudoku</h2>
        <dic class="outer-outer"><div class="outer">
          <div id="sudoku" class="sudoku-board"></div>
          <div id="button-pad" class="buttons">
            <button class="buttons top-buttons" onclick="press('1')">1</button>
            <button class="buttons" onclick="press('2')">2</button>
            <button class="buttons" onclick="press('3')">3</button>
            <button class="buttons" onclick="press('4')">4</button>
            <button class="buttons" onclick="press('5')">5</button>
            <button class="buttons" onclick="press('6')">6</button>
            <button class="buttons" onclick="press('7')">7</button>
            <button class="buttons" onclick="press('8')">8</button>
            <button class="buttons" onclick="press('9')">9</button>
            <button class="buttons del-button" onclick="press('Delete')">Entf.</button>
            <button type="button" class="new-back" onclick="fillGrid(generate())">Neues Sudoku</button>
            <button type="button" class="new-back" onclick="unPlay()">Startseite</button>
            <button type="button" id="check">Überprüfen</button>
          </div>
          <div class="scrollpad"></div>
        </div></div>
        `

    /*input = document.getElementById("nrinput");
    */
    fillGrid(generate())
    addCheckListener()
}
function unPlay() {
    let body = document.getElementsByTagName("body")[0]
    body.innerHTML = startpage
}
/*fillGrid(generate())*/
