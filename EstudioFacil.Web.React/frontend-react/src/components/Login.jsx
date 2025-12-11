import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Login() {
    const navigate = useNavigate();
    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [user, setUser] = useState();
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(user));
    }, [user]);

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

    // Função para validar email
    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    // Função para validar campos
    const validateFields = () => {
        const newErrors = {};

        if (!userEmail.trim()) {
            newErrors.userEmail = "Endereço de email é obrigatório";
        } else if (!validateEmail(userEmail)) {
            newErrors.userEmail = "Email inválido";
        }

        if (!userPassword.trim()) {
            newErrors.userPassword = "Senha é obrigatória";
        } else if (userPassword.length < 6) {
            newErrors.userPassword = "Senha deve ter pelo menos 6 caracteres";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    async function onOpenStudioList() {
        // Validar campos antes de fazer requisição
        if (!validateFields()) {
            showError("Por favor, corrija os erros no formulário.");
            return;
        }

        setIsLoading(true);
        const query = `?email=${encodeURIComponent(userEmail)}&hashDaSenha=${encodeURIComponent(userPassword)}`;

        try {
            const response = await fetch(`https://localhost:7144/api/Usuarios/obter-usuario/${query}`, {
                method: 'GET'
            });

            if (!response.ok) {
                let errorMessage = "Erro ao fazer login";

                try {
                    const errorData = await response.json();
                    // Tenta extrair a mensagem do erro do backend
                    if (errorData && errorData.Title) {
                        errorMessage = errorData.Title;
                    } else if (errorData && errorData.Detail) {
                        // Tenta extrair da mensagem detalhada
                        const detailMatch = errorData.Detail.match(/System\.Exception:\s*(.*?)\r?\n/);
                        if (detailMatch && detailMatch[1]) {
                            errorMessage = detailMatch[1];
                        } else {
                            errorMessage = errorData.Detail;
                        }
                    }
                } catch {
                    // Se não conseguir parsear como JSON, usa o status
                    if (response.status === 401 || response.status === 403) {
                        errorMessage = "E-mail ou senha incorretos";
                    } else if (response.status === 404) {
                        errorMessage = "Usuário não encontrado";
                    } else if (response.status >= 500) {
                        errorMessage = "Erro no servidor. Tente novamente mais tarde.";
                    }
                }

                throw new Error(errorMessage);
            }

            const data = await response.json();
            setUser(data);
            localStorage.setItem("user", JSON.stringify(data));

            if (data.ehUsuarioMusico) {
                navigate("/studio");
            } else {
                try {
                    const responseStudio = await fetch(
                        `https://localhost:7144/api/EstudioMusical/${data.idDoEstudio}`,
                        {
                            method: "GET",
                        }
                    );

                    if (!responseStudio.ok) {
                        throw new Error("Erro ao obter dados do estúdio");
                    }

                    const dataStudio = await responseStudio.json();
                    localStorage.setItem("studioLogged", JSON.stringify(dataStudio));
                    navigate("/schedule");
                } catch (studioError) {
                    console.error("Erro ao buscar estúdio:", studioError);
                    // Mesmo com erro no estúdio, permite o login
                    navigate("/schedule");
                }
            }
        } catch (erro) {
            // Mostra modal de erro ao invés de alert
            showError(erro.message);
            console.error("Erro na requisição:", erro);
        } finally {
            setIsLoading(false);
        }
    };

    // Estilos para inputs com erro
    const getInputClass = (fieldName) => {
        const baseClass = "w-full p-2 rounded-full border focus:outline-none focus:ring-1";
        return errors[fieldName]
            ? `${baseClass} border-red-500 focus:border-red-500 focus:ring-red-500 bg-red-50`
            : `${baseClass} border-[#6142FC] focus:border-[#6142FC] focus:ring-[#6142FC]`;
    };

    // Handler para pressionar Enter
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            onOpenStudioList();
        }
    };

    return (
        <div className="w-screen h-screen flex items-center justify-end gap-20 
             bg-cover bg-center bg-no-repeat font-serif"
            style={{ backgroundImage: `url('https://i.pinimg.com/736x/0f/2e/16/0f2e16f0b0639640b32c76c416c543b0.jpg')` }}>

            {/* Modal de Erro */}
            {showErrorModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-bold text-red-600">Erro no Login</h3>
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

            {/* <div className="flex flex-col items-start w-5/12 mb-32 mr-20">
                <p className="p-2 h-8 flex items-center font-bold text-black text-4xl">Boas-vindas</p>
                <p className="p-2 mb-20 h-8 flex items-center font-bold text-black text-4xl">ao</p>
                <p className="p-2 h-8 flex items-center font-bold text-black text-8xl">
                    Estúdio Fácil
                </p>
            </div> */}

            <div className="flex flex-col items-start w-5/12 mb-32 mr-20">
                <p className="p-2 h-8 flex items-center font-bold text-white text-4xl"
                    style={{
                        textShadow: `
               0 0 5px #6142FC
           `
                    }}>
                    Boas-vindas
                </p>

                <p className="p-2 mb-20 h-8 flex items-center font-bold text-white text-4xl"
                    style={{
                        textShadow: `
               0 0 5px #6142FC
           `
                    }}>
                    ao
                </p>

                <p className="p-2 h-8 flex items-center font-bold text-white text-8xl"
                    style={{
                        textShadow: `
               0 0 5px #6142FC
           `
                    }}>
                    Estúdio Fácil
                </p>
            </div>

            <div className="h-screen w-2/6 bg-white flex items-center justify-center gap-20">
                <div className="flex-container items-center justify-center">
                    <div className="flex justify-center">
                        <p className="p-2 mb-16 h-8 flex items-center font-mono font-bold text-3xl">Faça o login</p>
                    </div>

                    {/* Email */}
                    <div className="flex">
                        <p className="p-2 mb-2 h-8 flex items-center font-mono font-bold text-xl">Endereço de email</p>
                    </div>
                    <div className="flex mb-4">
                        <input
                            className={getInputClass('userEmail')}
                            onChange={e => {
                                setUserEmail(e.target.value);
                                // Limpa erro ao digitar
                                if (errors.userEmail) {
                                    setErrors(prev => ({ ...prev, userEmail: undefined }));
                                }
                            }}
                            onKeyPress={handleKeyPress}
                            type="email"
                            value={userEmail}
                            placeholder="seu@email.com"
                        />
                    </div>
                    {errors.userEmail && (
                        <p className="text-red-500 text-sm mb-2 -mt-3 ml-2">{errors.userEmail}</p>
                    )}

                    {/* Senha */}
                    <div className="flex">
                        <p className="p-2 mb-2 h-8 flex items-center font-mono font-bold text-xl">Senha</p>
                    </div>
                    <div className="flex">
                        <input
                            className={getInputClass('userPassword')}
                            onChange={e => {
                                setUserPassword(e.target.value);
                                // Limpa erro ao digitar
                                if (errors.userPassword) {
                                    setErrors(prev => ({ ...prev, userPassword: undefined }));
                                }
                            }}
                            onKeyPress={handleKeyPress}
                            type="password"
                            value={userPassword}
                        />
                    </div>
                    {errors.userPassword && (
                        <p className="text-red-500 text-sm mb-2 mt-1 ml-2">{errors.userPassword}</p>
                    )}

                    {/* Esqueci senha */}
                    <div className="flex mb-4 mt-4">
                        <a className="hover:underline hover:text-[#144B6F] text-[#6142FC]" href="http://localhost:5173/resetPassword">
                            Esqueceu sua senha?
                        </a>
                    </div>

                    {/* Botão de Entrar */}
                    <div className="flex mb-6">
                        <button
                            className={`w-full bg-[#6142FC] flex justify-center p-3 rounded-full text-2xl font-mono font-bold text-white ${isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-[#7357ff]'
                                }`}
                            onClick={onOpenStudioList}
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <div className="flex items-center">
                                    <svg className="animate-spin h-5 w-5 mr-3 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Entrando...
                                </div>
                            ) : (
                                "Entrar"
                            )}
                        </button>
                    </div>

                    <div className="flex bg-slate-900 w-96 h-[1px] mb-8"></div>

                    {/* Link para criar conta */}
                    <div className="flex justify-center">
                        <a className="hover:underline hover:text-[#144B6F] text-[#6142FC]" href="http://localhost:5173/chooseAccountType">
                            Não tem uma conta?
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;