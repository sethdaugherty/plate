(ns backend.handler
  (:use compojure.core
        backend.views
        backend.editor
        backend.errors
        backend.image.invert
        [hiccup.middleware :only (wrap-base-url)])
  (:require [compojure.response :as response]
            [compojure.handler :as handler]
            [compojure.route :as route]))

(defroutes app-routes
  (GET "/" [] (index-page))
  (POST "/invert" [base64] (invert base64))
  (GET "/editor" [] (editor))
  (route/resources "/")
  (route/not-found (error404)))

(def app
  (-> (handler/site app-routes)
      (wrap-base-url)))
