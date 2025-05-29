const axios = require("axios");

//browser
const cheerio = require("cheerio");

//for excel sheet
const XLSX = require("xlsx");

const jobData = [];

const fetchData = async () => {
    try {
        // Make the HTTP request with a User-Agent to mimic a browser
        const response = await axios.get(
            "https://www.timesjobs.com/candidate/job-search.html?searchType=Home_Search&from=submit&asKey=OFF&txtKeywords=&cboPresFuncArea=35",
            {
                headers: {
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
            
            const location = $(job).find("ul.top-jd-dtl.mt-16.clearfix > li:nth-child(1)").text().trim();
            
            const jobType = $(job).find("").text().trim();
            
            const postedDate = $(job).find("span.sim-posted").text().trim();
            
            const jobDesc = $(job).find("ul.list-job-dtl.clearfix > li.job-description__").text().trim();

            // Only add to jobData if companyName is not empty
            if (!companyName) {
                return;
            }

            jobData.push({
                    "Job Title": companyPost,
                    "company name": companyName,
                    "Location": location,
                    "Job Type": jobType,
                    "Posted Date": postedDate,
                    "Job Description": jobDesc,
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