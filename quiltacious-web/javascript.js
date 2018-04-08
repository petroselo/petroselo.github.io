//check if user is on mobile
window.mobileAndTabletcheck = function() {
  var check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))check = true})(navigator.userAgent||navigator.vendor||window.opera);
  return check;
}

if(window.mobileAndTabletcheck == true){
	for (var i = 0; i < 4; i++) {
		document.getElementById('col' + (i + 1)).setAttribute("readonly", "true");
	};
}





//----------------------------------------------------------------/

//variable needed for the quilt creation
var width;
var height;
var widthLim;

//variables needed for the square diting
var r;
var c;
var q = [];

// called when create quilt button is pushed
function createQuilt () {
	// assigns height and width to variables. 
	width = document.getElementById('fwidth').value;
	height = document.getElementById('fheight').value;

	//verify that imput is valid
	if (checkInput(width, height)) {
		alert("Please enter only numbers.")
		return;
	}


	// define the array database thing
	createArray();

	//fill the array with white type ones
	fillArray();

	// removes previous html from quilt
	resetQuilt();

	// two for loops create the rows and columns and svgs
	renderQuilt()

	// sizes the table to the available viewport
	sizeQuilt();


}

// check quilt height & width input
function checkInput (width, height) {
	if (isNaN(width) || isNaN(height))
		return true;
	else
		return false;
}

//remove html from quilt.
function resetQuilt () {
	document.getElementById("quilt-table").innerHTML = "";
	console.log('reset the quilt');
}

// creates the html table elements
function renderQuilt () {
	for (var i = 0; i < height; i++) {
		var tabr = document.createElement("tr");
		tabr.id = i;
		document.getElementById("quilt-table").appendChild(tabr);

		for (var j = 0; j < width; j++) {
			var tabc = document.createElement("td");
			tabc.id = i + "," + j;
			tabc.setAttribute("onclick", "editSquare('" + i + "," + j + "')");
			document.getElementById(i).appendChild(tabc);

			//update svg in all of the cells
			r = i;
			c = j;
			pushToQuilt();
			console.log("pushed to quilt");
		};
	};
	//reset randc afer using them
	r = 0;
	c = 0;
	loadSquare();
}

//sizes the quilt table to view port with regards to width and height. 
function sizeQuilt () {
	// check wether viewpoort ratio or table ratio os larger
	if (((width + 0.000) / (height + 0.000)) > ((document.documentElement.clientWidth * 0.7) / document.documentElement.clientHeight)) 
		document.getElementById("cell-styler").innerHTML = "#quilt-table tr td{ width: calc(" + 70 / width + "vw - 2px); height: calc(" + 70 / width + "vw - 1px);}";
	else
		document.getElementById("cell-styler").innerHTML = "#quilt-table tr td{ width: calc(" + 100 / height + "vh - 2px); height: calc(" + 100 / height + "vh - 1px);}";
}

function createArray () {
	q = [];
	for (var i = 0; i < height; i++) {
		q.push([]);
		for (var j = 0; j < width; j++) {
			q[i].push([]);
		}
	}

}

//fills the entire array with white type one.
function fillArray () {
	for (var i = 0; i < height; i++) {
		for (var j = 0; j < width; j++) {
			q[i][j][0] = 1;
			for (var k = 0; k < 4; k++) {
				if (q[i][j][k + 1] === undefined)
					q[i][j][k + 1] = "ffffff";
			}
		}
	}	
}

function editSquare(position) {
	console.log("editing square");
	assignRC(position);
	//q [r] [c] [0] = type

	//load the current square values into the edit square thing
	loadSquare();

}

// convert the r#c# to variables r & c to work with.
function assignRC (randc) {
	//split at comma
	var array = randc.split(',');
	r = parseInt(array[0]);
	c = parseInt(array[1]);
}

function loadSquare () {
	var type = q[r][c][0];
	for (var i = 0; i < 4; i++) {
			document.getElementById("type" + (i + 1)).style.border = "0px";
		}
	
	//highlight the	type
	document.getElementById("type" + q[r][c][0]).style.border = "1px solid blue";
	
	//update the preview to match the type
	switch (type) {
		case 1: 
			document.getElementById("preview").innerHTML = '<rect id="pre1" width="2" height="2"/>';
			break;

		case 2:
			document.getElementById("preview").innerHTML = '<polygon id="pre1" points="0,0 0,2 2,2" /><polygon id="pre2" points="0,0 2,2 2,0" />';
			break;

		case 3:
			document.getElementById("preview").innerHTML = '<polygon id="pre1" points="0,0 0,2 2,0" /><polygon id="pre2" points="0,2 2,2 2,0" />';
			break;

		case 4:
			document.getElementById("preview").innerHTML = '<polygon id="pre1" points="0,0 1,1 2,0" /><polygon id="pre2" points="0,0 1,1 0,2" /><polygon id="pre3" points="2,0 1,1 2,2" /><polygon id="pre4" points="0,2 1,1 2,2" />';
			break;
	}

	//update preview and color controls
	for (var i = 0; i < 4; i++) {
		document.getElementById("col" + (i + 1)).color.fromString(q[r][c][i + 1]);
	};
	
	document.getElementById('preview-styler').innerHTML = '#pre1 {fill: #' + q[r][c][1] + ';} #pre2 {fill: #' + q[r][c][2] + ';} #pre3 {fill: #' + q[r][c][3] + ';} #pre4 {fill: #' + q[r][c][4] + ';}';


}

//these functions get the values after making sure a square is being edited and store them in the database
function selectType (type) {
	if (r === undefined) {
		alert("Please select a square to edit first.")
		return;
	}
	
	q[r][c][0] = type;
	
	//reset border and assign new one
	for (var i = 0; i < 4; i++) {
		document.getElementById("type" + (i + 1)).style.border = "0px";
	};
	document.getElementById("type" + type).style.border = "1px solid blue";
	
	switch (type) {
		case 1: 
			document.getElementById("preview").innerHTML = '<rect id="pre1" width="2" height="2"/>';
			break;

		case 2:
			document.getElementById("preview").innerHTML = '<polygon id="pre1" points="0,0 0,2 2,2" /><polygon id="pre2" points="0,0 2,2 2,0" />';
			break;

		case 3:
			document.getElementById("preview").innerHTML = '<polygon id="pre1" points="0,0 0,2 2,0" /><polygon id="pre2" points="0,2 2,2 2,0" />';
			break;

		case 4:
			document.getElementById("preview").innerHTML = '<polygon id="pre1" points="0,0 1,1 2,0" /><polygon id="pre2" points="0,0 1,1 0,2" /><polygon id="pre3" points="2,0 1,1 2,2" /><polygon id="pre4" points="0,2 1,1 2,2" />';
			break;
	}

	//update quilt
	pushToQuilt();
}

function selectColor (colorNumber, colorValue) {
	//put color in array, update preview, update quilt
	q[r][c][colorNumber] = colorValue;
	document.getElementById('preview-styler').innerHTML = '#pre1 {fill: #' + q[r][c][1] + ';} #pre2 {fill: #' + q[r][c][2] + ';} #pre3 {fill: #' + q[r][c][3] + ';} #pre4 {fill: #' + q[r][c][4] + ';}';
	pushToQuilt();
}

function pushToQuilt() {
	//takes values and pushes them to the quilt
	// everything is stored in array and randc are available
	switch (q[r][c][0]) {
		case 1: 
			document.getElementById(r + "," + c).innerHTML = '<svg class="square-img" viewbox="0 0 2 2"><rect style="fill: #' + q[r][c][1] + ';" width="2" height="2"></rect></svg>';
			break;

		case 2:
			document.getElementById(r + "," + c).innerHTML = '<svg class="square-img" viewbox="0 0 2 2"><polygon style="fill: #' + q[r][c][1] + ';" points="0,0 0,2 2,2"></polygon> <polygon style="fill: #' + q[r][c][2] + ';" points="0,0 2,2 2,0"></polygon></svg>';
			break;

		case 3:
			document.getElementById(r + "," + c).innerHTML = '<svg class="square-img" viewbox="0 0 2 2"><polygon style="fill: #' + q[r][c][1] + ';" points="0,0 0,2 2,0"></polygon> <polygon style="fill: #' + q[r][c][2] + ';" points="0,2 2,2 2,0"></polygon></svg>';
			break;

		case 4:
			document.getElementById(r + "," + c).innerHTML = '<svg class="square-img" viewbox="0 0 2 2"><polygon style="fill: #' + q[r][c][1] + ';" points="0,0 1,1 2,0"></polygon> <polygon style="fill: #' + q[r][c][2] + ';" points="0,0 1,1 0,2"></polygon><polygon style="fill: #' + q[r][c][3] + ';" points="2,0 1,1 2,2"></polygon><polygon style="fill: #' + q[r][c][4] + ';" points="0,2 1,1 2,2"></polygon></svg>';
			break;
	}
}

//eventually add a save and load feature. possibly out/inputting the array or the table itself
	
function loadsaveBox () {
	document.getElementById('greyout-container').innerHTML = '<div id="greyout" onclick="cancelGrey();"></div>';
	document.getElementById('loadsave-box-container').innerHTML = '<div id="loadsave-box"></div>';
	document.getElementById('loadsave-box').innerHTML = '<h3>Load or Save Quilt</h3><br/>To save quilt, copy the key and save it.<br/>To load a quilt, paste the key and press load.<br/><br/>Key: <input type="text" name="loadsave" id="floadsave" /><br/><br/><button type="button" onclick="copyKey()" id="copy-button">Copy</button>        <button type="button" onclick="loadKey()" id="load-button">Load</button>';
	if(height > 0 && width > 0)
		document.getElementById('floadsave').value = width + '.' + height + '.' + q;
	document.getElementById('floadsave').select();
}

function cancelGrey () {
	document.getElementById('greyout-container').innerHTML = "";
	document.getElementById('loadsave-box-container').innerHTML = "";
}

function copyKey () {
	document.getElementById('floadsave').select();
	document.execCommand('copy');
}

function loadKey () {
	//get the key
	var key = document.getElementById('floadsave').value.split('.');

	//and split it into width height and data
	width = parseInt(key[0]);
	height = parseInt(key[1]);
	var data = key[2].split(',');

	//set the q array
	createArray();

	//for loop for assigning the data into the q array.
	var h = 0;
	for (var i = 0; i < height; i++) {
		for (var j = 0; j < width; j++) {
			for (var k = 0; k < 5; k++) {
				if (data[h] == 1 || data[h] == 2 || data[h] == 3 || data[h] == 4)
					q[i][j][k] = parseInt(data[h]);
				else
					q[i][j][k] = data[h];
				h++;
			}
		}
	}
	
	//create the quilt. and render it; and size it;
	resetQuilt();
	renderQuilt();
	sizeQuilt();
	//cancel the grey out
	cancelGrey();
}