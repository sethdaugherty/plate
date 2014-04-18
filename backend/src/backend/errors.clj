(ns backend.errors
    (:use backend.template.main 
          [hiccup core page]))

(defn error404 []
      (render-in-template "Error 404: Page not found"))
