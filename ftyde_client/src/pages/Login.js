import react,{useState} from 'react';
import { Formik } from 'formik';
import axios from 'axios'
import {Link,useNavigate} from "react-router-dom";
import {FaGoogle} from "react-icons/fa"
import {FaFacebook} from "react-icons/fa"
import {FaTelegramPlane} from "react-icons/fa"

function Login(){
    const [error,setError] = useState('');
    const [errClass,setErrClass] = useState("no-err");
    let navigate = useNavigate();

    function showErr(){
      setTimeout(() => {
        setErrClass('no-err')
      }, 2000);
    }

    const socialLogF = (event)=>{
      event.preventDefault();
      axios.get('http://localhost:2000/auth/user/facebook')
      .then((res)=>{
        console.log(res)
      })
      .catch((err)=>{
        console.log(err)
      })
    }
    return(
        <div className="login">
            <div className="form-wraper">
                <div className="social-login">
                <a onClick={(e)=> socialLogF(e)} href=""><FaGoogle/>login with google</a>
                <a href=""><FaFacebook/>login with facebook</a>
                </div>
                <div className={errClass}>{error}</div>
                {/* handle form data with formik */}
                {/* <form>
                    <input type="email" placeholder="Email"/>
                    <input type="password" placeholder="Password"/>
                    <button type="submit">Login <FaTelegramPlane/> </button>
                    <p>don't have an account? <br/> <Link to="/register">Create</Link> now!</p>
                </form> */}

                <Formik
      initialValues={{ email: '', password: '' }}
      validate={values => {
        const errors = {};
        if (!values.email) {
          errors.email = 'Required!';
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
        
        //   alert(JSON.stringify(values, null, 2));
        console.log(JSON.stringify(values, null, 2));
        axios.defaults.withCredentials = true;
        axios.post('http://localhost:2000/login', {
          email:values.email,
          password:values.password
        })
        .then(function (response) {
          if(response.data.failLogin === false){
            let previousRoute = localStorage.getItem('intendedRoute');
            // console.log(previousRoute)
            // window.location.reload()
            navigate(previousRoute);
          }
        })
        .catch(function (error) {
          if(error.response.data == 'Unauthorized' || error.response.status == 401){
            setError('Incorrect Password or Email');
          }else{
            setError('Error has occoured please try again');
          }
          setErrClass('there-err');
          showErr()
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
          Login <FaTelegramPlane/>
          </button>
          <p>don't have an account? <br/> <Link to="/register">Create</Link> now!</p>
 
        </form>
      )}
    </Formik>
                {/* handle form data with formik */}

            </div>
        </div>
    )
}

export default Login