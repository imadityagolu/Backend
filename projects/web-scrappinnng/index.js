const axios = require("axios");
const cheerio = require("cheerio");
const XLSX = require("xlsx");

const jobData = [];

const fetchData = async () => {
    try {
        // Make the HTTP request with a User-Agent to mimic a browser
        const response = await axios.get(
            "https://www.timesjobs.com/candidate/job-search.html?searchType=Home_Search&from=submit&asKey=OFF&txtKeywords=&cboPresFuncArea=35&clusterName=CLUSTER_FA&hc=CLUSTER_FA",
            {
                headers: {
                    "User-Agent":
                        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
                    "content-type": "text/html",
                },
            }
        );

        // Load the HTML into Cheerio
        const $ = cheerio.load(response.data);

        // Debug: Log the response status and a snippet of the HTML
        console.log("Response Status:", response.status);

        // Select job containers (updated selector based on potential structure)
        const jobContainer = $("li.clearfix.job-bx.wht-shd-bx");

        if (jobContainer.length === 0) {
            console.log("No job found.");
            return;
        }

        // Iterate over each job container
        jobContainer.each((i, job) => {
            // Extract company name
            const companyName = $(job).find("h3.joblist-comp-name").text().trim();

            const companyPost = $(job).find("h2.heading-trun").text().trim();

            const companySalary = $(job).find("ul.top-jd-dtl.mt-16.clearfix > li:nth-child(3)").text().trim();

            // Only add to jobData if companyName is not empty
            if (!companyName) {
                return;
            }

            jobData.push({
                    "company name": companyName,
                    "company post": companyPost,
                    "pay salary": companySalary,
                });
        });

        // if no data found
        if (jobData.length === 0) {
            console.log("No job data collected.");
        }

        // console the final jobData
        // console.log(jobData);

// puting data in excel file-----------------

        // creating sheet
        const sheet = XLSX.utils.book_new();

        //json to sheet
        const rowcolm = XLSX.utils.json_to_sheet(jobData);

        // append both in one file with filename
        XLSX.utils.book_append_sheet(sheet, rowcolm, "jobdata.xlsx");

        // creating excel file
        XLSX.writeFileXLSX(sheet, "jobdata.xlsx");

    } catch (error) {
        
        console.error("Error while scraping");
    }
};

fetchData();