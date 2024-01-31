import { FormEvent, useState } from "react";
import { useLogin } from "../../hooks/useLogin";

function LoginPage() {
  const [loginFields, setLoginFields] = useState({ name: "", password: "" });
  const { login, isLoading, error } = useLogin();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await login(loginFields.name, loginFields.password);
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
        {error && <div>{error}</div>}
      </form>
    </div>
  );
}

export default LoginPage;
