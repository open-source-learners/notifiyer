import { Octokit} from "octokit"; 

export default async function handler(req, res) {
    const octokit = new Octokit();
    const q = "is:open is:issue label:good-first-issue";

    const response = await octokit.request("GET /search/issues", { q });
    const results = response.data.items.map((item) => ({
    name: item.title,
    author: item.user.login,
    /** 
     * labels is an array of objects so we need to use map to get the name of the label
     */
    labels: item.labels.map((label) => label.name),
    url: item.html_url,        
    }));
    const random = Math.floor(Math.random() * results.length + 1);
    res.status(200).json(results[random]); 
  };
  
