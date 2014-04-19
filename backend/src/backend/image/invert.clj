(ns backend.image.invert
    (:use  
          [hiccup core page]))

(def filters (ij.plugin.filter.Filters.))

(defn uuid [] (str (java.util.UUID/randomUUID)))

(defn returnImage [image] 
  (def outfileName (str (uuid) ".jpg"))
  (def outfile (java.io.File. outfileName))
      (javax.imageio.ImageIO/write invertedImg "jpg" outfile)
      {:status 200
          :headers {"Content-Type" "application.jpg"}
          :body (java.io.FileInputStream. outfileName)
      })

(defn invert [imgsrc] 
     (let []
          (def img 
              (javax.imageio.ImageIO/read 
                  (java.io.File. (str
                            "/home/seth/workspace/plate/plate/backend/resources/public/images/" imgsrc))))         
          (def imageplus 
                         (ij.ImagePlus. "title" img))
          (def imageProcessor (ij.process.ColorProcessor. img))
          (.setup filters "invert" imageplus)
          (.run filters imageProcessor)
          (def invertedImg (.createImage imageProcessor))
          (returnImage invertedImg)
    ))
