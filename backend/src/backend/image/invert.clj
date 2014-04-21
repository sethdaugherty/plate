(ns backend.image.invert
    (:use  
          [hiccup core page]))

(def filters (ij.plugin.filter.Filters.))

(defn uuid [] (str (java.util.UUID/randomUUID)))

(defn convertBase64ToImage [base64] 
    (println 
          (first (org.apache.commons.codec.binary.Base64/decodeBase64 base64)
    ))
    (javax.imageio.ImageIO/read 
          (java.io.ByteArrayInputStream. 
            (org.apache.commons.codec.binary.Base64/decodeBase64 base64)))
    )

(defn returnImage [image] 
  (def outfileName (str (uuid) ".jpg"))
  (def outfile (java.io.File. outfileName))
      (javax.imageio.ImageIO/write image "jpg" outfile)
      {:status 200
          :headers {"Content-Type" "application.jpg"}
          :body (java.io.FileInputStream. outfileName)
      })

(defn invert [base64Image] 
     (let []
          (def img 
              (convertBase64ToImage base64Image))         
          (println img)
          (def imageplus 
              (ij.ImagePlus. "title" img))
          (def imageProcessor (ij.process.ColorProcessor. img))
          (.setup filters "invert" imageplus)
          (.run filters imageProcessor)
          (def invertedImg (.createImage imageProcessor))
          (returnImage invertedImg)
    ))
