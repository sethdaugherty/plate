(ns backend.views
    (:use backend.template 
          [hiccup core page]))

(defn index-page []
      (render-in-template "holy shit!"))
