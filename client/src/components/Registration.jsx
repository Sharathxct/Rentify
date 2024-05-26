import {
    Card,
    Input,
    Checkbox,
    Button,
    Typography,
  } from "@material-tailwind/react";
  import { Link , useNavigate} from "react-router-dom";
  import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { login } from "../redux/features/auth/userSlice";


  import axios from 'axios'
  

  export function Registration() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [image, setImage] = useState(null);
    const fileInputRef = useRef(null);
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const navigate = useNavigate();


    useEffect(() => {
      const token = localStorage.getItem("token");
  
      if(user.user) {
          navigate("/");
      }
  
      async function checkToken() {
        try {
          const res = await axios.get("http://localhost:3000/api/auth/",{
              headers: {
                Authorization: `Bearer ${token}`,
              },
          } );
  
          dispatch(login(res.data.user));
          navigate("/");
        } catch (error) {
          console.log(error);
        }
      }
  
      if (token) {
        checkToken();
      }
    }, []);

    async function handleSubmit(e){
      e.preventDefault();
      // Form submission logic here
      const formData = new FormData();
      formData.append('firstName', firstName);
      formData.append('lastName', lastName);
      formData.append('email', email);
      formData.append('phoneNumber', phoneNumber);
      formData.append('password', password);
      formData.append('file', image);

      try {
        const res = await axios.post('http://localhost:3000/api/auth/register', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        localStorage.setItem("token", res.data.token);
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${localStorage.getItem("token")}`;
        dispatch(login(res.data.user));
        navigate("/");
      } catch (err) {
        console.error(err);
      }
    }

    const handleFileUpload = () => {
      fileInputRef.current.click();
    };

    const handleFileChange = (e) => {
      setImage(e.target.files[0]);
    };
    return (
       <Card color="transparent" shadow={false} className="bg-white p-5">
        <Typography variant="h4" color="blue-gray">
          Sign Up
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          Nice to meet you! Enter your details to register.
        </Typography>
        <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              First Name
            </Typography>
            <Input
              size="lg"
              placeholder="John"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              value={firstName}
              onChange={ (e)=>setFirstName(e.target.value) }
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Second Name
            </Typography>
            <Input
              size="lg"
              placeholder="Doe"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              value={lastName}
              onChange={ (e)=>setLastName(e.target.value) }
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Your Email
            </Typography>
            <Input
              size="lg"
              placeholder="name@mail.com"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Your Phone Number
            </Typography>
            <Input
              size="lg"
              placeholder="9999999999"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              value={phoneNumber}
              onChange={(e)=>setPhoneNumber(e.target.value)}
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Password
            </Typography>
            <Input
              type="password"
              size="lg"
              placeholder="********"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Upload Profile Picture
            </Typography>
          <Button className="mt-6" fullWidth onClick={handleFileUpload} >
            Upload 
          </Button>
          <input
            type="file"
            accept="image/*"
            multiple
            ref={fileInputRef}
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />
          {image && (
            <div className="h-10 mb-5">
              <Typography variant="h6" color="blue-gray" className="">
                Preview
              </Typography>
              <img src={URL.createObjectURL(image)} className="h-full" alt="Preview" />
            </div>
          )}
            
          </div>
          <Checkbox
            label={
              <Typography
                variant="small"
                color="gray"
                className="flex items-center font-normal"
              >
                I agree the
                <a
                  href="#"
                  className="font-medium transition-colors hover:text-gray-900"
                >
                  &nbsp;Terms and Conditions
                </a>
              </Typography>
            }
            containerProps={{ className: "-ml-2.5" }}
          />
          <Button className="mt-6" fullWidth onClick={(e)=>handleSubmit(e)}>
            sign up
          </Button>
         
            <Typography color="gray" className="mt-4 text-center font-normal">
              Already have an account?{" "}
              <Link to='/signin' className="font-medium text-gray-900">
                Sign In
              </Link>
            </Typography>
       
          
        </form>
      </Card>
    );
  }