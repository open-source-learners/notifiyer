// var questions = _.sampleSize(Questions.Questions.chem101,12);
//     const [index, setIndex] = useState(0);
//     const [progress, setProgres] = useState(5);
//     var min = 0;
//     var sec = 0;
//     var quest = questions[index];
//     var ans = quest.ans;
//     var opts = _.shuffle(quest.decoy);
//     console.log(ans)
//         // know our current index
//    const indexCounter = ()=>{
//         if(index < questions.length){
//             setIndex(index + 1);
//             setProgres(Math.floor(((index + 1)/questions.length)*100))
            
//         }else if(index == questions.length-1){
//             // send the result to the backend in here
//             console.log(score)
//             navigation.navigate('Congratulation')
//         }
//     }

//     export default indexCounter;

//       // mark the options
//     const indicator = (optIndex) =>{
//         if(optIndex == 0){
//             return "A"
//         }else if(optIndex == 1){
//             return "B"
//         }else if(optIndex == 2){
//             return "C"
//         }else{
//             return "D"
//         }
//     }

//     export default indicator;


//     // the progess bar

//     function progressLevel(){
//         return(
//                 {height: 3,
//                 backgroundColor:"rgb(108, 0 , 208)",
//                 alignItems:"flex-start",
//                 borderRadius:15,
//                 width: index == questions.length - 1 ? "100%" : progress + "%"
            
//             }
//         )
//     }

//     export default progressLevel;

//     // take a participant to see his result

//     const finished = ()=>{
//         navigation.navigate("Congratulation")
//     }


//     const Timer =(props)=>{
//         const [seconds, setSeconds] = useState(0);
//         const [minutes, setminnutes] = useState(0);

//         // useEffect(()=>{
//      const stopTimer = setTimeout(()=>{
//             if(seconds < 69){
//                 setSeconds(seconds + 1);
//             }else{
//                 setSeconds(0);
//                 setminnutes(minutes + 1);
//             }
    
//         },1000);
       
//     //  });

//      if(minutes == 5){
//          clearTimeout(stopTimer);
//          navigation.navigate("Congratulation")
//      }
//     return(
//         // the timer ui
//         <div className="time">
//                 <MdOutlineHourglassFull/>
//                 30:00
//                 </div>
//     )
// }


// export default Timer;




// the lodash gabage
// if(selectedOp.length !== 0){
//     if(_.findIndex(selectedOp,{'questionIndex':cindex, 
//       'optionIndex':i}) !== -1){
//           let matchedComparison = selectedOp;
//               matchedComparison = _.dropWhile(matchedComparison,
//                   {'questionIndex':cindex, 
//                       'optionIndex':i});
//                       setSelectedOp(matchedComparison);
//       }else if(_.findIndex(selectedOp,{'questionIndex':cindex}) !== -1){
//           let matchedComparison = selectedOp;
//               matchedComparison = _.dropWhile(matchedComparison,
//                   {'questionIndex':cindex});
//                       setSelectedOp(matchedComparison);
//       }else{
//         let  newSelected = [...selectedOp,{
//               'questionIndex':cindex, 
//               'optionIndex':i}]
//           setSelectedOp(newSelected)
//       } }else{
//           setSelectedOp([{
//               'questionIndex':cindex, 
//               'optionIndex':i}])
//       }

//       console.log(selectedOp)



// const [items, setItems] = useState([]);

// useEffect(() => {
//   localStorage.setItem('items', JSON.stringify(items));
// }, [items]);



// const [items, setItems] = useState([]);

// useEffect(() => {
//   const items = JSON.parse(localStorage.getItem('items'));
//   if (items) {
//    setItems(items);
//   }
// }, []);