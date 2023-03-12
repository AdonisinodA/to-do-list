import React, { useState, useContext } from "react";
import "./Login.css";
import { Form, Button } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import api from "../../service/api";
import { ToastContainer, toast, Slide } from "react-toastify";
import { UserContext } from "../../context/UserContext";

export function Login() {
  const { setUser } = useContext(UserContext);
  const [formLogin, setFormLogin] = useState({
    email: "",
    senha: "",
    checkbox: false,
  });
  const [isFetching, setIsFetching] = useState(false);
  const history = useHistory();

  function handlerForm(e) {
    setFormLogin({ ...formLogin, [e.name]: e.value });
  }

  async function authLogin(e) {
    e.preventDefault();

    setIsFetching(true);
    try {
      if (
        !formLogin.email === "email@teste.com" &&
        formLogin.senha === "1234"
      ) {
        // await toast.promise(
        //   api.post("api/auth", formLogin).then(async (res) => {
        //     setUser(res.data);
        //     if (formLogin.checkbox) {
        //       localStorage.setItem("User", JSON.stringify(res.data));
        //     }
        //     history.push("/dashboard");
        //   }),
        //   {
        //     transition: Slide,
        //     pending: {
        //       render: "Verificando...",
        //       theme: "colored",
        //       position: "bottom-right",
        //     },
        //     success: {
        //       render: `Seja bem vindo`,
        //       theme: "colored",
        //       position: "bottom-right",
        //     },
        //     error: {
        //       render: "Usuário/senha inválido",
        //       theme: "colored",
        //       position: "bottom-right",
        //     },
        //   }
        // );
      } else {
        toast.promise(
          new Promise((resolve, reject) => {
            setTimeout(() => {
              if (!formLogin.email && !formLogin.senha) reject("campos vazios");
              // if (formLogin.checkbox) {
              //   localStorage.setItem("User", JSON.stringify(res.data));
              // }

              history.push("/dashboard");

              resolve("suceso");
            }, 1000);
          }),
          {
            transition: Slide,
            pending: {
              render: "Verificando...",
              theme: "colored",
              position: "bottom-right",
            },
            success: {
              render: `Seja bem vindo`,
              theme: "colored",
              position: "bottom-right",
            },
            error: {
              render: "Usuário/senha inválido",
              theme: "colored",
              position: "bottom-right",
            },
          }
        );
      }
    } catch (error) {
      console.log(error);
    }
    setIsFetching(false);
  }

  return (
    <div className='container vh-100 d-flex'>
      <div className='vw-25 m-auto'>
        <h1 className='text-white text-center'> To Do List </h1>
        <Form onSubmit={(e) => authLogin(e)}>
          <Form.Group className='mb-3'>
            <Form.Control
              type='email'
              name='email'
              autoComplete='email'
              value={formLogin.email}
              placeholder='E-mail'
              className='mt-2 mb-2'
              onChange={(e) => handlerForm(e.target)}
              required
              disabled={isFetching}
            />
            <Form.Control
              type='password'
              name='senha'
              autoComplete='password'
              value={formLogin.senha}
              placeholder='Senha'
              className='mb-2'
              onChange={(e) => handlerForm(e.target)}
              required
              disabled={isFetching}
            />
            <Form.Check
              type='checkbox'
              name='checkbox'
              label='Continuar conectado'
              value={formLogin.checkbox}
              className='mb-2 text-white'
              onChange={(e) => handlerForm(e.target)}
              disabled={isFetching}
            />
          </Form.Group>
          <Form.Group className='d-flex justify-content-center'>
            <Button
              variant='light'
              type='submit'
              className='v-100'
              disabled={isFetching}
            >
              Acessar
            </Button>
          </Form.Group>
          <p className='mt-2 text-white'>
            Não possui cadastro?<Link to='/register'> Clique aqui.</Link>{" "}
          </p>
        </Form>
      </div>
      {/* TOAST */}
      <ToastContainer />
    </div>
  );
}
