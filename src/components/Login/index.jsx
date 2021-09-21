import { useState } from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import Display from "../Display";
import "./style.css"

const Login = () => {
  const [isLoged, setIsLoged] = useState(false)
  const [allowed, setAllowed] = useState(false)

  const formSchema = yup.object().shape({
    username: yup.string().required("Username obrigatório"),
    password: yup.string().required("Senha obrigatório"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formSchema),
  });

  const onSubmitFunction = (formData) => {
    axios
      .post("https://kenzieshop.herokuapp.com/sessions/", formData)
      .then((response) => {
        if (response) {
          setIsLoged(true);
          setAllowed(true)
        }
      })
      .catch((err) => {
          setIsLoged(false)
          setAllowed(true)
      });
  };

  return (
    <div>
      <form className="formLogin" onSubmit={handleSubmit(onSubmitFunction)}>
        <input placeholder="*Username" {...register("username")} />
        <p>{errors.username?.message}</p>
        <input placeholder="*Senha" type="password" {...register("password")} />
        <p>{errors.password?.message}</p>
        <button className="btnLogin" type="submit">Login</button>
      </form>
       {allowed && <Display isLoged={isLoged} setIsLoged={setIsLoged}/>}
    </div>
  );
};

export default Login;
