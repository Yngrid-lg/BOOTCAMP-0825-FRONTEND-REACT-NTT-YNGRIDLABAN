import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import RecoveryModal from "../RecoveryModal";

jest.useFakeTimers();

describe("RecoveryModal", () => {
  const onCloseMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("muestra error si el correo está vacío", async () => {
    render(<RecoveryModal isVisible={true} onClose={onCloseMock} />);

    fireEvent.click(screen.getByRole("button", { name: /enviar enlace/i }));

    const error = await screen.findByText(/el correo es obligatorio/i);
    expect(error).toBeInTheDocument();
  });


  test("muestra mensaje de éxito y cierra modal después del timeout", async () => {
    render(<RecoveryModal isVisible={true} onClose={onCloseMock} />);

    fireEvent.change(screen.getByLabelText(/correo electrónico/i), {
      target: { value: "usuario@correo.com" },
    });

    fireEvent.click(screen.getByRole("button", { name: /enviar enlace/i }));

    const success = await screen.findByText(/se envió un link de recuperación/i);
    expect(success).toBeInTheDocument();
    jest.advanceTimersByTime(3000);

    await waitFor(() => {
      expect(onCloseMock).toHaveBeenCalled();
    });
  });

  test("cierra modal con botón cancelar y limpia formulario", async () => {
    render(<RecoveryModal isVisible={true} onClose={onCloseMock} />);

    const input = screen.getByLabelText(/correo electrónico/i);
    fireEvent.change(input, { target: { value: "usuario@correo.com" } });

    fireEvent.click(screen.getByRole("button", { name: /cancelar/i }));

    await waitFor(() => {
      expect(onCloseMock).toHaveBeenCalled();
      expect(input).toHaveValue("");
    });
  });
});
