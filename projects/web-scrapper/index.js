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

//for excel sheet
import XLSX from "xlsx";

try {

    // launching browser
    const browser = await puppeteer.launch();

    // loading new page
    const page = await browser.newPage();

    // adding url in browser, wait until all the things are loaded from the network
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
                const available = product.querySelector(".a-button-text") ? product.querySelector(".a-button-text").innerText : ""
                const rating = product.querySelector(".a-icon-alt") ? product.querySelector(".a-icon-alt").innerText : ""

                productDetails.push({title, price, available, rating});
            })
            return productDetails;
    })

    // console details of product in terminal
		console.log(details);

// puting data in excel file-----------------

    // creating sheet
        const sheet = XLSX.utils.book_new();

    //json to sheet
        const rowcolm = XLSX.utils.json_to_sheet(details);

    // append both in one file with filename
        XLSX.utils.book_append_sheet(sheet, rowcolm, "products.xlsx");

    // creating excel file
        XLSX.writeFileXLSX(sheet, "products.xlsx");

    // closing browser after work is done
    await browser.close();

    // checking whether code is working or not
    console.log("code is working, file converted to excel sheet !!");

} catch(error) {
    console.log("Error : " + error);
}