const express = require("express");
const app = express();

const PORT = 8080;

const puppeteer = require("puppeteer");

const cors = require("cors");
app.use(cors());

const fs = require("fs").promises;

const path = require("path");
app.use(express.static(path.join(__dirname,"public")));


async function scrapeIPLStats(season) {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    
    const url = `https://www.iplt20.com/stats/${season}`;
    await page.goto(url, { waitUntil: 'networkidle2' });
    
    // await page.click(".customSelecBox.statsTypeFilter");

    await page.click(".cSBListItems.batters.selected.ng-binding.ng-scope", "");

    // Handle season selection
    await page.waitForNavigation({waitUntil: "networkidle2"});
    
    const stats = {
        orangeCap: [],
        mostFours: [],
        mostSixes: [],
        mostCenturies: [],
        mostFifties: []
    };

    // Helper function to scrape table data
    async function scrapeTable(category) {
        await page.click(`a[data-tab="${category}"]`);
        await page.waitForSelector('.st-table.tbody.tr');
        
        return await page.evaluate(() => {
            const rows = Array.from(document.querySelectorAll('.st-table.tbody.tr'));
            return rows.slice(0, 10).map(row => {
                const cells = row.querySelectorAll('td');
                return {
                    player: cells[1].textContent.trim(),
                    runs: cells[3].textContent.trim(),
                    matches: cells[2].textContent.trim()
                };
            });
        });
    }

    // Scrape different categories
    stats.orangeCap = await scrapeTable('most-runs');
    stats.mostFours = await scrapeTable('most-fours');
    stats.mostSixes = await scrapeTable('most-sixes');
    stats.mostCenturies = await scrapeTable('most-hundreds');
    stats.mostFifties = await scrapeTable('most-fifties');

    await browser.close();
    return stats;
}

app.get('/api/stats/:season', async (req, res) => {
    try {
        const season = req.params.season;
        const stats = await scrapeIPLStats(season);
        
        // Save to JSON file
        await fs.writeFile(
            path.join(__dirname, 'public', 'data', `${season}_stats.json`),
            JSON.stringify(stats, null, 2)
        );
        
        res.json(stats);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Failed to scrape data' });
    }
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


app.listen(PORT, () => console.log(`server is up at http://localhost:${PORT}`));