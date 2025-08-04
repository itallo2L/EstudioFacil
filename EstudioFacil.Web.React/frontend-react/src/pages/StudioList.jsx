import { useEffect, useState } from "react";
import { ModalDetails } from "../components/ModalDetails"
import ModalAddStudio from "../components/ModalAddStudio"
import Status from "../components/Status"

function StudioList() {
    const [studios, setStudios] = useState([
        JSON.parse(localStorage.getItem("studios")) || []
    ]);

    const [isModalDetailsOpen, setIsModalDetailsOpen] = useState(false);
    const [isModalAdditionOpen, setIsModalAdditionOpen] = useState(false);
    const [selectedStudio, setSelectedStudio] = useState(null);

    function onSeeDetailsClick(studio) {
        setSelectedStudio(studio);
        setIsModalDetailsOpen(true);
    };

    function onAddStudioClick() {
        setIsModalAdditionOpen(true);
    };

    const addStudioToList = (newStudio) => {
        setStudios(prevStudios => [newStudio, ...prevStudios]);
    };

    const reloadStudios = async () => {
        try {
            const response = await fetch("https://localhost:7144/api/EstudioMusical", {
                method: "GET",
            });
            const data = await response.json();
            setStudios(data);
        } catch (error) {
            console.error("Erro ao recarregar estúdios:", error);
        };
    };

    useEffect(() => {
        localStorage.setItem("studios", JSON.stringify(studios));
    }, [studios]);

    useEffect(() => {
        const fetchStudios = async () => {
            const response = await fetch(
                "https://localhost:7144/api/EstudioMusical",
                {
                    method: "GET",
                }
            );
            const data = await response.json();

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

            <div className="w-full max-w-6xl flex items-center justify-center p-2 bg-slate-200 rounded-t-lg">
                <h2 className="text-4xl mt-2 font-bold">Agendamento em Estúdio</h2>
            </div>

            <div className="w-full max-w-6xl flex flex-col items-center justify-center p-5 bg-slate-200 rounded-b-lg">
                <div className="w-full max-w-6xl flex items-center justify-center gap-2 p-2 bg-slate-200 rounded-t-xl">
                    <p
                        className="w-full items-start p-2 font-bold text-3xl">Lista de Estúdios ({filteredStudios.length})</p>
                    <div className="flex w-full justify-end space-x-2 p-2 ">
                        <select
                            className="p-2 rounded-md font-bold border border-gray-400"
                            value={filter}
                            onChange={e => setFilter(e.target.value)}>
                            <option value="Todos">Todos</option>
                            <option value="Aberto">Aberto</option>
                            <option value="Fechado">Fechado</option>
                        </select>

                        <input
                            className="w-full p-2 rounded-md border border-gray-400"
                            type="text"
                            placeholder="Nome do estúdio..."
                            value={search}
                            onChange={e => setSearch(e.target.value)} />

                        <button
                            className="bg-slate-400 text-white p-2 rounded-md hover:bg-slate-500 w-40"
                            onClick={() => onAddStudioClick()}>
                            Adicionar
                        </button>
                    </div>
                </div>

                <ul className="w-full max-w-6xl bg-slate-200 p-2 rounded-b-xl">
                    {filteredStudios.map(studio => (
                        <li key={studio.id} className="flex p-1">
                            <div className="w-full flex flex-col items-start bg-slate-300 p-2 rounded-md hover:bg-slate-500"
                                onClick={() => onSeeDetailsClick(studio)}>
                                <p className="text-xl font-bold rounded-s-md">{studio.nome}</p>
                                <Status isOpenStudioOnList={studio.estaAberto}></Status>
                            </div>
                        </li>
                    ))}
                </ul>
                <ModalDetails isOpen={isModalDetailsOpen}
                    studio={selectedStudio}
                    closeModal={() => setIsModalDetailsOpen(false)}>
                </ModalDetails>
                <ModalAddStudio
                    isOpen={isModalAdditionOpen}
                    closeModal={() => setIsModalAdditionOpen(false)}
                    onStudioAdded={addStudioToList}
                    onReloadStudios={reloadStudios}>
                </ModalAddStudio>
            </div>
        </div>
    );
};

export default StudioList;