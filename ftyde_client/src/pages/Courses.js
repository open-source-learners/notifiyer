import react from 'react';
import Exams from '../imgs/Exapms.png';
import CoursesData from "../CoursesData";

function Courses(){
    return(
        <div className="courses">

            <div className="hero">
            <img src={Exams}/>
            <div className='image-cover'></div>
            <div className="hero-texts">
            <div class="show-case-title">
                        <div class="show-case-circle"></div>
                        <h2>Explore Progress You make!</h2>
                    </div>
                
                <p>json provides metadata used when your web 
                    app is installed on a</p>
            </div>
            </div>

            <div className="products">
             {CoursesData.map((course)=>{
                 return(
                 <div className="products_list" key={course.name}>
                    <a href={`/quiz/${course.name}`}> 
                    <img src={require(`../${course.displayImg}`)} alt="" className="im pro-image"/>
                     </a>
                        <div className="effect"></div>
                 <p className="text text-muted">
                   {course.name}
                 </p>
               </div>)
             })}
            </div>

        </div>
        
    )
}

export default Courses;