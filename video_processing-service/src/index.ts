import express from "express";
import ffmpeg from "fluent-ffmpeg";

const app = express();
app.use(express.json());

// root route
app.get("/", (req, res) => {
  res.send("Hello World! This is video processing service");
});
app.get("/yes-i", (req, res) => {
    res.send("Yes I, This is video processing service");
});

app.post("/process-video", (req:any, res:any) => {
  // get the video file from the request body
  const inputFilePath = req.body.inputFilePath;
  const outputFilePath = req.body.outputFilePath;

  if (!inputFilePath || !outputFilePath) {
    return res.status(400).send("Missing file path: inputFilePath and outputFilePath are required");
  }

  ffmpeg(inputFilePath)
   .outputOption("-vf", "scale=-1:360")
   .on("end", () => {
     console.log("Processing finished !");
     res.send("Processing finished !");
   })
   .on("error", (err) => {
     console.log("Error: ", err);
     res.status(500).send("Error processing video");
   })
    .save(outputFilePath);

});

const port = process.env.PORT || 3000;
// root route
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
