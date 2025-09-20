import { render, screen, fireEvent } from "@testing-library/react";
import FormCar from "../FormCar";
import type { FormCarData } from "../../../../app/domain/FormCarData";

const initialValues: FormCarData = {
  nombre: "",
  apellido: "",
  direccion: "",
  celular: "",
  distrito: "",
  referencia: "",
};

const distritos = ["Lima", "Miraflores", "San Isidro"];

describe("FormCar Component", () => {
  it("renderiza todos los campos del formulario", () => {
    render(
      <FormCar
        values={initialValues}
        onSubmit={jest.fn()}
        onChange={jest.fn()}
        errors={{}}
        distritos={distritos}
      />
    );

    expect(screen.getByLabelText(/Nombres/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Apellido/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Dirección/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Celular/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Distrito/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Referencia/i)).toBeInTheDocument();
  });

  it("muestra mensajes de error si existen", () => {
    const errors = {
      nombre: "El nombre es requerido",
      apellido: "El apellido es requerido",
      direccion: "La dirección es requerida",
      celular: "El celular es requerido",
      distrito: "El distrito es requerido",
    };

    render(
      <FormCar
        values={initialValues}
        onSubmit={jest.fn()}
        onChange={jest.fn()}
        errors={errors}
        distritos={distritos}
      />
    );

    expect(screen.getByText(/El nombre es requerido/i)).toBeInTheDocument();
    expect(screen.getByText(/El apellido es requerido/i)).toBeInTheDocument();
    expect(screen.getByText(/La dirección es requerida/i)).toBeInTheDocument();
    expect(screen.getByText(/El celular es requerido/i)).toBeInTheDocument();
    expect(screen.getByText(/El distrito es requerido/i)).toBeInTheDocument();
  });

  it("llama a onChange al escribir en un input", () => {
    const handleChange = jest.fn();

    render(
      <FormCar
        values={initialValues}
        onSubmit={jest.fn()}
        onChange={handleChange}
        errors={{}}
        distritos={distritos}
      />
    );

    const nombreInput = screen.getByLabelText(/Nombres/i);
    fireEvent.change(nombreInput, { target: { value: "Juan" } });

    expect(handleChange).toHaveBeenCalled();
  });

  it("llama a onSubmit al enviar el formulario", () => {
    const handleSubmit = jest.fn((e) => e.preventDefault());

    render(
      <FormCar
        values={initialValues}
        onSubmit={handleSubmit}
        onChange={jest.fn()}
        errors={{}}
        distritos={distritos}
      />
    );

    const form = screen.getByTestId("form");
    fireEvent.submit(form);

    expect(handleSubmit).toHaveBeenCalled();
  });

  it("renderiza las opciones de distritos correctamente", () => {
    render(
      <FormCar
        values={initialValues}
        onSubmit={jest.fn()}
        onChange={jest.fn()}
        errors={{}}
        distritos={distritos}
      />
    );

    distritos.forEach((distrito) => {
      expect(screen.getByRole("option", { name: distrito })).toBeInTheDocument();
    });
  });

  it("no muestra mensajes de error cuando errors está vacío", () => {
    render(
      <FormCar
        values={initialValues}
        onSubmit={jest.fn()}
        onChange={jest.fn()}
        errors={{}} // sin errores
        distritos={distritos}
      />
    );

    expect(screen.queryByText(/El nombre es requerido/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/El apellido es requerido/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/La dirección es requerida/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/El celular es requerido/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/El distrito es requerido/i)).not.toBeInTheDocument();
  });
});
