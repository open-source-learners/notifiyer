const Questions = require('../models/questions')


module.exports = {
    addQuestion:(req,res)=>{
        const {question, options, answer, level , category} = req.body;
        if(!question || !options || !answer || !category ){

            res.json({
                msg:"filled out the rquired fields"
    })}else{
        const Question = new Questions({
            question,
            options,
            answer,
            level,
            category
        });
            
        Question.save((err,quest)=>{
            res.status(201).json({quest})
        })
    }
    


    },
    testQuest:(req,res)=>{
        // a function to select random questions
        const randomSlector = (ramdomQuest,allQuest)=>{
            let randomIndext;
            for(let i = 0; i <= 5; i++){
                 randomIndext = Math.floor(Math.random()*allQuest.length);
                 ramdomQuest.push(allQuest[randomIndext]);
            }
                return ramdomQuest;
        }
        // extract category from url
        const niche = req.params.category;
        let ramdomQuests = [];

        // check if the category is all fetch all questins
        //otherwise select that particular group of questions
        if(niche == 'all'){
            Questions.find({},(err,foundQuestions)=>{
                console.log(randomSlector(ramdomQuests,foundQuestions))
                res.send(randomSlector(ramdomQuests,foundQuestions));
            })
        }else{
            Questions.find({category:niche},(err,foundQuestions)=>{
                console.log(foundQuestions)
                // console.log(randomSlector(ramdomQuests,foundQuestions))
                res.json({questions:randomSlector(ramdomQuests,foundQuestions),
                            student:req.user});
        })}
    }
}