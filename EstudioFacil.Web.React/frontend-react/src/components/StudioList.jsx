import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronRightIcon } from "lucide-react";

function StudioList() {
    const [studios, setStudios] = useState([
        JSON.parse(localStorage.getItem("studios")) || []
    ]);

    const navigate = useNavigate();

    function onSeeDetailsClick(studio) {
        navigate(`/studio-details?id=${studio.id}`);
    };

    useEffect(() => {
        localStorage.setItem("studios", JSON.stringify(studios));
    }, [studios]);

    useEffect(() => {
        //Chamando a API
        const fetchStudios = async () => {
            const response = await fetch(
                "https://localhost:7144/api/EstudioMusical",
                {
                    method: "GET",
                }
            );
            //Obtendo os dados que a API retorna
            const data = await response.json();

            //Armazenar/Persistir os dados no state:
            setStudios(data);
        };
        fetchStudios();
    }, []);

    const [filter, setFilter] = useState("Todos");

    const [search, setSearch] = useState("");

    const filteredStudios = studios.filter(studio => {
        const statusMatch =
            filter === "Todos" ||
            (filter === "Aberto" && studio.estaAberto) ||
            (filter === "Fechado" && !studio.estaAberto);

        const searchMatch = studio.nome?.toLowerCase().includes(search.toLowerCase());

        return statusMatch && searchMatch;
    });


    return (
        <div className="w-screen h-screen flex flex-col items-center p-6">

            {/* Cabeçalho fixo no topo */}
            <div className="w-full max-w-6xl flex items-center justify-center p-2 bg-slate-200 rounded-t-lg">
                <h2 className="text-4xl mt-2 font-bold">Agendamento em Estúdio</h2>
            </div>

            {/* Conteúdo abaixo */}
            <div className="w-full max-w-6xl flex flex-col items-center justify-center p-5 bg-slate-200 rounded-b-lg">
                <div className="w-full max-w-6xl flex items-center justify-center gap-2 p-2 bg-slate-200 rounded-t-xl">
                    <text
                        className="w-full items-start p-2 font-bold text-3xl">Lista de Estúdios ({filteredStudios.length})</text>
                    <div className="flex w-full justify-end space-x-2 p-2 ">
                        <select
                            className="p-2 rounded-md font-bold"
                            value={filter}
                            onChange={e => setFilter(e.target.value)}>
                            <option value="Todos">Todos</option>
                            <option value="Aberto">Aberto</option>
                            <option value="Fechado">Fechado</option>
                        </select>

                        <input
                            className="w-full p-2 rounded-md"
                            type="text"
                            placeholder="Nome do estúdio..."
                            value={search}
                            onChange={e => setSearch(e.target.value)} />

                        <button
                            className="bg-slate-400 text-white p-2 rounded-md"
                            onClick={() => alert("Abrir modal de cadastro")}>
                            Adicionar
                        </button>
                    </div>
                </div>

                <ul className="w-full max-w-6xl bg-slate-200 p-2 rounded-b-xl">
                    {filteredStudios.map(studio => (
                        <li key={studio.id} className="flex p-1">
                            {/* Nome do estúdio */}
                            <div className="w-full flex flex-col items-start bg-slate-300 p-2 rounded-s-md">
                                <text className="text-xl font-bold rounded-s-md">{studio.nome}</text>
                                <text>{studio.estaAberto ? "Aberto" : "Fechado"}</text>
                            </div>
                            <button className="bg-slate-300 p-2 rounded-e-md"
                                onClick={() => onSeeDetailsClick(studio)}>
                                <ChevronRightIcon />
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default StudioList;