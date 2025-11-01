import { X, Pencil, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function ModalUserSettings({ isOpen, closeModal }) {
    if (!isOpen) return null;

    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || null);
    const [userPhone, setUserPhone] = useState(user.telefone);
    const [userEmail, setUserEmail] = useState(user.enderecoDeEmail);
    const [userPassword, setUserPassword] = useState(user.hashDaSenha);
    const [isEdition, setIsEdition] = useState(false);
    const navigate = useNavigate();

    const onEditStudioClick = () => {
        if (isEdition)
            setIsEdition(false);
        else
            setIsEdition(true);
    };

    const onNotEditStudioClick = () => {
        if (isEdition)
            setIsEdition(false);
        else
            setIsEdition(true);
    };

    async function onSaveClick() {
        const usuario = user;
        usuario.enderecoDeEmail = userEmail;
        usuario.telefone = userPhone;
        usuario.hashDaSenha = userPassword;

        try {
            await fetch("https://localhost:7144/api/Usuarios/atualizar-usuario", {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(usuario)
            });
            localStorage.setItem("user", JSON.stringify(usuario));
            return closeModal();
        } catch (erro) {
            alert("Erro na requisição: " + erro.message);
            console.error("Erro na requisição:", erro);
        };
    };

    function onLogOutClick() {
        localStorage.removeItem("user");
        navigate("/");
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="flex w-[500px] flex-col items-center p-6">

                <div className="w-full max-w-6xl flex items-center p-2 bg-slate-200 rounded-t-lg">
                    <div className="flex p-2 flex-1">
                        <button
                            className="bg-slate-400 text-white p-2 rounded-md hover:bg-red-400"
                            onClick={() => closeModal()}
                        >
                            <X />
                        </button>
                    </div>

                    <div className="flex justify-center">
                        <h2 className="text-4xl font-bold">Configurações</h2>
                    </div>

                    {!isEdition && (
                        <div className="flex space-x-2 p-2 justify-end flex-1">
                            <button
                                className="bg-slate-400 text-white p-2 rounded-md hover:bg-green-400"
                                onClick={() => onEditStudioClick()}
                            >
                                <Pencil />
                            </button>
                        </div>
                    )}

                    {isEdition && (
                        <div className="flex space-x-2 p-2 justify-end flex-1">
                            <button
                                className="bg-slate-400 text-white p-2 rounded-md hover:bg-green-400"
                                onClick={() => onNotEditStudioClick()}
                            >
                                <Pencil />
                            </button>
                        </div>
                    )}
                </div>

                <div className="w-full max-w-6xl flex flex-col items-center justify-center p-2 bg-slate-200 rounded-b-lg">
                    <div>
                        <div className="flex items-center mb-3">
                            <p className="p-2 h-8 flex items-center font-bold text-xl">Nome: </p>
                            <p className="p-2 h-8 flex items-center text-xl">{user.nomeDoResponsavel}</p>
                        </div>
                        <div className="flex items-center mb-3">
                            <p className="p-2 h-8 flex items-center font-bold text-xl">CPF: </p>
                            <p className="p-2 h-8 flex items-center text-xl">{user.cpf}</p>
                        </div>
                        <div className="flex items-center mb-3">
                            <p className="p-2 h-8 flex items-center font-bold text-xl">Telefone:</p>
                            {!isEdition && (
                                <p className="p-2 h-8 flex items-center text-xl">{userPhone}</p>
                            )}
                            {isEdition && (
                                <input
                                    className="w-64 h-8 p-2 rounded-md border border-gray-400"
                                    type="text"
                                    value={userPhone}
                                    onChange={(e) => setUserPhone(e.target.value)}
                                />
                            )}
                        </div>
                        <div className="flex items-center mb-3">
                            <p className="p-2 h-8 flex items-center font-bold text-xl">Email:</p>
                            {!isEdition && (
                                <p className="p-2 h-8 flex items-center text-xl">{userEmail}</p>
                            )}
                            {isEdition && (
                                <input
                                    className="w-64 h-8 p-2 rounded-md border border-gray-400"
                                    type="text"
                                    value={userEmail}
                                    onChange={(e) => setUserEmail(e.target.value)}
                                />
                            )}
                        </div>
                        <div className="flex items-center mb-3">
                            <p className="p-2 h-8 flex items-center font-bold text-xl">Senha:</p>
                            {!isEdition && (
                                <p className="p-2 h-8 flex items-center text-xl">{'•'.repeat(userPassword.length)}</p>
                            )}
                            {isEdition && (
                                <input
                                    className="w-64 h-8 p-2 rounded-md border border-gray-400"
                                    type="password"
                                    value={userPassword}
                                    onChange={(e) => setUserPassword(e.target.value)}
                                />
                            )}
                        </div>
                    </div>
                    <div className="flex flex-col items-center w-full">
                        <button
                            className="flex items-center justify-center w-1/2 bg-slate-400 text-white p-2 rounded-md hover:bg-green-400 mb-4 transition"
                            onClick={() => onSaveClick()}
                        >
                            Salvar
                        </button>

                        <button
                            className="flex items-center justify-center w-1/2 bg-slate-400 text-white p-2 rounded-md hover:bg-slate-500 transition"
                            onClick={() => onLogOutClick()}
                        >
                            Sair <LogOut className="ml-2" />
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ModalUserSettings;