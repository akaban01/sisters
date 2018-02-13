var page_array = [["[jumbotron]", "[jumbotron]"], ["#Welcome to the site", "![Welcome banner](http://daxushequ.com/data/out/24/img60426245.jpg)"], ["this site is all driven by a spreadsheet", ""], ["", ""], ["[card]", "[card]"], ["card heading", "![Welcome banner](http://daxushequ.com/data/out/24/img60426245.jpg)"], ["some text", ""],["",""]];
$(document).ready( function(){
    $.get(page_array_url, function(data){
     console.log("Data: " + data);
     page_array = JSON.parse(data);
     printHTML();
    });
   });
var currentComponentRow = 0;
var componentRows = [];

var this_different = false;
var next_different = false;
var this_same = false;
var next_same = false;
var is_this_last = false;

var result = "";

function printHTML() {
    setComponentRows();
    for (var i = 0; i < componentRows.length; i++) {
        //start container, row and col
        //start component, row 
        //start col -- awesome step
        //print everything in current col
        //close col
        //if in current component row next col is empty 
        //close col and start next one -- then goto awesome step
        //else
        //close col, row, component -- then goto awesome step
        //close col, row, container

        //--------------
        result += section_start + row_start;

        for (var j = 0; j < page_array[0].length; j++) {//page_array[0] means number of columns in array
            console.log(i+"-"+j+" deciders are here: "+this_different+" "+next_different+" "+this_same+" "+next_same+" "+is_this_last);
            setDeciders(componentRows[i],j);
            if (this_different && next_different) {
                result += col_start;
                result += component_start(componentRows[i],j);
                result += row_start;
                result += col_start;
                result += getComponentsHTML(componentRows[i],j);
                result += col_end;
                result += row_end;
                result += component_end(componentRows[i],j);
                result += col_end;
            }
            if (this_different && next_same) {
                result += col_start;
                result += component_start(componentRows[i],j);
                result += row_start;
                result += col_start;
                result += getComponentsHTML(componentRows[i],j);
                result += col_end;
            }
            if (this_same && next_same) {
                result += col_start;
                result += getComponentsHTML(componentRows[i],j);
                result += col_end;
            }
            if (this_same && next_different) {
                result += col_start;
                result += getComponentsHTML(componentRows[i],j);
                result += col_end;
                result += row_end;
                result += component_end(componentRows[i],j);
                result += col_end;
            }
        }
        result += row_end + section_end;
    }
    $("#code").html(result);
}

function setDeciders(row,col) {

    //first check if its the last column
    var no_of_cols = page_array[row].length;
    if(col == no_of_cols - 1){//-1 because col started from zero
        is_this_last = true;
        this_different = false;
        next_different = false;
        this_same = false;
        next_same = false;
    }
    else{
        is_this_last = false;
    }

    var this_col = page_array[row][col];
    var next_col = page_array[row][col+1];

    if (isThisComponentName(this_col)) {
        this_different =true;
        this_same = false;
    }
    else{
        this_different =false;
        this_same = true;
    }
    if (is_this_last || isThisComponentName(next_col)) {
        next_different =true;
        next_same = false;
    }
    else{
        next_different =false;
        next_same = true;
    }
}

function getComponentsHTML(row, col) {
    var local_result = "";
    row++;
    while (page_array.length-1 != row && page_array[row][col]!="" ) {
        local_result += page_array[row][col] + "<br>";
        row++;
    }
    return local_result;
}

function setComponentRows() {
    for (let i = 0; i < page_array.length; i++) {
        if (isThisComponentName(page_array[i][0])) {
            componentRows.push(i);
        }
    }
}

function isThisComponentName(string) {
    if (string.charAt(0)=="[" && string.slice(-1)=="]") {
        return true;
    }
    return false;
}

function component_start(row, col) {
    return eval(page_array[row][col].slice(1,-1)+"_start");
}

function component_end(row, col) {
    return eval(page_array[row][col].slice(1,-1)+"_end");

}

