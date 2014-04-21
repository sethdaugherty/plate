define(
    [
        'dojo/dom',
        'dojo/request',
        'dojo/dom-construct',
        "dijit/Menu",
        "dijit/MenuItem",
        "dijit/MenuBar",
        "dijit/MenuBarItem",
        "dijit/PopupMenuBarItem"
    ],
    function(dom, request, domConstruct, Menu, MenuItem, MenuBar, MenuBarItem, PopupMenuBarItem){

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
                      var canvas = document.getElementById("mainCanvas");
                      var dataUrl = canvas.toDataURL();
                      var base64string = dataUrl.substr(dataUrl.indexOf("base64")+7);
                      console.log(base64string);
                      request.post
                      (
                        "/invert",
                        {
                          data: {
                            base64: base64string
                          }
                        }
                      ).then(function(text)
                      {
                        console.log("done inverting");
                      });


                      console.log("clicked invert!");
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
