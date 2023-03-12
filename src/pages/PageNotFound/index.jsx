import React from "react";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";

export function PageNotFound() {

    let history = useHistory()

    function handleClick() {
        history.push("/");
      }

    return (
        <div className="container vh-100 d-flex justify-content-center align-items-center">
            <div className='d-flex flex-column'>
                <h1 className='text-white'>404 - Página não encontrada</h1>
                <Button onClick={handleClick}>Ir para tela inicial</Button>
            </div>
        </div>
    );
}
