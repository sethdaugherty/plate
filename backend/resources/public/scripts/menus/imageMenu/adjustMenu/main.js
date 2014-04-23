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
        "dijit/Dialog"
    ],
    function(dom, request, domConstruct, Menu, MenuItem, MenuBar, MenuBarItem, PopupMenuBarItem, Dialog){

        var menu;
        var brightnessContrastDialog;

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
                      brightnessContrastDialog = new Dialog({
                        title: "Brightness/Contrast",
                        content: "Minimum Maximum Brightness Contrast",
                        style: "width: 300px"
                      });

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
