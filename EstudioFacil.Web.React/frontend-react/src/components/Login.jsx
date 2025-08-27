import { useNavigate } from "react-router-dom";

function Login() {

    const navigate = useNavigate();

    function onOpenStudioList() {
        navigate("/cards");
    };

    return (
        <div className="w-screen h-screen bg-slate-400 flex items-center justify-end gap-20">
            <div className="flex-container items-start w-5/12 mb-32">
                <p className="p-2 h-8 flex items-center font-mono font-bold text-2xl">Boas-vindas</p>
                <p className="p-2 mb-2 h-8 flex items-center font-mono font-bold text-2xl">ao</p>
                <p className="p-2 h-8 flex items-center font-bold text-6xl">Estúdio Fácil</p>
            </div>
            <div className="h-screen w-2/6 bg-white flex items-center justify-center gap-20">
                <div className="flex-container items-center justify-center">
                    <div className="flex">
                        <p className="p-2 mb-16 h-8 flex items-center font-mono font-bold text-3xl">Faça o login</p>
                    </div>
                    <div className="flex">
                        <p className="p-2 h-8 flex items-center font-mono font-bold text-xl">Endereço de email</p>
                    </div>
                    <div className="flex mb-4">
                        <input
                            className="w-full h-8 p-2 rounded-full border border-gray-400"
                            type="text" />
                    </div>
                    <div className="flex">
                        <p className="p-2 h-8 flex items-center font-mono font-bold text-xl">Senha</p>
                    </div>
                    <div className="flex">
                        <input
                            className="w-full h-8 p-2 rounded-full border border-gray-400"
                            type="text" />
                    </div>
                    <div className="flex mb-4 mt-4">
                        <a className="hover:underline" href="http://localhost:5173/cards">Esqueceu sua senha?</a>
                    </div>
                    <div className="flex mb-6">
                        <button
                            className="w-full bg-slate-500 flex justify-center p-3 rounded-full hover:bg-slate-800 text-2xl font-mono font-bold text-white"
                            onClick={() => onOpenStudioList()}>
                            Entrar
                        </button>
                    </div>
                    <div className="flex bg-slate-900 w-96 h-1 mb-8"></div>
                    <div className="flex">
                        <a className="hover:underline" href="http://localhost:5173/studio">Não tem uma conta?</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;