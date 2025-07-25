"use client";
import useHook from "./useHook";

const LoginViaEmail = () => {
  const { handleSubmit, values, errors, touched, isSubmitting, setFieldValue } =
    useHook();
  return (
    <div className="flex flex-col gap-4">
      <input
        type="email"
        placeholder="Email"
        value={values.email}
        onChange={(e) => setFieldValue("email", e.target.value)}
      />
      {errors.email && touched.email ? (
        <p className="text-red-500 text-xs">{errors.email}</p>
      ) : (
        <p className="text-xs opacity-0">.</p>
      )}
      <button onClick={() => handleSubmit()} disabled={isSubmitting}>
        Submit
      </button>
    </div>
  );
};

export default LoginViaEmail;
