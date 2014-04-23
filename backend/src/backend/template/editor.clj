(ns backend.template.editor
    (:use [hiccup core page]))

(defn include-and-configure-dojo []
    '([:script {:type "text/javascript"} 
      "var dojoConfig = {
            async: true,
            baseUrl: '/scripts/',
            packages: [
                'dojo',
                'dijit',
                'dojox',
                {
                  name: 'fileMenu',
                  location: '/scripts/menus/fileMenu'
                },
                {
                  name: 'editMenu',
                  location: '/scripts/menus/editMenu'
                },
                {
                  name: 'imageMenu',
                  location: '/scripts/menus/imageMenu'
                },
                {
                  name: 'adjustMenu',
                  location: '/scripts/menus/imageMenu/adjustMenu'
                }
            ]
        };"]
      [:script {
          :type "text/javascript" 
          :data-dojo-config "async: true" 
          :src "/scripts/dojo/dojo.js"}]
      [:script {
          :type "text/javascript"
          :src "/scripts/caman.full.min.js"}]
       ) 
  )

(defn render-in-editor-template [content]
    (html5
        [:head
          [:title "Plate"]
          (include-css "/css/dojo/themes/claro/claro.css")
          (include-and-configure-dojo)]
        [:body {:class "claro"}
          [:div {:id "mainMenu"}]
          [:canvas {:id "mainCanvas"}]
          [:script {:src "/scripts/editor/setupEditorDojo.js"}]
          
          ]))
