// Require dependencies
require([
    "dijit/Menu",
    "dijit/MenuItem",
    "dijit/MenuBar",
    "dijit/MenuBarItem",
    "dijit/PopupMenuBarItem",
    "fileMenu",
    "editMenu",
    "dojo/domReady!"
], function
   (
       Menu,
       MenuItem,
       MenuBar,
       MenuBarItem,
       PopupMenuBarItem,
       FileMenu,
       EditMenu
    )
    {
        console.log(FileMenu);
        console.log(EditMenu);
    // create the Menu container
    var mainMenu = new MenuBar({}, "mainMenu");

    // create Menu container and child MenuItems
    // for our sub-menu (no srcNodeRef; we will
    //add it under a PopupMenuItem)

    var fileMenu = FileMenu.create("fileMenu");

    var editMenu = EditMenu.create("editMenu");

    // create and add main menu items
    mainMenu.addChild(new PopupMenuBarItem({
        id: "file",
        label: "File",
        popup: fileMenu
    }));

    mainMenu.addChild(new PopupMenuBarItem({
        id: "edit",
        label: "Edit",
        popup: editMenu
    }));

    // make task menu item open the sub-menu we defined above
    mainMenu.addChild(new MenuBarItem({
        id: "image",
        label: "Image"
    //    popup: taskMenu
    }));

    mainMenu.addChild(new MenuBarItem({
        id: "process",
        label: "Process"
    //    popup: taskMenu
    }));

    mainMenu.addChild(new MenuBarItem({
        id: "analyze",
        label: "Analyze"
      //  popup: taskMenu
    }));

    mainMenu.addChild(new MenuBarItem({
        id: "plugins",
        label: "Plugins"
    //    popup: taskMenu
    }));

    mainMenu.addChild(new MenuBarItem({
        id: "window",
        label: "Window"
        //popup: taskMenu
    }));

    mainMenu.addChild(new MenuBarItem({
        id: "help",
        label: "Help"
        //popup: taskMenu
    }));

    mainMenu.startup();
    fileMenu.startup();
        console.log("starting editmenu");
    editMenu.startup();
});
