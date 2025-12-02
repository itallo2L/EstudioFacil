import { X, Pencil, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function ModalUserSettings({ isOpen, closeModal, isMusicianUSer }) {
    if (!isOpen) return null;

    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || {});
    const [userName, setUserName] = useState(user.nomeDoResponsavel || "");
    const [userRazaoSocial, setUserRazaoSocial] = useState(user.razaoSocial || "");
    const [userNomeFantasia, setUserNomeFantasia] = useState(user.nomeFantasia || "");
    const [userPhone, setUserPhone] = useState(user.telefone || "");
    const [userCpf, setUserCpf] = useState(user.cpf || "");
    const [userCnpj, setUserCnpj] = useState(user.cnpj || "");
    const [userEmail, setUserEmail] = useState(user.enderecoDeEmail || "");
    const [userEndereco, setUserEndereco] = useState(user.endereco || "");
    const [userPassword, setUserPassword] = useState(user.hashDaSenha || "");
    const [isEdition, setIsEdition] = useState(false);
    const navigate = useNavigate();

    const toggleEdition = () => setIsEdition(!isEdition);

    async function onSaveClick() {
        const usuarioAtualizado = {
            ...user,
            nomeDoResponsavel: userName,
            nomeFantasia: userNomeFantasia,
            razaoSocial: userRazaoSocial,
            telefone: userPhone,
            cpf: userCpf,
            cnpj: userCnpj,
            enderecoDeEmail: userEmail,
            endereco: userEndereco,
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

    if (isMusicianUSer)
        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-2xl w-[380px] p-6 relative flex flex-col items-center">
                    {/* Botão X */}
                    <button
                        onClick={closeModal}
                        className="absolute top-4 right-4 border border-[#6142FC] bg-[#6142FC] text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-[#7357ff] transition"
                    >
                        <X size={18} />
                    </button>

                    {/* Botão lápis */}
                    <button
                        onClick={toggleEdition}
                        className="absolute top-4 left-4 bg-[#6142FC] text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-[#7357ff] transition"
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

                        {/* <label className="text-sm font-semibold">Senha</label>
                        <input
                            disabled={!isEdition}
                            type="password"
                            className="border border-black rounded-full px-3 py-1.5 focus:outline-none disabled:opacity-70"
                            value={userPassword}
                            onChange={(e) => setUserPassword(e.target.value)}
                        /> */}
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

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl w-[760px] p-6 relative flex flex-col items-center">
                {/* Botão X */}
                <button
                    onClick={closeModal}
                    className="absolute top-4 right-4 border border-[#6142FC] bg-[#6142FC] text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-[#7357ff] transition"
                >
                    <X size={18} />
                </button>

                {/* Botão lápis */}
                <button
                    onClick={toggleEdition}
                    className="absolute top-4 left-4 bg-[#6142FC] text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-[#7357ff] transition"
                >
                    {isEdition ? <LogOut size={20} /> : <Pencil size={20} />}
                </button>

                {/* Título */}
                <h2 className="text-2xl font-bold font-serif mb-4 border-b border-black w-full text-center pb-2">
                    Configurações
                </h2>

                {/* Container para campos lado a lado */}
                <div className="flex gap-6 w-full mb-6">
                    {/* Campos Esquerda */}
                    <div className="flex flex-col w-1/2 space-y-3">
                        <label className="text-sm font-bold">Nome</label>
                        <input
                            disabled="true"
                            className="border border-black rounded-full px-3 py-1.5 focus:outline-none disabled:opacity-70"
                            value={userRazaoSocial}
                            onChange={(e) => setUserRazaoSocial(e.target.value)}
                        />

                        <label className="text-sm font-bold">CNPJ</label>
                        <input
                            disabled="true"
                            className="border border-black rounded-full px-3 py-1.5 focus:outline-none disabled:opacity-70 font-mono"
                            value={userCnpj}
                            onChange={(e) => setUserCnpj(e.target.value)}
                        />

                        <label className="text-sm font-bold">Nome Fantasia</label>
                        <input
                            disabled="true"
                            className="border border-black rounded-full px-3 py-1.5 focus:outline-none disabled:opacity-70 font-mono"
                            value={userNomeFantasia}
                            onChange={(e) => setUserNomeFantasia(e.target.value)}
                        />
                    </div>

                    {/* Campos Direita */}
                    <div className="flex flex-col w-1/2 space-y-3">
                        <label className="text-sm font-bold">Número de Telefone</label>
                        <input
                            disabled={!isEdition}
                            className="border border-black rounded-full px-3 py-1.5 focus:outline-none disabled:opacity-70 font-mono"
                            value={userPhone}
                            onChange={(e) => setUserPhone(e.target.value)}
                        />

                        <label className="text-sm font-semibold">Endereço</label>
                        <input
                            disabled={!isEdition}
                            className="border border-black rounded-full px-3 py-1.5 focus:outline-none disabled:opacity-70"
                            value={userEndereco}
                            onChange={(e) => setUserEndereco(e.target.value)}
                        />

                        <label className="text-sm font-semibold">Endereço de email</label>
                        <input
                            disabled={!isEdition}
                            className="border border-black rounded-full px-3 py-1.5 focus:outline-none disabled:opacity-70"
                            value={userEmail}
                            onChange={(e) => setUserEmail(e.target.value)}
                        />
                    </div>
                </div>

                {/* Descrição (abaixo dos campos) */}
                <div className="w-full mb-6">
                    <label className="text-sm font-semibold block mb-2">Descrição</label>
                    <p className="text-sm text-gray-600 leading-relaxed p-3 border border-gray-300 rounded-lg bg-gray-50">
                        No coração da cena musical, o Studio 54 oferece um ambiente profissional
                        e inspirador para artistas que buscam excelência. Com acústica premium e equipamentos
                        de última geração, proporcionamos a qualidade sonora que sua música merece.
                    </p>
                </div>

                {/* Botões lado a lado */}
                <div className="flex gap-3 w-full">
                    <button
                        onClick={isEdition ? onSaveClick : onLogOutClick}
                        className="flex-1 bg-[#6142FC] text-white font-semibold py-2 rounded-full hover:bg-[#7357ff] transition"
                    >
                        {isEdition ? "Salvar" : "Sair"}
                    </button>

                    <button
                        className="flex-1 bg-red-600 text-white font-semibold py-2 rounded-full hover:bg-red-700 transition"
                    >
                        Fechar Estúdio
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ModalUserSettings;
