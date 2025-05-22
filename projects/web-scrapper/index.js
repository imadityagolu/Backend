/**
 * 1. install "npm init" make package and index file
 * 2. install terminal browser - puppeteer npm
 *  website : https://www.npmjs.com/package/puppeteer
 * ----- puppeteer is a 3rd party application and it has its own keys
 * 3. install a browser
 * 4. open the website link
 * 5. link all the tags
 * 6. wait for page to load
 * 7. after page is loaded extract required data
*/

import puppeteer from "puppeteer";

// add ( "type": "module", ) in package.json file 

import fs from "node:fs";

try {

    // launching browser
    const browser = await puppeteer.launch();

    // loading new page
    const page = await browser.newPage();

    // adding url in browser, waiting until the all things are loader from the network
    await page.goto("https://www.amazon.in/", {waitUntil: "domcontentloaded"});

    // finding the search box from web and getting its id , typing our search keywords
    await page.type("#twotabsearchtextbox", "smartphone under 20k")

    // clicking on search by finding its id from web
    await page.click("#nav-search-submit-button");

    // now we will wait until all the search is done and page network completes its task
    await page.waitForNavigation({waitUntil: "networkidle2"});

    // evaluating the page loaded
    const details = await page.evaluate(() => {
        const productCard = document.querySelectorAll(".s-result-item");
        productDetails = [];

            productCard.forEach((product) => {
                const title = product.querySelector("h2 span") ? product.querySelector("h2 span").innerText : ""
                const price = product.querySelector(".a-price-whole") ? product.querySelector(".a-price-whole").innerText : ""

                productDetails.push({title, price});
            })
            return productDetails;
    })
    // console.log(details);

    // saving the data
    fs.writeFileSync("products.json", JSON.stringify(details), (error) => {
        if(error){
            console.log("error while saving data");
            return;
        }
        console.log("data saved");
    })

    // closing browser after work is done
    await browser.close();

    // checking whether code is working or not
    console.log("code is working");

} catch {
    console.log(error);
}
