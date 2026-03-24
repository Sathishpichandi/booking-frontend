import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      if (isLogin) {
        const res = await axios.post(
          "http://localhost:8081/api/auth/login",
          {
            email: form.email,
            password: form.password
          }
        );

        const { token, name } = res.data;

        localStorage.setItem("token", token);
        localStorage.setItem("role", name);

        if (name === "ADMIN") navigate("/admin");
        else navigate("/user");

      } else {
        await axios.post(
          "http://localhost:8081/api/auth/register",
          form
        );

        setMessage("✅ Registration successful! Please login.");
        setIsLogin(true);
      }

    } catch (err) {
      setError("❌ Invalid credentials or something went wrong.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen
                    bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">

      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white/5 backdrop-blur-2xl border border-white/10
                   p-10 rounded-3xl w-[400px] shadow-2xl"
      >

        <h2 className="text-3xl font-bold mb-6 text-center">
          {isLogin ? "Welcome Back 👋" : "Create Account 🚀"}
        </h2>

        {/* MESSAGE AREA */}
        {message && (
          <div className="mb-4 p-3 rounded-lg bg-green-600/20 text-green-400 text-sm">
            {message}
          </div>
        )}

        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-600/20 text-red-400 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">

          {!isLogin && (
            <input
              name="name"
              placeholder="Full Name"
              onChange={handleChange}
              required
              className="w-full p-3 rounded-xl bg-slate-800 border border-white/20 focus:ring-2 focus:ring-purple-500 outline-none"
            />
          )}

          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            required
            className="w-full p-3 rounded-xl bg-slate-800 border border-white/20 focus:ring-2 focus:ring-purple-500 outline-none"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
            className="w-full p-3 rounded-xl bg-slate-800 border border-white/20 focus:ring-2 focus:ring-purple-500 outline-none"
          />

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600
                       hover:scale-105 transition duration-300 shadow-lg"
          >
            {isLogin ? "Login" : "Register"}
          </button>
        </form>

        <p className="text-center mt-6 text-slate-400">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="ml-2 text-purple-400 hover:underline"
          >
            {isLogin ? "Register" : "Login"}
          </button>
        </p>

      </motion.div>
    </div>
  );
}

export default AuthPage;