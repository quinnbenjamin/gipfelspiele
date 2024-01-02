
class sudoku {
    constructor(rounds) {
        if (rounds==undefined) {
            this.grid = new Array(9).fill(0).map(() => new Array(9).fill(0));
            return;
        }
        /*this.grid = new Array(9).fill(0).map(() => new Array(9).fill(0));
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                this.grid[i][j] = (j + 3 * i + Math.floor(i / 3)) % 9 + 1;
            }
        }*/
        this.grid = [[1,2,3,4,5,6,7,8,9],
                     [4,5,6,7,8,9,1,2,3],
                     [7,8,9,1,2,3,4,5,6],
                     [2,3,4,5,6,7,8,9,1],
                     [5,6,7,8,9,1,2,3,4],
                     [8,9,1,2,3,4,5,6,7],
                     [3,4,5,6,7,8,9,1,2],
                     [6,7,8,9,1,2,3,4,5],
                     [9,1,2,3,4,5,6,7,8]]
        this.shuffle(rounds);
    }
    shuffle(rounds) {
        if (Math.random() > 0.5) {
            this.transpose()
        }
        for (let i = 0; i < rounds; i++) {
            switch (Math.floor(Math.random() * 5)) {
            case 0:
                this.swap_rows();
                break;
            case 1:
                this.swap_cols();
                break;
            case 2:
                this.swap_row_triples();
                break;
            case 3:
                this.swap_col_triples();
                break;
            case 4:
                this.swap_numbers();
                break;
            }
        }
    }
    swap_rows() {
        var row_triple = Math.floor(Math.random() * 3);
        var sub_row1 = Math.floor(Math.random() * 3);
        var sub_row2 = Math.floor(Math.random() * 2);
        if (sub_row2 >= sub_row1) {
            sub_row2++;
        }
        /*console.log("Swapping rows " + (3 * row_triple + sub_row1 + 1) + " and " + (3 * row_triple + sub_row2 + 1) + "!");*/
        for (var i = 0; i < 9; i++) {
            var tmp = this.grid[3 * row_triple + sub_row1][i];
            this.grid[3 * row_triple + sub_row1][i] = this.grid[3 * row_triple + sub_row2][i];
            this.grid[3 * row_triple + sub_row2][i] = tmp;
        }
    }
    swap_cols() {
        var col_triple = Math.floor(Math.random() * 3);
        var sub_col1 = Math.floor(Math.random() * 3);
        var sub_col2 = Math.floor(Math.random() * 2);
        if (sub_col2 >= sub_col1) {
           sub_col2++;
        }
        /*console.log("Swapping columns " + (3 * col_triple + sub_col1 + 1) + " and " + (3 * col_triple + sub_col2 + 1) + "!");*/
        for (var i = 0; i < 9; i++) {
            var tmp = this.grid[i][3 * col_triple + sub_col1];
            this.grid[i][3 * col_triple + sub_col1] = this.grid[i][3 * col_triple + sub_col2];
            this.grid[i][3 * col_triple + sub_col2] = tmp;
        }
    }
    swap_row_triples() {
        var rows1 = Math.floor(Math.random() * 3);
        var rows2 = Math.floor(Math.random() * 2);
        if (rows2 >= rows1) {
            rows2++;
        }
        /*console.log("Swapping row groups " + (3 * rows1 + 1) + "," + (3 * rows1 + 2) + "," + (3 * rows1 + 3) + " and " + (3 * rows2 + 1) + "," + (3 * rows2 + 2) + "," + (3 * rows2 + 3) + "!");*/
        for (var i = 0; i < 9; i++) {
            var tmp1 = this.grid[3 * rows1][i];
            var tmp2 = this.grid[3 * rows1 + 1][i];
            var tmp3 = this.grid[3 * rows1 + 2][i];
            this.grid[3 * rows1][i] = this.grid[3 * rows2][i];
            this.grid[3 * rows1 + 1][i] = this.grid[3 * rows2 + 1][i];
            this.grid[3 * rows1 + 2][i] = this.grid[3 * rows2 + 2][i];
            this.grid[3 * rows2][i] = tmp1;
            this.grid[3 * rows2 + 1][i] = tmp2;
            this.grid[3 * rows2 + 2][i] = tmp3;
        }
    }
    swap_col_triples() {
        var cols1 = Math.floor(Math.random() * 3);
        var cols2 = Math.floor(Math.random() * 2);
    if (cols2 >= cols1) {
        cols2++;
    }
    /*console.log("Swapping column groups " + (3 * cols1 + 1) + "," + (3 * cols1 + 2) + "," + (3 * cols1 + 3) +
        " and " + (3 * cols2 + 1) + "," + (3 * cols2 + 2) + "," + (3 * cols2 + 3) + "!");*/
    for (var i = 0; i < 9; i++) {
        var tmp1 = this.grid[i][3 * cols1],
            tmp2 = this.grid[i][3 * cols1 + 1],
            tmp3 = this.grid[i][3 * cols1 + 2];
        this.grid[i][3 * cols1] = this.grid[i][3 * cols2];
        this.grid[i][3 * cols1 + 1] = this.grid[i][3 * cols2 + 1];
        this.grid[i][3 * cols1 + 2] = this.grid[i][3 * cols2 + 2];
        this.grid[i][3 * cols2] = tmp1;
        this.grid[i][3 * cols2 + 1] = tmp2;
        this.grid[i][3 * cols2 + 2] = tmp3;
    }
}
    swap_numbers() {
    var n = Math.floor(Math.random()*9) + 1;
    var m = Math.floor(Math.random()*8) + 1;
    if (m >= n) {
        m++;
    }
    /*console.log("Swapping numbers " + n + " and " + m + "!");*/
    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
            if (this.grid[i][j] == n) {
                this.grid[i][j] = m;
            } else if (this.grid[i][j] == m) {
                this.grid[i][j] = n;
            }
        }
    }
    // swap all digit <n>s for <m>s and all <m>s for <n>s
}
    transpose() {
        let new_grid = new Array(9)
        for (let i=0;i<9;i++) {
            new_grid[i] = new Array(9)
            for(let j=0;j<9;j++) {
                new_grid[i][j] = this.grid[j][i]
            }
        }
        this.grid = new_grid
    }
    print() {
    for (let i = 0; i < 9; i++) {
        console.log(""+this.grid[i]);
    }
}
    generate_puzzle(tries) {
    let misses = 0;
    while (misses < tries) {
        let row = Math.floor(Math.random()*9);
        let col = Math.floor(Math.random()*9);
        while (this.grid[row][col] == 0) {
            row = Math.floor(Math.random()*9);
            col = Math.floor(Math.random()*9);
        }
        let tmp=this.grid[row][col];
        this.grid[row][col] = 0;
        let poss=this.possibilities(row, col)
        if (poss.size==1) {continue}
        poss=this.removeIntersections(poss,row,col)
        if (poss.size == 1) {
            console.log("removed "+row+col+" due to intersections")
            continue
        }
        /*poss=this.searchNakedTuples(poss,row,col,2)
        if (poss.size == 1) {
            console.log("removed "+row+col+" due to naked double")
            continue
        }
        poss=this.searchNakedTuples(poss,row,col,3)
        if (poss.size == 1) {
            console.log("removed "+row+col+" due to naked triple")
            continue
        }*/
        
            let rowc = 0;
            let colc = 0;
            let boxc = 0;
            for (let i = 0; i < 9; i++) {
                if (this.grid[row][i] == 0 && this.possibilities(row, i).has(tmp)) {
                    rowc++;
                }
                if (this.grid[i][col] == 0 && this.possibilities(i,col).has(tmp)) {
                    colc++;
                }
                if (this.grid[Math.floor(row / 3) * 3 + Math.floor(i / 3)][Math.floor(col / 3) * 3 + i % 3] == 0 && this.possibilities(Math.floor(row / 3) * 3 + Math.floor(i / 3), Math.floor(col / 3) * 3 + i % 3).has(tmp)) {
                    boxc++;
                }
            }
            if (rowc != 1 && colc != 1 && boxc != 1) {
                misses += 1;
                this.grid[row][col] = tmp;
            }
            /*console.log("could not remove "+row+col+", misses: "+misses)*/
        
    }
    let count = 0;
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (this.grid[i][j] != 0) {
                count++;
            }
        }
    }
    console.log("Generated puzzle has " + count + " hints.");
}
    possibilities(row, col) {
    let poss = new Set();
    for (let i = 1; i <= 9; i++) {
        poss.add(i);
    }
    for (let i = 0; i < 9; i++) {
        poss.forEach(obj=>{if(obj===this.grid[i][col]){poss.delete(obj)}});
        poss.forEach(obj=>{if(obj===this.grid[row][i]){poss.delete(obj)}});
        poss.forEach(obj=>{if(obj===this.grid[Math.floor(row / 3) * 3 + Math.floor(i / 3)][Math.floor(col / 3) * 3 + i % 3]){poss.delete(obj)}});
    }
    return poss;
}
    removeIntersections(poss,row,col) {
        /*this.print()*/
        let box=Math.floor(row/3)*3+Math.floor(col/3)
        poss.forEach(digit =>{
            for (let i=1;i<3;i++) {
                let crb=0,ccb=0,cbr=0,cbc=0;
                for (let j=0;j<6;j++) {
                    if (this.isPossBox(Math.floor(box/3)*3+(box+i)%3,(row%3*3+j+3)%9,digit)) {crb++}
                    if (this.isPossBox((box+3*i)%9,(col%3+1+j%2+Math.floor(j/2)*3)%9,digit)) {ccb++}
                    if (this.isPoss(Math.floor(row/3)*3+(row+i)%3,(box%3*3+3+j)%9,digit)) {cbr++}
                    if (this.isPoss((Math.floor(row/3)*3+3+j)%9,box%3*3+(col+i)%3,digit)) {cbc++}
                }
                if (crb==0||ccb==0||cbr==0||cbc==0) {
                    poss.delete(digit)
                    /*console.log("no "+digit+" in r"+row+"c"+col+"."+crb+ccb+cbr+cbc)*/
                }
            }
        })
        return poss;
    }
    isPossBox(boxnr,innernr,digit) {
        let row=Math.floor(boxnr/3)*3+Math.floor(innernr/3);
        let col=boxnr%3*3+innernr%3;
        return this.isPoss(row,col,digit);
    }
    isPoss(row,col,digit) {
        if (this.grid[row][col]!=0) {
            return this.grid[row][col]==digit
        }
        for (let i=0;i<9;i++) {
            if (this.grid[i][col]==digit||this.grid[row][i]==digit||this.grid[Math.floor(row/3)*3+Math.floor(i/3)][Math.floor(col/3)*3+i%3]==digit) {
                return false
            }
        }
        return true
    }
    searchNakedTuples(poss,row,col,n) {
        let inRow=[],inCol=[],inBox=[];
        let box=Math.floor(row/3)*3+Math.floor(col/3)
        let inner=row%3*3+col%3
        for (let i=0;i<9;i++) {
            if (i!=col) {
                let p=this.recPoss(row,i);
                if (p.size<=n) {inRow.push(p)}
            }
            if (i!=row) {
                let p=this.recPoss(i,col);
                if (p.size<=n) {inCol.push(p)}
            }
            if (i!=inner) {
                let p=this.recPoss(Math.floor(box/3)*3+Math.floor(i/3),box%3*3+i%3)
                /*console.log("checking "+(Math.floor(box/3)*3+Math.floor(i/3))+(box%3*3+i%3))*/
                if (p.size<=n) {inBox.push(p)}
            }
        }
        if (inRow.length>=n) {
            for (let i=0;i<inRow.length-n;i++) {
                let c=0;
                for(let j=0;j<inRow.length;j++) {
                    if (subSet(inRow[j],inRow[i])) {c++}
                }
                if (c==n){
                    inRow[i].forEach(x=>poss.forEach(y=>{if(x==y){poss.delete(y)}}))
                    /*console.log("naked "+n+" in row "+row+" in grid:")*/
                    /*this.print()*/
                    /*printSets(inRow)*/
                }
            }
            
        }
        if (inCol.length>=n) {
            for (let i=0;i<inCol.length-n;i++) {
                let c=0;
                for(let j=0;j<inCol.length;j++) {
                    if (subSet(inCol[j],inCol[i])) {c++}
                }
                if (c==n){inCol[i].forEach(x=>poss.forEach(y=>{if(x==y){poss.delete(y)}}))
                    /*console.log("naked "+n+" in col "+col+" in grid:")*/
                    /*this.print()*/
                    /*printSets(inCol)*/
                }
            }
        }
        if (inBox.length>=n) {
            for (let i=0;i<inBox.length-n;i++) {
                let c=0;
                for(let j=0;j<inBox.length;j++) {
                    if (subSet(inBox[j],inBox[i])) {c++}
                }
                if (c==n){inBox[i].forEach(x=>poss.forEach(y=>{if(x==y){poss.delete(y)}}))
                    /*console.log("naked "+n+" in box "+box+" in grid:")
                    console.log(""+row+col+"->"+box+inner)*/
                    /*this.print()*/
                    /*printSets(inBox)*/
                }
            }
        }
        return poss;
    }
    /*searchHiddenTuples(poss,row,col,n) {
        let inRow=new Set[9],inCol=new Set[9],inBox=new Set[9];
        let box=Math.floor(row/3)*3+Math.floor(col/3)
        let inner=row%3*3+col%3
        for (let i=0;i<9;i++) {
            let iR=recPoss(row,i),iC=recPoss(i,col),iB=recPoss(box-box%3+Math.floor(i/3),box%3+i%3);
            for (let digit=1;digit<=9;digit++) {
                if (i != row && iR.has(digit)) {inRow[+digit-1].add(i);}
                if (i != col && iC.has(digit)) {inCol[+digit-1].add(i);}
                if (i != box && iB.has(digit)) {inBox[+digit-1].add(i);}
            }
        }
        let cinR=0,cinC=0,cinB=0;
        for (let i=0;i<9;i++) {
            if (inRow[i].size> n) {inRow[i]=0;cinR++;}
            if (inCol[i].size> n) {inCol[i]=0;cinC++;}
            if (inBox[i].size> n) {inBox[i]=0;cinB++;}
        }
        if (cinR >= n) {
            for (let i=0;i<9;i++) {
                let c=0;
                for (let j=0;j<9;j++) {

                }
            }
        }
    }*/
    recPoss(row,col) {
        if (this.grid[row][col]!=0){
            return new Set([0,-1,-2,-3,-4])
        }
        return this.possibilities(row,col)
    }
}
function printSets(sets) {
    let str = "sets: "
    sets.forEach(set=>{set.forEach(n=>{str+=n});str+=" "})
    console.log(str)
}

const subSet = (xs, ys) =>
    xs.size <= ys.size &&
    [...xs].every((x) => ys.has(x));
function generate() {
    let solution = new sudoku(20);
    solution.print();
    solution.generate_puzzle(100);
    /*solution.print();*/
    return solution.grid;
}
