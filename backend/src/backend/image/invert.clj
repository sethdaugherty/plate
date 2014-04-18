(ns backend.image.invert
    (:use  
          [hiccup core page]))

(def filters (ij.plugin.filter.Filters.))


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
          (def outfile (java.io.File. "output.jpg"))
          (javax.imageio.ImageIO/write invertedImg "jpg" outfile)
          (.toString outfile) 
          ))
