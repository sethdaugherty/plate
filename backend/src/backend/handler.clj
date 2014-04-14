(ns backend.handler
  (:use compojure.core
        backend.views
        backend.template
        backend.errors
        [hiccup.middleware :only (wrap-base-url)])
  (:require [compojure.response :as response]
            [compojure.handler :as handler]
            [compojure.route :as route]))

(defroutes app-routes
  (GET "/" [] (index-page))
  (route/resources "/")
  (route/not-found (error404)))

(def app
  (-> (handler/site app-routes)
      (wrap-base-url)))
