import React, { useContext } from "react";
import { Link } from "react-router-dom";
import sweetalert from "sweetalert2";
import { AuthContext } from "../context/AuthContext";
import { useForm } from "../hooks/useForm";

export const RegisterPage = () => {
  const { register } = useContext(AuthContext);

  const { form, onChange } = useForm({
    name: "",
    email: "",
    password: "",
  });

  const enableSubmit = () => {
    return (
      form.name.trim().length > 0 &&
      form.email.trim().length > 0 &&
      form.password.trim().length > 0
    );
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    const { name, email, password } = form;

    const ok = await register(name, email, password);

    if (!ok) {
      sweetalert.fire("Error", "Verifique los datos ingresados", "error");
    }
  };

  return (
    <form
      className="login100-form validate-form flex-sb flex-w"
      onSubmit={onSubmit}
    >
      <span className="login100-form-title mb-3">Chat - Registro</span>

      <div className="wrap-input100 validate-input mb-3">
        <input
          className="input100"
          type="text"
          name="name"
          placeholder="Nombre"
          value={form.name}
          onChange={onChange}
        />
        <span className="focus-input100"></span>
      </div>

      <div className="wrap-input100 validate-input mb-3">
        <input
          className="input100"
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={onChange}
        />
        <span className="focus-input100"></span>
      </div>

      <div className="wrap-input100 validate-input mb-3">
        <input
          className="input100"
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={onChange}
        />
        <span className="focus-input100"></span>
      </div>

      <div className="row mb-3">
        <div className="col text-right">
          <Link to="/auth/login" className="txt1">
            Ya tienes cuenta?
          </Link>
        </div>
      </div>

      <div className="container-login100-form-btn m-t-17">
        <button
          className="login100-form-btn"
          type="submit"
          disabled={!enableSubmit()}
        >
          Crear cuenta
        </button>
      </div>
    </form>
  );
};
