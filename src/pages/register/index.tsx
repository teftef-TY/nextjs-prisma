import { FC, FormEventHandler, useRef } from "react";

const Register: FC = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const form: HTMLFormElement | null = formRef.current;
    if (!form) {
      return;
    }
    const formData = new FormData(form);
    const sendData = {
      name: formData.get("name"),
      age: Number(formData.get("age")),
    };
    fetch("/api/user/create", {
      method: "POST",
      body: JSON.stringify(sendData),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };
  return (
    <div>
      <p>user Register page</p>
      <form ref={formRef} onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" name="name" />
        </label>
        <label>
          Age:
          <input type="number" name="age" />
        </label>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default Register;
