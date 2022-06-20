export default function handler(req, res) {
   const issue = {
    name: "Issues test",
    author: "AdamsGeeky",
    labels: ["bug", "enhencement"],
    url: "https://github.com/AdamsGeeky",
   };

   res.status(200).json(issue);
  }
  
