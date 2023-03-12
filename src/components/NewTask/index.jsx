import React, { useState, useContext, useEffect } from "react";
import { Button, Modal, Form, FloatingLabel, Col, Row } from "react-bootstrap";
import { FaPlus, FaSave } from "react-icons/fa";
import { Status, Prioridades } from "../Selects";
import api from "../../service/api";
// import { ToastContainer, toast, Slide } from "react-toastify";
import { UserContext } from "../../context/UserContext";

export default function NewTask({ setTasks, value }) {
  const [modalShow, setModalShow] = useState(false);
  const [form, setForm] = useState({
    titulo: "",
    descricao: "",
    prioridade_tarefa: 0,
    status: 0,
    categoria: "",
    data_e_hora_tarefa: "0000-00-00T00:00",
  });
  const { toast, Slide } = value;
  const { user } = useContext(UserContext);

  useEffect(() => {
    console.log(form);
  }, [form]);

  const [isFetching, setIsFetching] = useState(false);

  function handlerForm(e) {
    setForm({ ...form, [e.name]: e.value });
  }
  async function handlerFormSubmit(e) {
    e.preventDefault();
    setIsFetching(true);

    try {
      await toast.promise(
        // api.post("api/createNewTask", {...form,"usuario_id":user.id}).then( async() => {
        //   await api.get(`api/getTasksUser/${user.id}`).then((res) => {
        //     setTasks(res.data);
        //     setModalShow(false);
        //     return true
        //   });
        //   return true
        // })
        new Promise((resolve, reject) => {
          if (!form || Object.keys(form).length === 0) reject("erro");
          setTimeout(() => {
            setTasks([form]);
            setModalShow(false);
            resolve("sucesso");
          }, 500);
        }),
        {
          transition: Slide,
          pending: {
            render: "Salvando...",
            theme: "colored",
            position: "bottom-right",
          },
          success: {
            render: `Tarefa salva!`,
            theme: "colored",
            position: "bottom-right",
          },
          error: {
            render: "Ocorreu um erro!",
            theme: "colored",
            position: "bottom-right",
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
    setIsFetching(false);
  }

  function showModal() {
    setForm({
      titulo: "",
      descricao: "",
      prioridade_tarefa: 0,
      status: 0,
      categoria: "",
      data_e_hora_tarefa: "0000-00-00T00:00",
    });
    setIsFetching(false);
    setModalShow(true);
  }
  return (
    <>
      <Button
        variant='success'
        className='d-flex align-items-center'
        onClick={showModal}
      >
        <FaPlus className='me-2' /> Nova Tarefa
      </Button>
      <ModalNewTask
        show={modalShow}
        formData={{ form, setForm }}
        handlerForm={handlerForm}
        handlerFormSubmit={handlerFormSubmit}
        isFetching={isFetching}
        onHide={() => setModalShow(false)}
      />
      {/* <ToastContainer/> */}
    </>
  );
}

function ModalNewTask({
  show,
  formData,
  handlerForm,
  handlerFormSubmit,
  isFetching,
  onHide,
}) {
  return (
    <Modal
      show={show}
      onHide={onHide}
      size='lg'
      centered
      className='rounded-3'
      backdrop='static'
    >
      <Modal.Header
        closeButton
        closeVariant='white'
        className='bg-dark text-white'
      >
        <Modal.Title>Nova tarefa</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={(e) => handlerFormSubmit(e)}>
          <Form.Group className='mb-3'>
            <Row className='g-2'>
              <Col md>
                <FloatingLabel label='Título'>
                  <Form.Control
                    type='text'
                    name='titulo'
                    autoComplete='titulo'
                    value={formData.form.titulo}
                    placeholder='Titulo'
                    className='mt-2 mb-2'
                    onChange={(e) => handlerForm(e.target)}
                    required
                    disabled={isFetching}
                  />
                </FloatingLabel>
              </Col>
              <Col md>
                <FloatingLabel label='Horário'>
                  <Form.Control
                    type='datetime-local'
                    name='data_e_hora_tarefa'
                    id='dataEHora'
                    value={formData.form.data_e_hora_tarefa}
                    className='mb-2 mt-2'
                    onChange={(e) => handlerForm(e.target)}
                    disabled={isFetching}
                  />
                </FloatingLabel>
              </Col>
            </Row>

            <FloatingLabel label='Descricao'>
              <Form.Control
                as='textarea'
                style={{ height: "100px" }}
                name='descricao'
                autoComplete='descricao'
                value={formData.form.descricao}
                placeholder='Descricao'
                className='mb-2'
                onChange={(e) => handlerForm(e.target)}
                required
                disabled={isFetching}
              />
            </FloatingLabel>
            <Row className='g-3'>
              <Col md>
                <FloatingLabel label='Categoria'>
                  <Form.Control
                    type='text'
                    name='categoria'
                    autoComplete='categoria'
                    value={formData.form.categoria}
                    placeholder='categoria'
                    className='mb-2 mt-2'
                    onChange={(e) => handlerForm(e.target)}
                    required
                    disabled={isFetching}
                  />
                </FloatingLabel>
              </Col>
              <Col md>
                <FloatingLabel label='Prioridade'>
                  <Form.Select
                    name='prioridade_tarefa'
                    value={formData.form.prioridade_tarefa}
                    onChange={(e) => handlerForm(e.target)}
                    className='mt-2 mb-2'
                    disabled={isFetching}
                  >
                    <Prioridades />
                  </Form.Select>
                </FloatingLabel>
              </Col>
              <Col md>
                <FloatingLabel label='Status'>
                  <Form.Select
                    name='status'
                    value={formData.form.status}
                    onChange={(e) => handlerForm(e.target)}
                    className='mt-2 mb-2'
                    disabled={isFetching}
                  >
                    <Status />
                  </Form.Select>
                </FloatingLabel>
              </Col>
            </Row>
          </Form.Group>
          <Form.Group className='d-flex justify-content-end'>
            <Button
              variant='outline-success'
              type='submit'
              className='d-flex align-items-center '
              disabled={isFetching}
            >
              <FaSave className='me-2' /> Salvar
            </Button>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer></Modal.Footer>
    </Modal>
  );
}
