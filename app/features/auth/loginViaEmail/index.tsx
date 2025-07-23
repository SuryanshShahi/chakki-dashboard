import React from "react";

const LoginViaEmail = () => {
  return (
    <div className="flex flex-col gap-4">
      <input type="email" placeholder="Email" />
      <input type="password" placeholder="Password" />
      <button>Login</button>
    </div>
  );
};

export default LoginViaEmail;
