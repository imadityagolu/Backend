const express = require('express');
const { createCanvas } = require('canvas');
const app = express();
const port = 3000;

// Function to generate a random image
function generateRandomImage(width = 500, height = 500) {

    //create canvas
    const newCanvas = createCanvas(width, height);

    //render canvas
    const ctx = newCanvas.getContext('2d');

    // Generate random RGB colors
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);

    // Fill canvas with random color
    ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;

    //fill canvas with color
    ctx.fillRect(0, 0, width, height);

    // Add some random shapes
    for (let i = 0; i < 69; i++) {
        ctx.beginPath();
        ctx.arc(
            Math.random() * width,
            Math.random() * height,
            Math.random() * 30 + 10,
            0,
            Math.PI * 2
        );
        ctx.fillStyle = `rgb(${Math.random() * 256}, ${Math.random() * 256}, ${Math.random() * 256})`;
        ctx.fill();
    }

    return newCanvas.toBuffer('image/png');
}

// Route to get random image
app.get('/apiimagerandom', (req, res) => {
    try {
        const imageBuffer = generateRandomImage();
        res.set('Content-Type', 'image/png');
        res.send(imageBuffer);
    } catch (error) {
        res.status(500)
        .json({ 
            error: 'Failed to generate image' 
        });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at- http://localhost:${port}/apiimagerandom`);
});