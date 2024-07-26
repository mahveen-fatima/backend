import multer from "multer";

// using multer diskStorage to save file temoprary in server
const storage = multer.diskStorage({
    destination: function (req, file, cb) { // taking files from client
      cb(null, "./public/temp") // keep the files here
    },
    filename: function (req, file, cb) {
    // can add any options to the method ( file ) // read docs on github
      cb(null, file.originalname) // can save with any name by writing logic
    }
  })
  
export const upload = multer({ 
    storage, 
})