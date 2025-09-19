import React from "react";
import type { FormCarData } from "../../../app/domain/FormCarData";
import styles from "./FormCar.module.css";

interface FormCarProps {
  values: FormCarData;
  errors: { [key in keyof FormCarData]?: string };
  onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  distritos: string[];
}

const FormCar: React.FC<FormCarProps> = ({ values, errors, onChange, onSubmit, distritos }) => {
  return (
    <form className={styles.formContainer} onSubmit={onSubmit}>
      <h3>Formulario de envío</h3>

      <div className={styles.formGroup}>
        <label htmlFor="nombre">Nombres</label>
        <input
          type="text"
          id="nombre"
          name="nombre"
          value={values.nombre}
          onChange={onChange}
          placeholder="Tu nombre"
        />
        {errors.nombre && <span className={styles.errors}>{errors.nombre}</span>}
      </div>

      {/* Apellido */}
      <div className={styles.formGroup}>
        <label htmlFor="apellido">Apellido</label>
        <input
          type="text"
          id="apellido"
          name="apellido"
          value={values.apellido}
          onChange={onChange}
          placeholder="Tu apellido"
        />
        {errors.apellido && <span className={styles.errors}>{errors.apellido}</span>}
      </div>

      {/* Dirección */}
      <div className={styles.formGroup}>
        <label htmlFor="direccion">Dirección</label>
        <input
          type="text"
          id="direccion"
          name="direccion"
          value={values.direccion}
          onChange={onChange}
          placeholder="Tu dirección"
        />
        {errors.direccion && <span className={styles.errors}>{errors.direccion}</span>}
      </div>

      {/* Celular */}
      <div className={styles.formGroup}>
        <label htmlFor="celular">Celular</label>
        <input
          type="text"
          id="celular"
          name="celular"
          value={values.celular}
          onChange={onChange}
          placeholder="Número de celular"
        />
        {errors.celular && <span className={styles.errors}>{errors.celular}</span>}
      </div>

      {/* Distrito */}
      <div className={styles.formGroup}>
        <label htmlFor="distrito">Distrito</label>
        <select
          id="distrito"
          name="distrito"
          value={values.distrito}
          onChange={onChange}
        >
          <option value="">Selecciona un distrito</option>
          {distritos.map((d, idx) => (
            <option key={idx} value={d}>
              {d}
            </option>
          ))}
        </select>
        {errors.distrito && <span className={styles.errors}>{errors.distrito}</span>}
      </div>

      {/* Referencia (opcional) */}
      <div className={styles.formGroup}>
        <label htmlFor="referencia">Referencia (opcional)</label>
        <input
          type="text"
          id="referencia"
          name="referencia"
          value={values.referencia || ""}
          onChange={onChange}
          placeholder="Referencia de tu dirección"
        />
      </div>

      <button type="submit" className={styles.submitBtn}>
        Finalizar compra
      </button>
    </form>
  );
};

export default FormCar;