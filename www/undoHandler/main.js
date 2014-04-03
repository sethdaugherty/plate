define(
    [
        'dojo/dom'
    ],
    function(dom){

        var canvas;
        var context;

        var history = [];

        return {

            startup: function(canvasId)
            {
                canvas = dom.byId(canvasId);
                context = canvas.getContext("2d");

                return;
            },

            save: function()
            {
                console.log("saving");
                history.push(context.getImageData(0,0, canvas.width, canvas.height));
                context.save();
            },

            undo: function()
            {
                console.log("undoing");
                if (history.length > 0) {
                    var imgData = history.pop();
                    context.putImageData(imgData, 0, 0);
                    context.restore();
                }
            }
        };
    });
