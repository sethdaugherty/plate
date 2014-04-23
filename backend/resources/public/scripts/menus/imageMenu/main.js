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
        "dijit/PopupMenuItem",
        "adjustMenu"
    ],
    function(dom, request, domConstruct, Menu, MenuItem, MenuBar, MenuBarItem, PopupMenuBarItem, PopupMenuItem, AdjustMenu){

        var menu;
        var adjustMenu;

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
                        console.log("/images/" + text);
                        var context = canvas.getContext("2d");
                        console.log(context);
                        var image = new Image();
                        image.src = "/images/" + text;
                        image.onload = function()
                        {
                          context.clearRect(0, 0, canvas.width, canvas.height);
                          context.drawImage(image, 0, 0);
                        };
                      });


                      console.log("clicked invert!");
                    }
                }));

                adjustMenu = AdjustMenu.create("adjustMenu");
                menu.addChild(new PopupMenuItem({
                  label: "Adjust",
                  popup: adjustMenu
                }));
                return menu;
            },

            startup: function()
            {
                menu.startup();
                adjustMenu.startup();
                return;
            }
        };
    });
