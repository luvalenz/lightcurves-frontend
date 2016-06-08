/**
 * Created by lucas on 08-01-16.
 */
/*
(function() {
    var $ = function(id){return document.getElementById(id)};
    var canvas = this.__canvas = new fabric.Canvas('drawing-canvas', {
        isDrawingMode: true
    });
    fabric.Object.prototype.transparentCorners = false;
    var clearEl = $('clear-canvas');
    clearEl.onclick = function() { canvas.clear() };
    if (canvas.freeDrawingBrush) {
       // canvas.freeDrawingBrush.color = drawingColorEl.value;

    }
})();
*/

draw_grid = function (canvas, gridsize) {
    for(var x=1;x<(canvas.width/gridsize);x++)
    {
        canvas.add(new fabric.Line([x*20, 0, x*20, canvas.height],{ fill: "black", stroke: "black", strokeWidth: 1, selectable:false}));
        canvas.add(new fabric.Line([0, x*20, canvas.width, x*20],{ fill: "black", stroke: "black", strokeWidth: 1, selectable:false}));
        canvas.renderAll();
    }
}


set_canvas = function(canvas){
    canvas.clear();
    var height = canvas.height;
    var width = canvas.width;

    var x0 = $('#x-slider').slider("values", 0);
    var y0 = $('#y-slider').slider("values", 0);
    var x0_line =  new fabric.Line([x0,0,x0,height], {
      fill: 'red',
      stroke: 'red',
      strokeWidth: 5,
      selectable: false
    });

    var y0_line =  new fabric.Line([0,y0,width,y0], {
      fill: 'blue',
      stroke: 'blue',
      strokeWidth: 5,
      selectable: false
    });


    canvas.add(x0_line);
    canvas.add(y0_line);

    draw_grid(canvas, 10);
};


/**
 * http://stackoverflow.com/questions/
 * 21012580/is-it-possible-to-write-data-to-file-using-only-javascript
 */
textFile  = null;
makeTextFile = function (text) {
var data = new Blob([text], {type: 'text/plain'});

// If we are replacing a previously generated file we need to
// manually revoke the object URL to avoid memory leaks.
if (textFile !== null) {
  window.URL.revokeObjectURL(textFile);
}

textFile = window.URL.createObjectURL(data);

// returns a URL you can use as a href
return textFile;
};


$(function(){
    var canvas = new fabric.Canvas('drawing-canvas', {
        isDrawingMode: true
    });
    canvas.freeDrawingBrush.width = 2;
    canvas.freeDrawingBrush.shadowBlur = 0;


    $('#x-slider').slider({
      min: 0,
      max: canvas.width,
      values: [0],
      slide: function( event, ui ) {
          var x0 = ui.values[0];
          var x0_line = canvas.item(0);
          x0_line.set({'x1': x0, 'x2': x0 });
          canvas.renderAll();
      }
    });
    $('#y-slider').slider({
      orientation: 'vertical',
      min: 0,
      max: canvas.height,
      values: [canvas.height/2],
      slide: function( event, ui ) {
          var y0 = ui.values[0];
          var y0_line = canvas.item(1);
          y0_line.set({'y1': canvas.height- y0, 'y2': canvas.height- y0 });
          canvas.renderAll();
      }
    });


    set_canvas(canvas);


    $('#clear-btn').click(function(){
        set_canvas(canvas);
    });

    $('#stringify-btn').click(function(){
        alert(JSON.stringify(canvas));

    });
    $('#search-btn').click(function(){
        alert('search button');
        var svg_text = canvas.toSVG();
        var link = makeTextFile(svg_text);
        window.location.assign(link);
    });





});

