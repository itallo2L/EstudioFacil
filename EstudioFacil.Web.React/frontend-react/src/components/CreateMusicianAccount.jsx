import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreateMusicianAccount() {
    const navigate = useNavigate();

    // Estados para os campos
    const [userName, setUserName] = useState("");
    const [userPhoneNumber, setUserPhoneNumber] = useState("");
    const [userCpf, setUserCpf] = useState("");
    const [userAddress, setUserAddress] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");

    // Estados para validação
    const [errors, setErrors] = useState({});
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    // Função para aplicar máscara de CPF
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

    // Função para aplicar máscara de telefone (mesma da tela anterior)
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

    // Função para validar CPF
    const validateCpf = (cpf) => {
        cpf = cpf.replace(/[^\d]/g, '');

        if (cpf.length !== 11) return false;

        // Elimina CPFs inválidos conhecidos
        if (/^(\d)\1+$/.test(cpf)) return false;

        // Validação dos dígitos verificadores
        let soma = 0;
        let resto;

        // Primeiro dígito verificador
        for (let i = 1; i <= 9; i++) {
            soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
        }
        resto = (soma * 10) % 11;
        if ((resto === 10) || (resto === 11)) resto = 0;
        if (resto !== parseInt(cpf.substring(9, 10))) return false;

        // Segundo dígito verificador
        soma = 0;
        for (let i = 1; i <= 10; i++) {
            soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
        }
        resto = (soma * 10) % 11;
        if ((resto === 10) || (resto === 11)) resto = 0;
        if (resto !== parseInt(cpf.substring(10, 11))) return false;

        return true;
    };

    // Função para validar telefone (reaproveitada)
    const validatePhone = (phone) => {
        const phoneDigits = phone.replace(/\D/g, '');
        return phoneDigits.length >= 10 && phoneDigits.length <= 11;
    };

    // Função para validar email (reaproveitada)
    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    // Função para validar senha (reaproveitada)
    const validatePassword = (password) => {
        return password.length >= 6;
    };

    // Handlers com máscaras
    const handleCpfChange = (e) => {
        const maskedValue = applyCpfMask(e.target.value);
        setUserCpf(maskedValue);
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
        if (!userName.trim()) newErrors.userName = "Nome é obrigatório";
        if (!userPhoneNumber.trim()) newErrors.userPhoneNumber = "Telefone é obrigatório";
        if (!userCpf.trim()) newErrors.userCpf = "CPF é obrigatório";
        if (!userAddress.trim()) newErrors.userAddress = "Endereço é obrigatório";
        if (!userEmail.trim()) newErrors.userEmail = "Email é obrigatório";
        if (!userPassword.trim()) newErrors.userPassword = "Senha é obrigatória";

        // Validações específicas
        if (userCpf && !validateCpf(userCpf)) {
            newErrors.userCpf = "CPF inválido";
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
            nomeDoResponsavel: userName,
            telefone: userPhoneNumber.replace(/\D/g, ''), // Envia apenas números
            cPF: userCpf.replace(/\D/g, ''), // Envia apenas números
            endereco: userAddress,
            enderecoDeEmail: userEmail,
            hashDaSenha: userPassword,
            ehUsuarioMusico: true
        };

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
                    <p className="p-2 mb-6 h-8 flex items-center font-mono font-bold text-3xl">Criar Conta - Músico</p>
                </div>
                <div className="flex bg-slate-900 w-96 h-[1px] mb-6"></div>

                {/* Nome */}
                <div className="flex">
                    <p className="p-2 mb-2 h-8 flex items-center font-mono font-bold text-xl">Nome</p>
                </div>
                <div className="flex mb-2">
                    <input
                        className={getInputClass('userName')}
                        onChange={(e) => setUserName(e.target.value)}
                        type="text"
                        value={userName}
                    />
                </div>
                {errors.userName && (
                    <p className="text-red-500 text-sm mb-2 -mt-2">{errors.userName}</p>
                )}

                {/* Telefone */}
                <div className="flex">
                    <p className="p-2 mb-2 h-8 flex items-center font-mono font-bold text-xl">Número de Telefone</p>
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
                    <p className="text-red-500 text-sm mb-2 -mt-2">{errors.userPhoneNumber}</p>
                )}

                {/* CPF */}
                <div className="flex">
                    <p className="p-2 mb-2 h-8 flex items-center font-mono font-bold text-xl">CPF</p>
                </div>
                <div className="flex mb-2">
                    <input
                        className={getInputClass('userCpf')}
                        onChange={handleCpfChange}
                        type="text"
                        value={userCpf}
                        placeholder="123.456.789-09"
                    />
                </div>
                {errors.userCpf && (
                    <p className="text-red-500 text-sm mb-2 -mt-2">{errors.userCpf}</p>
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

                {/* Email */}
                <div className="flex">
                    <p className="p-2 mb-2 h-8 flex items-center font-mono font-bold text-xl">Endereço de email</p>
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
                    <p className="text-red-500 text-sm mb-2 -mt-2">{errors.userEmail}</p>
                )}

                {/* Senha */}
                <div className="flex">
                    <p className="p-2 mb-2 h-8 flex items-center font-mono font-bold text-xl">Senha</p>
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
                    <p className="text-red-500 text-sm mb-2 -mt-2">{errors.userPassword}</p>
                )}

                {/* Botão */}
                <div className="flex mt-6">
                    <button
                        className="w-full flex justify-center p-3 rounded-full border-[#6142FC] bg-[#6142FC] hover:bg-[#7357ff] transition text-2xl font-mono font-bold text-white"
                        onClick={onProceed}
                    >
                        Prosseguir
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CreateMusicianAccount;