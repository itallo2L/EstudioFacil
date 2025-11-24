import { X, Pencil, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function ModalUserSettings({ isOpen, closeModal }) {
    if (!isOpen) return null;

    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || {});
    const [userName, setUserName] = useState(user.nomeDoResponsavel || "");
    const [userPhone, setUserPhone] = useState(user.telefone || "");
    const [userCpf, setUserCpf] = useState(user.cpf || "");
    const [userEmail, setUserEmail] = useState(user.enderecoDeEmail || "");
    const [userPassword, setUserPassword] = useState(user.hashDaSenha || "");
    const [isEdition, setIsEdition] = useState(false);
    const navigate = useNavigate();

    const toggleEdition = () => setIsEdition(!isEdition);

    async function onSaveClick() {
        const usuarioAtualizado = {
            ...user,
            nomeDoResponsavel: userName,
            telefone: userPhone,
            cpf: userCpf,
            enderecoDeEmail: userEmail,
            hashDaSenha: userPassword,
        };

        try {
            await fetch("https://localhost:7144/api/Usuarios/atualizar-usuario", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(usuarioAtualizado),
            });
            localStorage.setItem("user", JSON.stringify(usuarioAtualizado));
            closeModal();
        } catch (erro) {
            alert("Erro na requisição: " + erro.message);
            console.error("Erro na requisição:", erro);
        }
    };

    function onLogOutClick() {
        localStorage.removeItem("user");
        navigate("/");
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl w-[380px] p-6 relative flex flex-col items-center">
                {/* Botão X */}
                <button
                    onClick={closeModal}
                    className="absolute top-4 left-4 border border-[#6142FC] bg-[#6142FC] text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-[#7357ff] transition"
                >
                    <X size={18} />
                </button>

                {/* Botão lápis */}
                <button
                    onClick={toggleEdition}
                    className="absolute top-4 right-4 bg-[#6142FC] text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-[#7357ff] transition"
                >
                    {isEdition ? <LogOut size={20} /> : <Pencil size={20} />}
                </button>

                {/* Título */}
                <h2 className="text-2xl font-bold font-serif mb-4 border-b border-black w-full text-center pb-2">
                    Configurações
                </h2>

                {/* Campos */}
                <div className="flex flex-col w-full space-y-3">
                    <label className="text-sm font-bold">Nome</label>
                    <input
                        disabled="true"
                        className="border border-black rounded-full px-3 py-1.5 focus:outline-none disabled:opacity-70"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                    />

                    <label className="text-sm font-bold">CPF</label>
                    <input
                        disabled="true"
                        className="border border-black rounded-full px-3 py-1.5 focus:outline-none disabled:opacity-70 font-mono"
                        value={userCpf}
                        onChange={(e) => setUserCpf(e.target.value)}
                    />

                    <label className="text-sm font-bold">Número de Telefone</label>
                    <input  
                        disabled={!isEdition}
                        className="border border-black rounded-full px-3 py-1.5 focus:outline-none disabled:opacity-70 font-mono"
                        value={userPhone}
                        onChange={(e) => setUserPhone(e.target.value)}
                    />

                    <label className="text-sm font-semibold">Endereço de email</label>
                    <input
                        disabled={!isEdition}
                        className="border border-black rounded-full px-3 py-1.5 focus:outline-none disabled:opacity-70"
                        value={userEmail}
                        onChange={(e) => setUserEmail(e.target.value)}
                    />

                    <label className="text-sm font-semibold">Senha</label>
                    <input
                        disabled={!isEdition}
                        type="password"
                        className="border border-black rounded-full px-3 py-1.5 focus:outline-none disabled:opacity-70"
                        value={userPassword}
                        onChange={(e) => setUserPassword(e.target.value)}
                    />
                </div>

                {/* Botão principal */}
                <button
                    onClick={isEdition ? onSaveClick : onLogOutClick}
                    className="mt-6 bg-[#6142FC] text-white font-semibold py-2 w-3/4 rounded-full hover:bg-[#7357ff] transition"
                >
                    {isEdition ? "Salvar" : "Sair"}
                </button>
            </div>
        </div>
    );
}

export default ModalUserSettings;
