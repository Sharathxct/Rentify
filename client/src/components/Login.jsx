import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Input,
    Checkbox,
    Button,
    useSelect,
  } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'
import { useSelector, useDispatch } from "react-redux";
import { login } from "../redux/features/auth/userSlice";
   
export function LoginCard() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

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
        if(res.data.user) {
          dispatch(login(res.data.user));
          navigate("/");
        }
      } catch (error) {
        console.log(error);
      }
    }

    if (token) {
      checkToken();
    }
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    console.log(email, password);
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/login",
        {
          email,
          password,
        }
      );
      localStorage.setItem("token", response.data.token);
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${localStorage.getItem("token")}`;
      dispatch(login(response.data.user));
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Card className="w-96">
      <CardHeader
        variant="gradient"
        color="gray"
        className="mb-4 grid h-28 place-items-center"
      >
        <Typography variant="h3" color="white">
          Rentify
        </Typography>
      </CardHeader>
      <CardBody className="flex flex-col gap-4">
        <Input
          label="Email"
          size="lg"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <Input
          label="Password"
          type="password"
          size="lg"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <div className="-ml-2.5">
          <Checkbox label="Remember Me" />
        </div>
      </CardBody>
      <CardFooter className="pt-0">
        <Button
          variant="gradient"
          fullWidth
          onClick={(e) => handleSubmit(e)}
          disabled={loading}
        >
          Sign In
        </Button>
        <Typography variant="small" className="mt-6 flex justify-center">
          Don't have an account?
          <Link to="/signup">
            <Typography
              as="a"
              variant="small"
              color="blue-gray"
              className="ml-1 font-bold"
            >
              Sign up
            </Typography>
          </Link>
        </Typography>
      </CardFooter>
    </Card>
  );
}
