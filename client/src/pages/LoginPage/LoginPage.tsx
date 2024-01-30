function LoginPage() {
  return (
    <div className="h-screen flex flex-col justify-center">
      <h2 className="text-center mb-10 text-3xl">Login</h2>
      <form className="flex flex-col w-1/2 mx-auto space-y-6">
        <input
          name="name"
          className="py-2 px-4 border-solid border-[1px] rounded-sm border-baseGrey"
          placeholder="username"
        />
        <input
          type="password"
          className="py-2 px-4 border-solid border-[1px] rounded-sm border-baseGrey"
          placeholder="password"
        />
        <button className="bg-baseBlue text-baseWhite py-1 rounded-sm hover:bg-baseBlueLight">
          Button
        </button>
      </form>
    </div>
  );
}

export default LoginPage;
