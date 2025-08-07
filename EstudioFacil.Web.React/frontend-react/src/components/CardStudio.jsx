import { useNavigate } from "react-router-dom";

function CardStudio() {

    const navigate = useNavigate();

    function onOpenStudioList() {
        navigate("/studio");
    };

    return (
        <div className="w-screen h-screen bg-slate-200 flex items-center justify-center gap-20">
            <button
                className="max-w-96 bg-slate-400 flex p-28 rounded-3xl hover:bg-slate-600 text-4xl font-bold"
                onClick={() => onOpenStudioList()}>
                Estúdios
            </button>
            <button className="max-w-96 bg-slate-400 items-center justify-center flex p-28 rounded-3xl hover:bg-slate-600 text-4xl font-bold">
                Agendamentos
            </button>
        </div>
    );
};

export default CardStudio;