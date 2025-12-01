import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Login() {

    const navigate = useNavigate();
    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [user, setUser] = useState();

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(user));
    }, [user]);

    async function onOpenStudioList() {
        if (!userEmail)
            return alert("O campo Endereço de email é obrigatório!");
        else if (!userPassword)
            return alert("O campo Senha é obrigatório!");

        const query = `?email=${encodeURIComponent(userEmail)}&hashDaSenha=${encodeURIComponent(userPassword)}`;

        try {
            const response = await fetch(`https://localhost:7144/api/Usuarios/obter-usuario/${query}`, {
                method: 'GET'
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText || `Erro HTTP: ${response.status}`);
            };

            const data = await response.json();
            setUser(data);
            localStorage.setItem("user", JSON.stringify(data));
            data.ehUsuarioMusico
                ? navigate("/studio")
                : navigate("/schedule");
        } catch (erro) {
            alert("Erro na requisição: " + erro.message);
            console.error("Erro na requisição:", erro);
        };
    };

    return (
        <div className="w-screen h-screen flex items-center justify-end gap-20 
             bg-cover bg-center bg-no-repeat font-serif"
            style={{ backgroundImage: `url('https://i.pinimg.com/736x/0f/2e/16/0f2e16f0b0639640b32c76c416c543b0.jpg')` }}>
            <div className="flex flex-col items-start w-5/12 mb-32 mr-20">
                <p className="p-2 h-8 flex items-center font-bold text-white text-2xl">Boas-vindas</p>
                <p className="p-2 mb-2 h-8 flex items-center font-bold text-white text-2xl">ao</p>
                <p className="p-2 h-8 flex items-center font-bold text-white text-6xl">
                    Estúdio Fácil
                </p>
            </div>

            <div className="h-screen w-2/6 bg-white flex items-center justify-center gap-20">
                <div className="flex-container items-center justify-center">
                    <div className="flex justify-center">
                        <p className="p-2 mb-16 h-8 flex items-center font-mono font-bold text-3xl">Faça o login</p>
                    </div>
                    <div className="flex">
                        <p className="p-2 mb-2 h-8 flex items-center font-mono font-bold text-xl">Endereço de email</p>
                    </div>
                    <div className="flex mb-4">
                        <input
                            className="w-full p-2 rounded-full border border-[#6142FC] focus:outline-none focus:border-[#6142FC] focus:ring-1 focus:ring-[#6142FC]"
                            onChange={e => setUserEmail(e.target.value)}
                            type="text" />
                    </div>
                    <div className="flex">
                        <p className="p-2 mb-2 h-8 flex items-center font-mono font-bold text-xl">Senha</p>
                    </div>
                    <div className="flex">
                        <input
                            className="w-full p-2 rounded-full border border-[#6142FC] focus:outline-none focus:border-[#6142FC] focus:ring-1 focus:ring-[#6142FC]"
                            onChange={e => setUserPassword(e.target.value)}
                            type="password" />
                    </div>
                    <div className="flex mb-4 mt-4">
                        <a className="hover:underline hover:text-[#144B6F]" href="http://localhost:5173/resetPassword">Esqueceu sua senha?</a>
                    </div>
                    <div className="flex mb-6">
                        <button
                            className="w-full bg-[#6142FC] flex justify-center p-3 rounded-full hover:bg-[#7357ff] text-2xl font-mono font-bold text-white"
                            onClick={() => onOpenStudioList()}>
                            Entrar
                        </button>
                    </div>
                    <div className="flex bg-slate-900 w-96 h-[1px] mb-8"></div>
                    <div className="flex justify-center">
                        <a className="hover:underline hover:text-[#144B6F]" href="http://localhost:5173/chooseAccountType">Não tem uma conta?</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;