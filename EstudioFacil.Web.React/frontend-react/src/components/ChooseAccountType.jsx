import { useState } from "react";
import { useNavigate } from "react-router-dom";

function ChooseAccountType() {
    const STRING_VAZIA = "";
    const OPCAO_ESTUDIO = "opcaoEstudio";
    const OPCAO_MUSICO = "opcaoMusico";
    const [selectedType, setSelectedType] = useState(STRING_VAZIA);
    const navigate = useNavigate();

    function onProceed() {
        if (selectedType === OPCAO_ESTUDIO)
            return navigate("/createStudioAccount");

        if (selectedType === OPCAO_MUSICO)
            return navigate("/");
    };

    const onSelectAccountType = (event) => {
        setSelectedType(event.target.value);
    };

    return (
        <div className="w-screen h-screen bg-white flex items-center justify-center gap-20">
            <div className="flex-container items-center justify-center mb-52">
                <div className="flex justify-center">
                    <p className="p-2 mb-6 h-8 flex items-center font-mono font-bold text-3xl">Criar Conta</p>
                </div>
                <div className="flex bg-slate-900 w-96 h-[1px] mb-16"></div>
                <div className="flex">
                    <p className="p-2 mb-2 h-8 flex items-center font-mono font-bold text-xl">Selecione o perfil</p>
                </div>
                <div className="flex mb-6">
                    <select
                        onChange={onSelectAccountType}
                        className="w-full border border-gray-400 rounded-full p-2"
                    >
                        <option value=""></option>
                        <option value={OPCAO_MUSICO}>Músico</option>
                        <option value={OPCAO_ESTUDIO}>Estúdio</option>
                    </select>
                </div>
                <div className="flex">
                    <button
                        className="w-full bg-slate-500 flex justify-center p-3 rounded-full hover:bg-slate-800 text-2xl font-mono font-bold text-white"
                        onClick={() => onProceed()}>
                        Prosseguir
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChooseAccountType;