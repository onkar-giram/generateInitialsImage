const express = require("express");
const { createCanvas, registerFont } = require("canvas");
const fs = require("fs");
const path = require("path");

const app = express();
const port = 3000;

// Register the "Roboto" font
registerFont(path.join(__dirname, "fonts", "Roboto-Medium.ttf"), {
  family: "Roboto",
});

app.get("/initials-image", (req, res) => {
  const initials = "OG";
  const width = 200;
  const height = 200;

  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext("2d");

  // canvas background
  ctx.fillStyle = "#ffded8";
  ctx.fillRect(0, 0, width, height);

  // text
  ctx.fillStyle = "#2D2F48";
  ctx.font = "500 60px Roboto";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  const x = width / 2;
  const y = height / 2;
  ctx.fillText(initials, x, y);

  // Save canvas to buffer
  const buffer = canvas.toBuffer("image/png");

  // Save buffer to file
  const imagePath = path.join(__dirname, "initials-image.png");
  fs.writeFile(imagePath, buffer, (err) => {
    if (err) {
      res.status(500).send("Error saving the image.");
    } else {
      const imageUrl = `http://localhost:${port}/images/initials-image.png`;
      res.send({ imageUrl });
    }
  });
});

// Serve the saved images
app.use("/images", express.static(path.join(__dirname)));

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
