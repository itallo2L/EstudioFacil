import { useEffect, useState } from "react";
import { ModalDetails } from "../components/ModalDetails"
import ModalAddStudio from "../components/ModalAddStudio"
import ModalEditStudio from "../components/ModalEditStudio"
import ModalUserSettings from "../components/ModalUserSettings"
import Status from "../components/Status"
import { ChevronLeft, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";

function StudioList() {
    const [studios, setStudios] = useState([
        JSON.parse(localStorage.getItem("studios")) || []
    ]);

    const navigate = useNavigate();

    function onReturnToHome() {
        navigate("/");
    };

    function onUserSettingsClick() {
        setIsModalSettingsOpen(true);
    };

    const [isModalDetailsOpen, setIsModalDetailsOpen] = useState(false);
    const [isModalAdditionOpen, setIsModalAdditionOpen] = useState(false);
    const [isModalEditOpen, setIsModalEditOpen] = useState(false);
    const [isModalSettingsOpen, setIsModalSettingsOpen] = useState(false);
    const [selectedStudio, setSelectedStudio] = useState(null);

    function onSeeDetailsClick(studio) {
        setSelectedStudio(studio);
        setIsModalDetailsOpen(true);
    };

    function onAddStudioClick() {
        setIsModalAdditionOpen(true);
    };

    function onEditStudioClick() {
        setIsModalEditOpen(true);
    };

    const addStudioToList = (newStudio) => {
        setStudios(prevStudios => [newStudio, ...prevStudios]);
    };

    const updatedStudioList = (editedStudio) => {
        const listWithUpdatedStudios = studios.map(studio => studio.id === editedStudio.id ? {
            ...studio, nome: editedStudio.nome, estaAberto: editedStudio.estaAberto
        } : studio);
        setStudios(listWithUpdatedStudios);
        setIsModalDetailsOpen(false);
    };

    const deleteStudioFromList = (deletedStudio) => {
        const newStudioList = studios.filter(studio => studio.id !== deletedStudio.id);
        setStudios(newStudioList);
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
            const estudiosAbertos = data.filter(x => x.estaAberto == true);
            estudiosAbertos.sort((a, b) => b.id - a.id);
            setStudios(estudiosAbertos);
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

            <div className="w-full max-w-6xl bg-[#191919] rounded-3xl relative shadow-[0_0_25px#6142FC]">

                <div className="w-full max-w-6xl flex justify-between items-center p-2 bg-[#191919] rounded-t-3xl relative">
                    <button
                        className="bg-[#191919] rounded-3xl p-2 ms-7 mt-2 border border-[#191919] hover:border-[#6142FC]"
                        onClick={() => onReturnToHome()}
                    >
                        <ChevronLeft className="text-white hover:text-[#6142FC]" />
                    </button>

                    <h2 className="absolute left-1/2 -translate-x-1/2 text-white text-4xl mt-2 font-bold">
                        <p className="w-full items-start p-2 font-bold text-3xl text-white">Lista de Estúdios ({filteredStudios.length})</p>
                    </h2>

                    <button
                        className="bg-[#191919] rounded-3xl p-2 me-7 mt-2 border border-[#191919] hover:border-[#6142FC]"
                        onClick={() => onUserSettingsClick()}
                    >
                        <Settings className="text-white hover:text-[#6142FC]" />
                    </button>
                </div>

                <div className="w-full max-w-6xl flex flex-col items-center justify-center p-5 bg-[#191919] rounded-b-3xl">
                    <div className="w-full max-w-6xl flex items-center justify-center gap-2 p-2 bg-[#191919] rounded-t-3xl">
                        <div className="flex w-full justify-end space-x-2 p-2 ">
                            <input
                                className="w-full p-2 rounded-3xl border border-gray-400"
                                type="text"
                                placeholder="Nome do estúdio..."
                                value={search}
                                onChange={e => setSearch(e.target.value)} />

                        </div>
                    </div>

                    <ul className="w-full max-w-6xl bg-[#191919] p-2 rounded-b-3xl">
                        {filteredStudios.map(studio => (
                            <li key={studio.id} className="flex p-1">
                                <div className="w-full flex flex-col items-center bg-[#2F2F2F] p-2 rounded-3xl hover:bg-[#24032E] 
                                            border border-[#6142FC] shadow-[0_0_5px_#6142FC]"
                                    onClick={() => onSeeDetailsClick(studio)}>
                                    <p className="text-xl text-white font-bold rounded-s-md">{studio.nome}</p>
                                    <Status isOpenStudioOnList={studio.estaAberto}></Status>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <ModalDetails isOpen={isModalDetailsOpen}
                        studio={selectedStudio}
                        closeModal={() => setIsModalDetailsOpen(false)}
                        onStudioDelete={deleteStudioFromList}
                        onReloadStudios={reloadStudios}
                        onEditStudioClick={onEditStudioClick}>
                    </ModalDetails>
                    <ModalAddStudio
                        isOpen={isModalAdditionOpen}
                        closeModal={() => setIsModalAdditionOpen(false)}
                        onStudioAdded={addStudioToList}
                        onReloadStudios={reloadStudios}>
                    </ModalAddStudio>
                    <ModalEditStudio
                        isOpen={isModalEditOpen}
                        studio={selectedStudio}
                        closeModal={() => setIsModalEditOpen(false)}
                        onStudioEdited={updatedStudioList}>
                    </ModalEditStudio>
                    <ModalUserSettings
                        isOpen={isModalSettingsOpen}
                        closeModal={() => setIsModalSettingsOpen(false)}>
                    </ModalUserSettings>
                </div>
            </div>

        </div>
    );
};

export default StudioList;