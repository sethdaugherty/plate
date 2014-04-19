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

                console.log("created image menu");

                menu = new Menu({
                    id: id
                });

                // define the task sub-menu items
                menu.addChild(new MenuItem({
                    id: "invert",
                    label: "Invert",
                    onClick: function()
                    {
                      console.log("clicked invert!");
                      Caman("#mainCanvas", "/invert?imgsrc=Guy.jpg");
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
