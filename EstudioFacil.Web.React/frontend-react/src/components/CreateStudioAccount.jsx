import { useNavigate } from "react-router-dom";

function CreateStudioAccount() {
    const navigate = useNavigate();

    function onProceed() {
        navigate("/");
    };

    return (
        <div className="w-screen h-screen bg-white flex items-center justify-center gap-20">
            <div className="flex-container items-center justify-center mb-2">
                <div className="flex justify-center">
                    <p className="p-2 mb-6 h-8 flex items-center font-mono font-bold text-3xl">Criar Conta - Estúdio</p>
                </div>
                <div className="flex bg-slate-900 w-96 h-[1px] mb-2"></div>
                <div className="flex">
                    <p className="p-2 h-8 flex items-center font-mono font-bold text-xl">Nome Fantasia</p>
                </div>
                <div className="flex mb-2">
                    <input
                        className="w-full p-2 rounded-full border border-gray-400"
                        type="text" />
                </div>
                <div className="flex">
                    <p className="p-2 h-8 flex items-center font-mono font-bold text-xl">Razão Social</p>
                </div>
                <div className="flex mb-2">
                    <input
                        className="w-full p-2 rounded-full border border-gray-400"
                        type="text" />
                </div>
                <div className="flex">
                    <p className="p-2 h-8 flex items-center font-mono font-bold text-xl">Endereço</p>
                </div>
                <div className="flex mb-2">
                    <input
                        className="w-full p-2 rounded-full border border-gray-400"
                        type="text" />
                </div>
                <div className="flex">
                    <p className="p-2 h-8 flex items-center font-mono font-bold text-xl">Número de Telefone</p>
                </div>
                <div className="flex mb-2">
                    <input
                        className="w-full p-2 rounded-full border border-gray-400"
                        type="text" />
                </div>
                <div className="flex">
                    <p className="p-2 h-8 flex items-center font-mono font-bold text-xl">CNPJ</p>
                </div>
                <div className="flex mb-2">
                    <input
                        className="w-full p-2 rounded-full border border-gray-400"
                        type="text" />
                </div>
                <div className="flex">
                    <p className="p-2 h-8 flex items-center font-mono font-bold text-xl">Endereço de email</p>
                </div>
                <div className="flex mb-2">
                    <input
                        className="w-full p-2 rounded-full border border-gray-400"
                        type="text" />
                </div>
                <div className="flex">
                    <p className="p-2 h-8 flex items-center font-mono font-bold text-xl">Senha</p>
                </div>
                <div className="flex mb-2">
                    <input
                        className="w-full p-2 rounded-full border border-gray-400"
                        type="password" />
                </div>
                <div className="flex">
                    <button
                        className="w-full bg-slate-500 flex justify-center p-3 rounded-full hover:bg-slate-800 text-2xl font-mono font-bold text-white"
                        onClick={() => onProceed()}
                    >
                        Prosseguir
                    </button>
                </div>
            </div>
        </div >
    );
};

export default CreateStudioAccount;