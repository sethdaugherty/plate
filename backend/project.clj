(defproject backend "0.1.0-SNAPSHOT"
  :description "FIXME: write description"
  :url "http://example.com/FIXME"
  :dependencies [[org.clojure/clojure "1.5.1"]
                 [compojure "1.1.6"]]
  :plugins [[lein-ring "0.8.10"]]
  :ring {:handler backend.handler/app}
  :java-source-paths ["src/java"]
  :javac-options     ["-target" "1.6" "-source" "1.6" ]
  :profiles
  {:dev {:dependencies [[javax.servlet/servlet-api "2.5"]
                        [ring-mock "0.1.5"]]}})
