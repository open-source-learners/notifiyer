import {useState} from "react"
import {FaTelegramPlane} from "react-icons/fa"
import {Formik} from "formik";
import axios from 'axios';
import { useNavigate, Link } from "react-router-dom";

function Login(){
  const [ero,setEro] = useState("");
  const [errClass,setErrClass] = useState("no-err");
  let navigate = useNavigate();
  function showErr(){
    setTimeout(() => {
      setErrClass('no-err')
    }, 2000);
  }
    return(
        <div className="login">
            <div className="form-wraper fwr">
            <div className="register">
              <h3>Already Have Account?</h3>
              <Link to="/login">Login</Link>
            </div>
            <div>
                {/* <div className="social-login">
                <a href="">login with google</a>
                <a href="">login with facebook</a>
                </div> */}
                {/* <form>
                    <input type='text' placeholder="Full Name"/>
                    <input type='email' placeholder="Email"/>
                    <input type='password' placeholder="Password"/>
                    <button type="submit">Login <FaTelegramPlane/> </button>
                </form> */}

                <h3>Register</h3>
                
                <div className={errClass}>{ero}</div>
                <Formik
      initialValues={{ email: '', password: '', name:'' }}
      validate={values => {
        const errors = {};
        if(!values.name){
          errors.name = 'required!';
      }else if(!values.email) {
          errors.email = 'Required';
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
          errors.email = 'Invalid email address';
        }else if(!values.password){
            errors.password = 'Required!';
        }else if(values.password.length < 4){
            errors.password = 'password must be 4 or more';
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        
          // console.log(JSON.stringify(values, null, 2));
          axios.post('http://localhost:2000/register', {
          name:values.name,
          email:values.email,
          password:values.password
        })
        .then(function (response) {
         if(!response.data.fail){
          navigate("/login",{replace:true})
         }else{
           setEro(response.data.err_msg[0].msg)
           setErrClass('there-err');
           showErr()
         }
          
          
        })
        .catch(function (error) {
          console.log(error);
        });
          setSubmitting(false);
          
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        /* and other goodies */
      }) => (
        <form onSubmit={handleSubmit}>
          <input type='text' 
          placeholder="Full Name"
          name="name"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.name}/>
          <div className="err_msg">
          {errors.name && touched.name && errors.name}
          </div>
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.email}
          />
          <div className="err_msg">
          {errors.email && touched.email && errors.email}
          </div>
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.password}
          />
          <div className="err_msg">
          {errors.password && touched.password && errors.password}
          </div>
          <button type="submit" disabled={isSubmitting}>
          Register <FaTelegramPlane/>
          </button>
 
        </form>
      )}
    </Formik>
              </div>
            </div>
        </div>
    )
}

export default Login