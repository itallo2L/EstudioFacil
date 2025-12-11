import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function CreateStudioAccount() {
    const navigate = useNavigate();

    // Estados para os campos
    const [userTradeName, setUserTradeName] = useState("");
    const [userCompanyName, setUserCompanyName] = useState("");
    const [userAddress, setUserAddress] = useState("");
    const [userPhoneNumber, setUserPhoneNumber] = useState("");
    const [userCnpj, setUserCnpj] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");

    // Estados para validação
    const [errors, setErrors] = useState({});
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    // Função para aplicar máscara de CNPJ
    const applyCnpjMask = (value) => {
        let cnpj = value.replace(/\D/g, '');

        if (cnpj.length <= 2) {
            return cnpj;
        } else if (cnpj.length <= 5) {
            return cnpj.replace(/^(\d{2})(\d+)/, '$1.$2');
        } else if (cnpj.length <= 8) {
            return cnpj.replace(/^(\d{2})(\d{3})(\d+)/, '$1.$2.$3');
        } else if (cnpj.length <= 12) {
            return cnpj.replace(/^(\d{2})(\d{3})(\d{3})(\d+)/, '$1.$2.$3/$4');
        } else {
            return cnpj.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d+)/, '$1.$2.$3/$4-$5').substring(0, 18);
        }
    };

    // Função para aplicar máscara de telefone
    const applyPhoneMask = (value) => {
        let phone = value.replace(/\D/g, '');

        if (phone.length <= 2) {
            return phone;
        } else if (phone.length <= 6) {
            return phone.replace(/^(\d{2})(\d+)/, '($1) $2');
        } else if (phone.length <= 10) {
            return phone.replace(/^(\d{2})(\d{4})(\d+)/, '($1) $2-$3');
        } else {
            return phone.replace(/^(\d{2})(\d{5})(\d+)/, '($1) $2-$3').substring(0, 15);
        }
    };

    // Função para validar CNPJ
    const validateCnpj = (cnpj) => {
        cnpj = cnpj.replace(/[^\d]/g, '');

        if (cnpj.length !== 14) return false;

        // Elimina CNPJs inválidos conhecidos
        if (/^(\d)\1+$/.test(cnpj)) return false;

        // Validação dos dígitos verificadores
        let tamanho = cnpj.length - 2;
        let numeros = cnpj.substring(0, tamanho);
        let digitos = cnpj.substring(tamanho);
        let soma = 0;
        let pos = tamanho - 7;

        for (let i = tamanho; i >= 1; i--) {
            soma += numeros.charAt(tamanho - i) * pos--;
            if (pos < 2) pos = 9;
        }

        let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
        if (resultado !== parseInt(digitos.charAt(0))) return false;

        tamanho = tamanho + 1;
        numeros = cnpj.substring(0, tamanho);
        soma = 0;
        pos = tamanho - 7;

        for (let i = tamanho; i >= 1; i--) {
            soma += numeros.charAt(tamanho - i) * pos--;
            if (pos < 2) pos = 9;
        }

        resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
        if (resultado !== parseInt(digitos.charAt(1))) return false;

        return true;
    };

    // Função para validar telefone
    const validatePhone = (phone) => {
        const phoneDigits = phone.replace(/\D/g, '');
        return phoneDigits.length >= 10 && phoneDigits.length <= 11;
    };

    // Função para validar email
    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    // Função para validar senha
    const validatePassword = (password) => {
        return password.length >= 6;
    };

    // Handlers com máscaras
    const handleCnpjChange = (e) => {
        const maskedValue = applyCnpjMask(e.target.value);
        setUserCnpj(maskedValue);
    };

    const handlePhoneChange = (e) => {
        const maskedValue = applyPhoneMask(e.target.value);
        setUserPhoneNumber(maskedValue);
    };

    // Função para mostrar modal de erro
    const showError = (message) => {
        setErrorMessage(message);
        setShowErrorModal(true);
    };

    // Função para fechar modal
    const closeErrorModal = () => {
        setShowErrorModal(false);
        setErrorMessage("");
    };

    // Função para validar todos os campos
    const validateAllFields = () => {
        const newErrors = {};

        // Validação de campos vazios
        if (!userTradeName.trim()) newErrors.userTradeName = "Nome Fantasia é obrigatório";
        if (!userCompanyName.trim()) newErrors.userCompanyName = "Razão Social é obrigatória";
        if (!userAddress.trim()) newErrors.userAddress = "Endereço é obrigatório";
        if (!userPhoneNumber.trim()) newErrors.userPhoneNumber = "Telefone é obrigatório";
        if (!userCnpj.trim()) newErrors.userCnpj = "CNPJ é obrigatório";
        if (!userEmail.trim()) newErrors.userEmail = "Email é obrigatório";
        if (!userPassword.trim()) newErrors.userPassword = "Senha é obrigatória";

        // Validações específicas
        if (userCnpj && !validateCnpj(userCnpj)) {
            newErrors.userCnpj = "CNPJ inválido";
        }

        if (userPhoneNumber && !validatePhone(userPhoneNumber)) {
            newErrors.userPhoneNumber = "Telefone inválido (formato: (11) 99999-9999)";
        }

        if (userEmail && !validateEmail(userEmail)) {
            newErrors.userEmail = "Email inválido";
        }

        if (userPassword && !validatePassword(userPassword)) {
            newErrors.userPassword = "Senha deve ter pelo menos 6 caracteres";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const enviarDados = async () => {
        // Validar campos antes de enviar
        if (!validateAllFields()) {
            showError("Por favor, corrija os erros no formulário.");
            return;
        }

        const dadosParaAdicionar = {
            nomeFantasia: userTradeName,
            razaoSocial: userCompanyName,
            endereco: userAddress,
            telefone: userPhoneNumber.replace(/\D/g, ''), // Envia apenas números
            cNPJ: userCnpj.replace(/\D/g, ''), // Envia apenas números
            enderecoDeEmail: userEmail,
            hashDaSenha: userPassword
        };

        dadosParaAdicionar.ehUsuarioMusico = false;

        try {
            const response = await fetch("https://localhost:7144/api/Usuarios/adicionar-usuario", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dadosParaAdicionar)
            });

            if (!response.ok) {
                throw new Error(`Erro HTTP: ${response.status}`);
            }

            return navigate("/");
        } catch (erro) {
            showError("Erro ao criar conta. Tente novamente.");
            console.error("Erro na requisição:", erro);
        };
    };

    function onProceed() {
        return enviarDados();
    };

    // Estilos para inputs com erro
    const getInputClass = (fieldName) => {
        const baseClass = "w-full p-2 rounded-full border";
        return errors[fieldName]
            ? `${baseClass} border-red-500 bg-red-50`
            : `${baseClass} border-[#6142FC]`;
    };

    return (
        <div className="w-screen h-screen bg-white flex items-center justify-center gap-20">
            {/* Modal de Erro */}
            {showErrorModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-bold text-red-600">Erro</h3>
                            <button
                                onClick={closeErrorModal}
                                className="text-gray-500 hover:text-gray-700 text-2xl"
                            >
                                ×
                            </button>
                        </div>
                        <p className="text-gray-700 mb-6">{errorMessage}</p>
                        <div className="flex justify-end">
                            <button
                                onClick={closeErrorModal}
                                className="px-4 py-2 bg-[#6142FC] text-white rounded-full hover:bg-[#7357ff] transition"
                            >
                                Fechar
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="flex-container items-center justify-center">
                <div className="flex justify-center">
                    <p className="p-2 mb-6 h-8 flex items-center font-mono font-bold text-3xl">Criar Conta - Estúdio</p>
                </div>
                <div className="flex bg-slate-900 w-96 h-[1px] mb-2"></div>

                {/* Nome Fantasia */}
                <div className="flex">
                    <p className="p-2 h-8 flex items-center font-mono font-bold text-xl">Nome Fantasia</p>
                </div>
                <div className="flex mb-2">
                    <input
                        className={getInputClass('userTradeName')}
                        onChange={(e) => setUserTradeName(e.target.value)}
                        type="text"
                        value={userTradeName}
                    />
                </div>
                {errors.userTradeName && (
                    <p className="text-red-500 text-sm mb-2">{errors.userTradeName}</p>
                )}

                {/* Razão Social */}
                <div className="flex">
                    <p className="p-2 h-8 flex items-center font-mono font-bold text-xl">Razão Social</p>
                </div>
                <div className="flex mb-2">
                    <input
                        className={getInputClass('userCompanyName')}
                        onChange={(e) => setUserCompanyName(e.target.value)}
                        type="text"
                        value={userCompanyName}
                    />
                </div>
                {errors.userCompanyName && (
                    <p className="text-red-500 text-sm mb-2">{errors.userCompanyName}</p>
                )}

                {/* Endereço */}
                <div className="flex">
                    <p className="p-2 h-8 flex items-center font-mono font-bold text-xl">Endereço</p>
                </div>
                <div className="flex mb-2">
                    <input
                        className={getInputClass('userAddress')}
                        onChange={(e) => setUserAddress(e.target.value)}
                        type="text"
                        value={userAddress}
                    />
                </div>
                {errors.userAddress && (
                    <p className="text-red-500 text-sm mb-2">{errors.userAddress}</p>
                )}

                {/* Telefone */}
                <div className="flex">
                    <p className="p-2 h-8 flex items-center font-mono font-bold text-xl">Número de Telefone</p>
                </div>
                <div className="flex mb-2">
                    <input
                        className={getInputClass('userPhoneNumber')}
                        onChange={handlePhoneChange}
                        type="text"
                        value={userPhoneNumber}
                        placeholder="(11) 99999-9999"
                    />
                </div>
                {errors.userPhoneNumber && (
                    <p className="text-red-500 text-sm mb-2">{errors.userPhoneNumber}</p>
                )}

                {/* CNPJ */}
                <div className="flex">
                    <p className="p-2 h-8 flex items-center font-mono font-bold text-xl">CNPJ</p>
                </div>
                <div className="flex mb-2">
                    <input
                        className={getInputClass('userCnpj')}
                        onChange={handleCnpjChange}
                        type="text"
                        value={userCnpj}
                        placeholder="12.345.678/0001-99"
                    />
                </div>
                {errors.userCnpj && (
                    <p className="text-red-500 text-sm mb-2">{errors.userCnpj}</p>
                )}

                {/* Email */}
                <div className="flex">
                    <p className="p-2 h-8 flex items-center font-mono font-bold text-xl">Endereço de email</p>
                </div>
                <div className="flex mb-2">
                    <input
                        className={getInputClass('userEmail')}
                        onChange={(e) => setUserEmail(e.target.value)}
                        type="email"
                        value={userEmail}
                    />
                </div>
                {errors.userEmail && (
                    <p className="text-red500 text-sm mb-2">{errors.userEmail}</p>
                )}

                {/* Senha */}
                <div className="flex">
                    <p className="p-2 h-8 flex items-center font-mono font-bold text-xl">Senha</p>
                </div>
                <div className="flex mb-2">
                    <input
                        className={getInputClass('userPassword')}
                        onChange={(e) => setUserPassword(e.target.value)}
                        type="password"
                        value={userPassword}
                    />
                </div>
                {errors.userPassword && (
                    <p className="text-red-500 text-sm mb-2">{errors.userPassword}</p>
                )}

                {/* Botão */}
                <div className="flex mt-6">
                    <button
                        className="w-full flex justify-center p-3 rounded-full border border-[#6142FC] bg-[#6142FC] hover:bg-[#7357ff] transition text-2xl font-mono font-bold text-white"
                        onClick={onProceed}
                    >
                        Prosseguir
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CreateStudioAccount;