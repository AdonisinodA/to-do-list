import React from "react";

export function Status() {
  return (
    <>
      <option value='0'>Não iniciado</option>
      <option value='1'>Em andamento</option>
      <option value='2'>Finalizado</option>
    </>
  );
}
export function Prioridades() {
  return (
    <>
      <option value='0'></option>
      <option value='1'>Tranquilo</option>
      <option value='2'>Moderado</option>
      <option value='3'>Urgente</option>
    </>
  );
}
