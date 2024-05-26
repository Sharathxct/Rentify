import {
    Card,
    Input,
    Checkbox,
    Button,
    Typography,
  } from "@material-tailwind/react";
  import { Link } from "react-router-dom";
  import React, { useState, useRef } from 'react';
   
  export function Registration() {
    const [firstname, setFirstName] = useState('');
    const [secondname, setSecondName] = useState('');
    const [email, setEmail] = useState('');
    const [phNo, setPhNO] = useState('');
    const [password, setPassword] = useState('');
    const [imageFile, setImageFile] = useState(null);
    const fileInputRef = useRef(null);


    const handleFileUpload = () => {
      fileInputRef.current.click();
    };

    const handleFileChange = (e) => {
      setImageFile(e.target.files[0]);
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
          {imageFile && (
            <div className="h-10 mb-5">
              <Typography variant="h6" color="blue-gray" className="">
                Preview
              </Typography>
              <img src={URL.createObjectURL(imageFile)} className="h-full" alt="Preview" />
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
          <Button className="mt-6" fullWidth>
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