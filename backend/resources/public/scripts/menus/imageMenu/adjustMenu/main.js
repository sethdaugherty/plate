define(
    [
        'dojo/dom',
        'dojo/request',
        'dojo/dom-construct',
        "dijit/Menu",
        "dijit/MenuItem",
        "dijit/MenuBar",
        "dijit/MenuBarItem",
        "dijit/PopupMenuBarItem",
        "dijit/Dialog",
        "dijit/form/HorizontalSlider",
        "dijit/form/Button"
    ],
    function(dom, request, domConstruct, Menu, MenuItem, MenuBar, MenuBarItem, PopupMenuBarItem, Dialog, HorizontalSlider, Button){

        var menu;
        var brightnessContrastDialog;
        var oldImageData = [];

	var saveBrightness = function()
  {
    var canvas = document.getElementById("mainCanvas");
    var context = canvas.getContext("2d");
    console.log(oldImageData);
    oldImageData = context.getImageData(0,0,canvas.width, canvas.height).data;
    console.log(oldImageData);
  };

  var restoreOriginalData = function()
  {
    var canvas = document.getElementById("mainCanvas");
    var context = canvas.getContext("2d");
    
    var length = oldImageData.length;
    var newImageData = context.createImageData(canvas.width, canvas.height);
    console.log("restoring to:", oldImageData);
    for (var i = 0 ; i < length ; i += 1)
    {
      newImageData.data[i] = oldImageData[i];
    }
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.putImageData(newImageData,0,0);
  };

	var adjustBrightness = function(brightness)
  {
    console.log(brightness);
    var canvas = document.getElementById("mainCanvas");
    var context = canvas.getContext("2d");
    var imageData = context.getImageData(0,0,canvas.width, canvas.height);
    
    var length = oldImageData.length;
    var newImageData = context.createImageData(canvas.width, canvas.height);
    
    for (var i = 0; i < length; i += 4)
    {
      newImageData.data[i] = Math.max(0,Math.min(255, oldImageData[i] * brightness));
      newImageData.data[i+1] = Math.max(0,Math.min(255, oldImageData[i+1] * brightness));
      newImageData.data[i+2] = Math.max(0, Math.min(255, oldImageData[i+2] * brightness));
      newImageData.data[i+3] = (oldImageData[i+3]); // don't invert the opacity!
    }

    context.clearRect(0, 0, canvas.width, canvas.height);
    context.putImageData(newImageData,0,0);
    console.log(newImageData);
  };

        return {

            create: function(id) {

                console.log("created image menu");

                menu = new Menu({
                    id: id
                });

                // define the task sub-menu items
                menu.addChild(new MenuItem({
                    id: "brightnessContrast",
                    label: "Brightness/Contrast",
                    onClick: function()
                    {
                      saveBrightness();
                      var popupContent = "<div>Minimum</div>" +
                          "<div>Maximum</div>" +
                          "<div><div id='brightnessSlider'></div>Brightness</div>" +
                          "<div>Contrast</div>" +
                          "<button id='saveButton'>Save</button>";
                        
                      brightnessContrastDialog = new Dialog({
                        title: "Brightness/Contrast",
                        content: popupContent,
                        style: "width: 300px"
                      });
                      
                      brightnessContrastDialog.connect(brightnessContrastDialog, "hide", function(e) {
                        console.log("closed the box");
                        restoreOriginalData();
                      });

                      var brightnessSlider = new HorizontalSlider({
                        name: "brightnessSlider",
                        value: 0.5,
                        minimum: 0,
                        maximum: 1,
                        intermediateChanges: true,
                        style: "width: 300px",
                        onChange: function(value)
                        {
                          adjustBrightness(value);
                        }
                      }, "brightnessSlider");

		                  var saveButton = new Button({
                        label: "Save",
                        onClick: function()
                        {
                          console.log("saving!");
                          saveBrightness();
                        }
                      }, "saveButton");

                      brightnessContrastDialog.show();
                    }
                }));

                return menu;
            },

            startup: function()
            {
                menu.startup();
                return;
            }
        };
    });
