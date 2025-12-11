import { useNavigate } from "react-router-dom";

function ResetPassword() {

    const navigate = useNavigate();

    function onSaveNewPassword() {
        navigate("/");
    };

    return (
        <div className="w-screen h-screen bg-white flex items-center justify-center gap-20">
            <div className="flex-container items-center justify-center mb-52">
                <div className="flex justify-center">
                    <p className="p-2 mb-6 h-8 flex items-center font-mono font-bold text-3xl">Redefinir Senha</p>
                </div>
                <div className="flex bg-slate-900 w-96 h-[1px] mb-16"></div>
                <div className="flex">
                    <p className="p-2 mb-2 h-8 flex items-center font-mono font-bold text-xl">Nova senha</p>
                </div>
                <div className="flex mb-6">
                    <input
                        className="w-full p-2 rounded-full border border-gray-400"
                        type="password" />
                </div>
                <div className="flex">
                    <p className="p-2 mb-2 h-8 flex items-center font-mono font-bold text-xl">Confirme a nova senha</p>
                </div>
                <div className="flex mb-6">
                    <input
                        className="w-full p-2 rounded-full border border-gray-400"
                        type="password" />
                </div>
                <div className="flex">
                    <button
                        className="w-full bg-slate-500 flex justify-center p-3 rounded-full hover:bg-slate-800 text-2xl font-mono font-bold text-white"
                        onClick={() => onSaveNewPassword()}
                    >
                        Salvar
                    </button>
                </div>
            </div>
        </div >
    );
};

export default ResetPassword;