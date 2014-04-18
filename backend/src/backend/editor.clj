(ns backend.editor
    (:use backend.template.editor
          [hiccup core page]))

(defn editor []
  (render-in-editor-template ["hi"]))

