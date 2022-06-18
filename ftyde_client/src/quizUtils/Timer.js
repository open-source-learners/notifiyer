import {MdOutlineHourglassFull} from "react-icons/md";
import {useState,useEffect} from 'react'
const Timer =(props)=>{
    const [seconds, setSeconds] = useState(10);
    const [minutes, setminnutes] = useState(10);
    let finish = ()=>{
        let gain = Math.ceil((props.score/props.questions)*100);
        console.log(gain + "%")}
    

    // useEffect(()=>{
 const stopTimer = setTimeout(()=>{
        if(seconds == 0){
            setminnutes(minutes - 1);
            setSeconds(59);
        }else{
            setSeconds(seconds - 1);
            
        }

    },1000);
   
//  });

 if(minutes == 0 && seconds == 0){
     console.log(props.score + "%")
     clearTimeout(stopTimer);
 }
return(
    // the timer ui
    <div className="time">
            <MdOutlineHourglassFull/>
            0{minutes}:{seconds}
            </div>
)
}


export default Timer;