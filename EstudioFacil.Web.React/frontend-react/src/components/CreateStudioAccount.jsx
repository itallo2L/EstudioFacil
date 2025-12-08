import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreateStudioAccount() {

    const navigate = useNavigate();
    const [userTradeName, setUserTradeName] = useState("");
    const [userCompanyName, setUserCompanyName] = useState("");
    const [userAddress, setUserAddress] = useState("");
    const [userPhoneNumber, setUserPhoneNumber] = useState("");
    const [userCnpj, setUserCnpj] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");

    const enviarDados = async () => {
        const dadosParaAdicionar = {
            nomeFantasia: userTradeName,
            razaoSocial: userCompanyName,
            endereco: userAddress,
            telefone: userPhoneNumber,
            cNPJ: userCnpj,
            enderecoDeEmail: userEmail,
            hashDaSenha: userPassword
        };

        if (verificarSeHaCamposVazios(dadosParaAdicionar))
            return alert("Todos os campos são obrigatórios!");

        try {
            await fetch("https://localhost:7144/api/Usuarios/adicionar-usuario", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dadosParaAdicionar)
            });
            return navigate("/");
        } catch (erro) {
            alert("Erro na requisição: " + erro.message);
            console.error("Erro na requisição:", erro);
        };
    };

    function verificarSeHaCamposVazios(dadosParaAdicionar) {
        let haCampoVazio = false;
        const arrayComValores = Object.values(dadosParaAdicionar);

        haCampoVazio = arrayComValores.some(propriedade => {
            if (!propriedade)
                return true;
        });

        return haCampoVazio;
    };

    function onProceed() {
        return enviarDados();
    };

    return (
        <div className="w-screen h-screen bg-white flex items-center justify-center gap-20">
            <div className="flex-container items-center justify-center">
                <div className="flex justify-center">
                    <p className="p-2 mb-6 h-8 flex items-center font-mono font-bold text-3xl">Criar Conta - Estúdio</p>
                </div>
                <div className="flex bg-slate-900 w-96 h-[1px] mb-2"></div>
                <div className="flex">
                    <p className="p-2 h-8 flex items-center font-mono font-bold text-xl">Nome Fantasia</p>
                </div>
                <div className="flex mb-2">
                    <input
                        className="w-full p-2 rounded-full border border-[#6142FC]"
                        onChange={(e) => setUserTradeName(e.target.value)}
                        type="text" />
                </div>
                <div className="flex">
                    <p className="p-2 h-8 flex items-center font-mono font-bold text-xl">Razão Social</p>
                </div>
                <div className="flex mb-2">
                    <input
                        className="w-full p-2 rounded-full border border-[#6142FC]"
                        onChange={(e) => setUserCompanyName(e.target.value)}
                        type="text" />
                </div>
                <div className="flex">
                    <p className="p-2 h-8 flex items-center font-mono font-bold text-xl">Endereço</p>
                </div>
                <div className="flex mb-2">
                    <input
                        className="w-full p-2 rounded-full border border-[#6142FC]"
                        onChange={(e) => setUserAddress(e.target.value)}
                        type="text" />
                </div>
                <div className="flex">
                    <p className="p-2 h-8 flex items-center font-mono font-bold text-xl">Número de Telefone</p>
                </div>
                <div className="flex mb-2">
                    <input
                        className="w-full p-2 rounded-full border border-[#6142FC]"
                        onChange={(e) => setUserPhoneNumber(e.target.value)}
                        type="text" />
                </div>
                <div className="flex">
                    <p className="p-2 h-8 flex items-center font-mono font-bold text-xl">CNPJ</p>
                </div>
                <div className="flex mb-2">
                    <input
                        className="w-full p-2 rounded-full border border-[#6142FC]"
                        onChange={(e) => setUserCnpj(e.target.value)}
                        type="text" />
                </div>
                <div className="flex">
                    <p className="p-2 h-8 flex items-center font-mono font-bold text-xl">Endereço de email</p>
                </div>
                <div className="flex mb-2">
                    <input
                        className="w-full p-2 rounded-full border border-[#6142FC]"
                        onChange={(e) => setUserEmail(e.target.value)}
                        type="text" />
                </div>
                <div className="flex">
                    <p className="p-2 h-8 flex items-center font-mono font-bold text-xl">Senha</p>
                </div>
                <div className="flex mb-2">
                    <input
                        className="w-full p-2 rounded-full border border-[#6142FC]"
                        onChange={(e) => setUserPassword(e.target.value)}
                        type="password" />
                </div>
                <div className="flex">
                    <button
                        className="w-full flex justify-center p-3 rounded-full border border-[#6142FC] bg-[#6142FC] hover:bg-[#7357ff] transition text-2xl font-mono font-bold text-white"
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