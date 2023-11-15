import { Link } from "react-router-dom";

const RegisterPage = () => {
  return (
    <div className="min-h-[350px] flex items-center justify-center p-12 font-roboto">
      <div className="w-1/3 h-[400px] rounded border-[2px] border-primary p-6 shadow-xl">
        <h1 className="text-xl mb-4">Daftar</h1>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Masukkan email Anda"
          className="text-sm border border-primary w-full h-10 px-4 rounded-sm mb-4"
        />
        <button className="w-full h-10 px-4 rounded-sm bg-primary text-white mb-4">
          Berikutnya
        </button>
        <h1 className="flex justify-center mb-4 text-gray-500">Atau</h1>
        <div className="flex justify-between mb-6 text-sm">
          <button className="w-[159px] h-10 border border-primary rounded-sm flex items-center justify-center">
            <i className="fa-brands fa-facebook text-xl text-blue-700 mr-2"></i>
            Facebook
          </button>
          <button className="w-[159px] h-10 border border-primary rounded-sm flex items-center justify-center">
            <i className="fa-brands fa-google text-xl mr-2 text-primary"></i>
            Google
          </button>
        </div>
        <p className="text-xs text-center mb-6">
          Dengan mendaftar, Anda setuju dengan{" "}
          <span className="text-primary">
            Syarat, Ketentuan dan Kebijakan dari TokoKita
          </span>
          &<span className="text-primary">Kebijakan Privasi</span>
        </p>
        <h1 className="text-sm text-gray-500 flex justify-center">
          Punya akun?
          <Link to="/login" className="text-primary font-medium ml-2">
            Log In
          </Link>
        </h1>
      </div>
    </div>
  );
};

export default RegisterPage;
