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
    const [studioLogged, setStudioLogged] = useState(JSON.parse(localStorage.getItem("studioLogged")) || {});
    const [description, setDescription] = useState(studioLogged.descricao || "");
    const [valorDaHora, setValorDaHora] = useState(studioLogged.valorDaHora || "");
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const [showSaveModal, setShowSaveModal] = useState(false);
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const [pendingStudioStatus, setPendingStudioStatus] = useState(null);
    const navigate = useNavigate();

    const toggleEdition = () => {
        setIsEdition(!isEdition);
        // Se estiver saindo do modo de edição, limpa o status pendente
        if (isEdition) {
            setPendingStudioStatus(null);
        }
    };

    // Função para formatar o valor como moeda brasileira
    const formatCurrency = (value) => {
        // Remove tudo que não é número
        const numericValue = value.replace(/\D/g, '');

        // Se não houver valor, retorna vazio
        if (!numericValue) return "";

        // Converte para número e formata como moeda brasileira
        const number = parseInt(numericValue, 10) / 100; // Divide por 100 para considerar centavos
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(number);
    };

    // Handler para o campo de valor da hora
    const handlevalorDaHoraChange = (e) => {
        const rawValue = e.target.value;
        const numericValue = rawValue.replace(/\D/g, '');

        // Se estiver vazio, seta como string vazia
        if (!numericValue) {
            setValorDaHora("");
            return;
        }

        // Converte para número e formata
        const number = parseInt(numericValue, 10) / 100;
        const formattedValue = new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(number);

        setValorDaHora(formattedValue);
    };

    // Função para extrair o valor numérico do formato de moeda
    const extractNumericValue = (currencyValue) => {
        if (!currencyValue) return 0;
        // Remove "R$", pontos, espaços e converte vírgula para ponto
        const numericString = currencyValue
            .replace('R$', '')
            .replace(/\./g, '')
            .replace(',', '.')
            .trim();
        return parseFloat(numericString) || 0;
    };

    // Função para confirmar a mudança de status do estúdio
    function confirmStudioStatusChange(abrir) {
        setPendingStudioStatus(abrir);
        setShowConfirmationModal(true);
    }

    // Função para abrir modal de saída
    function onLogOutClick() {
        setShowLogoutModal(true);
    }

    // Função para executar o logout
    function executeLogout() {
        localStorage.removeItem("user");
        localStorage.removeItem("studios");
        localStorage.removeItem("schedules");
        localStorage.removeItem("studioLogged");
        localStorage.removeItem("agendamentoAtual");
        setShowLogoutModal(false);
        closeModal();
        navigate("/");
    }

    // Função para salvar todas as alterações (usuário + estúdio)
    async function onSaveClick() {
        setShowSaveModal(true);
    }

    // Função que realmente executa o salvamento
    async function executeSave() {
        try {
            // 1. Atualizar usuário
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

            const userResponse = await fetch("https://localhost:7144/api/Usuarios/atualizar-usuario", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(usuarioAtualizado),
            });

            if (!userResponse.ok) {
                throw new Error("Erro ao atualizar usuário");
            }

            localStorage.setItem("user", JSON.stringify(usuarioAtualizado));

            // 2. Preparar dados do estúdio para atualização
            const valorDaHoraNumerico = extractNumericValue(valorDaHora);
            const estudioAtualizado = {
                ...studioLogged,
                estaAberto: pendingStudioStatus !== null ? pendingStudioStatus : studioLogged.estaAberto,
                valorDaHora: valorDaHoraNumerico,
                descricao: description
            };

            // 3. Atualizar estúdio se houver dados válidos
            if (studioLogged && studioLogged.id) {
                const studioResponse = await fetch(`https://localhost:7144/api/EstudioMusical`, {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(estudioAtualizado),
                });

                if (!studioResponse.ok) {
                    throw new Error("Erro ao atualizar dados do estúdio");
                }

                // Atualiza o estado local e o localStorage
                setStudioLogged(estudioAtualizado);
                localStorage.setItem("studioLogged", JSON.stringify(estudioAtualizado));
            }

            // 4. Fechar modais e resetar estados
            setShowSaveModal(false);
            setIsEdition(false);
            setPendingStudioStatus(null);
            closeModal();

        } catch (erro) {
            alert("Erro ao salvar alterações: " + erro.message);
            console.error("Erro na requisição:", erro);
        }
    };

    const formatarTelefone = (numero) => {
        if (!numero) return '';

        const numeros = numero.replace(/\D/g, '');

        if (numeros.length === 11) {
            return `(${numeros.substring(0, 2)}) ${numeros.substring(2, 7)}-${numeros.substring(7)}`;
        } else if (numeros.length === 10) {
            return `(${numeros.substring(0, 2)}) ${numeros.substring(2, 6)}-${numeros.substring(6)}`;
        }

        return numero;
    };

    const applyCpfMask = (value) => {
        let cpf = value.replace(/\D/g, '');

        if (cpf.length <= 3) {
            return cpf;
        } else if (cpf.length <= 6) {
            return cpf.replace(/^(\d{3})(\d+)/, '$1.$2');
        } else if (cpf.length <= 9) {
            return cpf.replace(/^(\d{3})(\d{3})(\d+)/, '$1.$2.$3');
        } else {
            return cpf.replace(/^(\d{3})(\d{3})(\d{3})(\d+)/, '$1.$2.$3-$4').substring(0, 14);
        }
    };

    if (isMusicianUSer)
        return (
            <>
                {/* Modal principal para músico com z-index menor */}
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40">
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
                                value={applyCpfMask(userCpf)}
                                onChange={(e) => setUserCpf(e.target.value)}
                            />

                            <label className="text-sm font-bold">Número de Telefone</label>
                            <input
                                disabled={!isEdition}
                                className="border border-black rounded-full px-3 py-1.5 focus:outline-none disabled:opacity-70 font-mono"
                                value={formatarTelefone(userPhone)}
                                onChange={(e) => setUserPhone(e.target.value)}
                            />

                            <label className="text-sm font-semibold">Endereço de email</label>
                            <input
                                disabled={!isEdition}
                                className="border border-black rounded-full px-3 py-1.5 focus:outline-none disabled:opacity-70"
                                value={userEmail}
                                onChange={(e) => setUserEmail(e.target.value)}
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

                {/* Modal de Confirmação de Logout para Músico - DEVE vir DEPOIS do modal principal */}
                {showLogoutModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-xl font-bold text-[#6142FC]">Confirmar Saída</h3>
                                <button
                                    onClick={() => setShowLogoutModal(false)}
                                    className="text-gray-500 hover:text-gray-700 text-2xl"
                                >
                                    ×
                                </button>
                            </div>
                            <p className="text-gray-700 mb-6">
                                Tem certeza que deseja sair da sua conta?
                            </p>
                            <div className="flex justify-end gap-3">
                                <button
                                    onClick={() => setShowLogoutModal(false)}
                                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-full hover:bg-gray-400 transition"
                                >
                                    Cancelar
                                </button>
                                <button
                                    onClick={executeLogout}
                                    className="px-4 py-2 bg-[#6142FC] text-white rounded-full hover:bg-[#7357ff] transition"
                                >
                                    Sair
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </>
        );

    return (
        <>
            {/* Modal principal para estúdio com z-index menor */}
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40">
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

                            {/* NOVO CAMPO: Valor da Hora */}
                            <label className="text-sm font-semibold">Valor da Hora</label>
                            <input
                                disabled={!isEdition}
                                className="border border-black rounded-full px-3 py-1.5 focus:outline-none disabled:opacity-70 font-mono"
                                value={valorDaHora}
                                onChange={handlevalorDaHoraChange}
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
                        <input className="w-full text-sm text-gray-600 leading-relaxed p-3 border border-gray-300 rounded-lg bg-gray-50"
                            disabled={!isEdition}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        >
                        </input>
                    </div>

                    {/* Botões lado a lado */}
                    <div className="flex gap-3 w-full">
                        <button
                            onClick={isEdition ? onSaveClick : onLogOutClick}
                            className="flex-1 bg-[#6142FC] text-white font-semibold py-2 rounded-full hover:bg-[#7357ff] transition"
                        >
                            {isEdition ? "Salvar" : "Sair"}
                        </button>

                        {/* Botão "Abrir Estúdio" - aparece apenas quando estúdio está fechado */}
                        {studioLogged && studioLogged.estaAberto === false && (
                            <button
                                className={`flex-1 bg-green-600 text-white font-semibold py-2 rounded-full transition ${isEdition ? '' : 'opacity-50 cursor-not-allowed'
                                    } ${pendingStudioStatus === true ? 'ring-2 ring-green-300 ring-offset-2' : ''}`}
                                onClick={() => isEdition && confirmStudioStatusChange(true)}
                                disabled={!isEdition}
                            >
                                {pendingStudioStatus === true ? 'Abrir (Pendente)' : 'Abrir Estúdio'}
                            </button>
                        )}

                        {/* Botão "Fechar Estúdio" - aparece apenas quando estúdio está aberto */}
                        {studioLogged && studioLogged.estaAberto === true && (
                            <button
                                className={`flex-1 bg-red-600 text-white font-semibold py-2 rounded-full transition ${isEdition ? '' : 'opacity-50 cursor-not-allowed'
                                    } ${pendingStudioStatus === false ? 'ring-2 ring-red-300 ring-offset-2' : ''}`}
                                onClick={() => isEdition && confirmStudioStatusChange(false)}
                                disabled={!isEdition}
                            >
                                {pendingStudioStatus === false ? 'Fechar (Pendente)' : 'Fechar Estúdio'}
                            </button>
                        )}
                    </div>

                    {/* Status Pendente */}
                    {(pendingStudioStatus !== null || valorDaHora !== (studioLogged.valorDaHora ? formatCurrency(studioLogged.valorDaHora.toString()) : "")) && (
                        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg w-full">
                            <p className="text-sm text-blue-700">
                                <strong>Alterações pendentes:</strong>
                                <ul className="list-disc pl-5 mt-1 space-y-1">
                                    {pendingStudioStatus !== null && (
                                        <li>O estúdio será {pendingStudioStatus ? "aberto" : "fechado"}</li>
                                    )}
                                    {valorDaHora !== (studioLogged.valorDaHora ? formatCurrency(studioLogged.valorDaHora.toString()) : "") && (
                                        <li>Valor da hora será atualizado para {valorDaHora || 'R$ 0,00'}</li>
                                    )}
                                </ul>
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {/* Modais de confirmação - devem vir DEPOIS do modal principal */}
            {showConfirmationModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-bold text-[#6142FC]">Confirmar Alteração</h3>
                            <button
                                onClick={() => setShowConfirmationModal(false)}
                                className="text-gray-500 hover:text-gray-700 text-2xl"
                            >
                                ×
                            </button>
                        </div>
                        <p className="text-gray-700 mb-6">
                            Você deseja {pendingStudioStatus ? "abrir" : "fechar"} o estúdio?
                            Esta alteração será aplicada quando você clicar em "Salvar".
                        </p>
                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => {
                                    setPendingStudioStatus(null);
                                    setShowConfirmationModal(false);
                                }}
                                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-full hover:bg-gray-400 transition"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={() => setShowConfirmationModal(false)}
                                className="px-4 py-2 bg-[#6142FC] text-white rounded-full hover:bg-[#7357ff] transition"
                            >
                                Confirmar
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {showSaveModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-bold text-[#6142FC]">Confirmar Salvamento</h3>
                            <button
                                onClick={() => setShowSaveModal(false)}
                                className="text-gray-500 hover:text-gray-700 text-2xl"
                            >
                                ×
                            </button>
                        </div>
                        <p className="text-gray-700 mb-6">
                            {pendingStudioStatus !== null
                                ? `Você está prestes a salvar as alterações do perfil, ${pendingStudioStatus ? "abrir" : "fechar"} o estúdio e atualizar o valor da hora para ${valorDaHora || 'R$ 0,00'}. Deseja continuar?`
                                : valorDaHora
                                    ? `Você está prestes a salvar as alterações do perfil e atualizar o valor da hora para ${valorDaHora}. Deseja continuar?`
                                    : "Você está prestes a salvar as alterações do perfil. Deseja continuar?"}
                        </p>
                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setShowSaveModal(false)}
                                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-full hover:bg-gray-400 transition"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={executeSave}
                                className="px-4 py-2 bg-[#6142FC] text-white rounded-full hover:bg-[#7357ff] transition"
                            >
                                Salvar Alterações
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {showLogoutModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-bold text-[#6142FC]">Confirmar Saída</h3>
                            <button
                                onClick={() => setShowLogoutModal(false)}
                                className="text-gray-500 hover:text-gray-700 text-2xl"
                            >
                                ×
                            </button>
                        </div>
                        <p className="text-gray-700 mb-6">
                            Tem certeza que deseja sair da sua conta?
                        </p>
                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setShowLogoutModal(false)}
                                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-full hover:bg-gray-400 transition"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={executeLogout}
                                className="px-4 py-2 bg-[#6142FC] text-white rounded-full hover:bg-[#7357ff] transition"
                            >
                                Sair
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default ModalUserSettings;