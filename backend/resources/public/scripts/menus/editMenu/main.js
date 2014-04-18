define(
    [
        'dojo/dom',
        "dijit/Menu",
        "dijit/MenuItem",
        "dijit/MenuBar",
        "dijit/MenuBarItem",
        "dijit/PopupMenuBarItem"
    ],
    function(dom, Menu, MenuItem, MenuBar, MenuBarItem, PopupMenuBarItem){

        var menu;


        return {

            create: function(id) {

                console.log("created edit menu");

                menu = new Menu({
                    id: id
                });

                // define the task sub-menu items
                menu.addChild(new MenuItem({
                    id: "undo",
                    label: "Undo",
                    onClick: function()
                    {
                      console.log("clicked undo!");
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
