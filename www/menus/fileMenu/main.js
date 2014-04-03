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
            console.log("created file menu");

            menu = new Menu({
                id: id
            });
            // define the task sub-menu items
            menu.addChild(new MenuItem({
                id: "new",
                label: "New"
            }));

            menu.addChild(new MenuItem({
                id: "open",
                label: "Open",
                onClick: function() {console.log("canceled");}
            }));

            menu.addChild(new MenuItem({
                id: "openNext",
                label: "Open Next"
            }));

            menu.addChild(new MenuItem({
                id: "save",
                label: "Save"
            }));

            menu.addChild(new MenuItem({
                id: "close",
                label: "Close"
            }));

            menu.addChild(new MenuItem({
                id: "quit",
                label: "Quit"
            }));

            return menu;
        },

        startup: function()
        {
            menu.startup();
            return;
        },

        restoreText: function (id) {
            var node = dom.byId(id);
            node.innerHTML = oldText[id];
            delete oldText[id];
        }
    };
});
