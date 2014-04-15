(ns backend.template
    (:use [hiccup core page]))

(defn render-in-template [content]
    (html5
        [:head
          [:title "Plate"]
          (include-css "http://yui.yahooapis.com/pure/0.4.2/pure-min.css")]
          (include-css "/css/custom_pure_skin.css")
          (include-css "/css/style.css")
        [:body {:class "pure-skin-blue"}
          [:div {:id "header" :class "home-menu pure-menu pure-menu-open pure-menu-horizontal pure-menu-fixed pure-skin-blue"}
            [:a {:class "pure-menu-heading" :href "/"} "Plate"]
            [:ul
              [:li {:class "pure-menu-selected"}
                [:a {:href "/"} "Home"]]
              [:li 
                [:a {:href "/tour"} "Tour"]]
              [:li
                [:a {:href "/signup"} "Sign Up"]]]]
          [:div {:class "content-wrapper"}
                [:div {:class "content is-center"}
                      [:h2 {:class "content-head is-center"} "Content heading"]
                      content]
                [:div {:class "footer l-box is-center"} "Footer!"]]

          
          ]))
