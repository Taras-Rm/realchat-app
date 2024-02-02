import { FormEvent, useState } from "react";
import { useLogin } from "../../hooks/useLogin";
import { useNavigate } from "react-router-dom";
import { routes } from "../routes";

function LoginPage() {
  const navigate = useNavigate();

  const { login, isLoading, error, getToken } = useLogin();
  const [loginFields, setLoginFields] = useState({ name: "", password: "" });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await login(loginFields.name, loginFields.password);

    if (getToken()) {
      navigate(routes.chatPage);
    }
  };

  return (
    <div className="h-screen flex flex-col justify-center">
      <h2 className="text-center mb-10 text-3xl">Login</h2>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-1/2 mx-auto space-y-6"
      >
        <input
          name="name"
          className="py-2 px-4 border-solid border-[1px] rounded-sm border-baseGrey"
          placeholder="username"
          value={loginFields["name"]}
          onChange={(e) =>
            setLoginFields({ ...loginFields, name: e.target.value })
          }
        />
        <input
          type="password"
          className="py-2 px-4 border-solid border-[1px] rounded-sm border-baseGrey"
          placeholder="password"
          value={loginFields["password"]}
          onChange={(e) =>
            setLoginFields({ ...loginFields, password: e.target.value })
          }
        />
        <button
          className="bg-baseBlue text-baseWhite py-1 rounded-sm hover:bg-baseBlueLight"
          disabled={isLoading}
        >
          Button
        </button>
        {error && <div className="text-baseRed">{error}</div>}
      </form>
    </div>
  );
}

export default LoginPage;
