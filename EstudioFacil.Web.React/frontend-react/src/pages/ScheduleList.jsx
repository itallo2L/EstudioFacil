import { useEffect, useState } from "react";
import { ModalScheduleDetails } from "../components/ModalScheduleDetails"
import ModalAddStudio from "../components/ModalAddStudio"
import ModalEditStudio from "../components/ModalEditStudio"
import ModalUserSettings from "../components/ModalUserSettings"
import Status from "../components/Status"
import { ChevronLeft, Settings, ArrowDownUp, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";

function ScheduleList() {
    const [studios, setStudios] = useState([
        JSON.parse(localStorage.getItem("studios")) || []
    ]);

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
            ...studio, nomeResponsavel: editedStudio.nomeResponsavel
        } : studio);
        setStudios(listWithUpdatedStudios);
        setIsModalDetailsOpen(false);
    };

    const reloadStudios = async () => {
        try {
            const response = await fetch("https://localhost:7144/api/Agendamento", {
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
                "https://localhost:7144/api/Agendamento",
                {
                    method: "GET",
                }
            );
            const data = await response.json();
            data.sort((a, b) => b.id - a.id);
            setStudios(data);
        };
        fetchStudios();
    }, []);

    const [filter, setFilter] = useState("Todos");
    const [search, setSearch] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [sortBy, setSortBy] = useState("");
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const filteredStudios = studios
        .filter(studio => {
            // Filtro por nomeResponsavel E valorTotal
            const searchMatch = search === "" ||
                studio.nomeResponsavel?.toLowerCase().includes(search.toLowerCase()) ||
                studio.valorTotal?.toString().includes(search);

            let dateMatch = true;
            if (startDate || endDate) {
                const studioDate = studio.dataEHoraDeEntrada;

                if (studioDate) {
                    const studioDateObj = new Date(studioDate);
                    // Ajusta para considerar apenas a data (ignora hora)
                    studioDateObj.setHours(0, 0, 0, 0);

                    const startDateObj = startDate ? new Date(startDate) : null;
                    const endDateObj = endDate ? new Date(endDate) : null;

                    if (startDateObj && endDateObj) {
                        dateMatch = studioDateObj >= startDateObj && studioDateObj <= endDateObj;
                    } else if (startDateObj) {
                        dateMatch = studioDateObj >= startDateObj;
                    } else if (endDateObj) {
                        dateMatch = studioDateObj <= endDateObj;
                    }
                } else {
                    dateMatch = false;
                }
            }

            return searchMatch && dateMatch;
        })
        .sort((a, b) => {
            if (sortBy === "menorPreco") {
                return (a.valorTotal || 0) - (b.valorTotal || 0);
            } else if (sortBy === "maiorPreco") {
                return (b.valorTotal || 0) - (a.valorTotal || 0);
            }
            return new Date(b.dataEHoraDeEntrada) - new Date(a.dataEHoraDeEntrada);
        });

    const handleSortSelect = (sortOption) => {
        setSortBy(sortOption);
        setIsMenuOpen(false);
    };

    const clearDateFilter = () => {
        setStartDate("");
        setEndDate("");
    };

    const clearAllFilters = () => {
        setSearch("");
        setStartDate("");
        setEndDate("");
        setSortBy("");
    };

    const formatNumber = (num) => {
        return num.toString().padStart(2, '0');
    };

    return (
        <div className="w-screen h-screen flex flex-col items-center p-6 ">

            <div className="w-full max-w-6xl bg-white rounded-3xl relative shadow-[0_0_25px#6142FC]">

                <div className="w-full max-w-6xl grid grid-cols-3 items-center p-2 bg-white rounded-t-3xl">
                    <div></div>

                    <h2 className="text-center text-black text-3xl p-2 font-serif">
                        Lista de Agendamentos
                    </h2>

                    <div className="flex justify-end">
                        <button
                            className="bg-[#6142FC] rounded-3xl p-2 me-7 mt-2 border hover:bg-[#7357ff]"
                            onClick={() => onUserSettingsClick()}
                        >
                            <Settings className="text-white" />
                        </button>
                    </div>
                </div>

                <div className="w-full max-w-6xl flex flex-col items-center justify-center p-5 bg-white rounded-b-3xl">
                    <div className="w-full max-w-6xl flex items-center justify-center gap-2 p-2 bg-white rounded-t-3xl">
                        <div className="flex w-full justify-end space-x-2 p-2">
                            <input
                                className="w-full p-2 rounded-3xl border border-[#6142FC] focus:outline-none focus:border-[#6142FC] focus:ring-1 focus:ring-[#6142FC] font-serif"
                                type="text"
                                placeholder="Nome do responsável ou valor total..."
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                            />

                            <div className="flex items-center gap-2">
                                <div className="flex items-center gap-2">
                                    <label className="text-sm text-black font-serif">De:</label>
                                    <input
                                        className="p-2 rounded-3xl border border-[#6142FC] focus:outline-none focus:border-[#6142FC] focus:ring-1 focus:ring-[#6142FC]"
                                        type="date"
                                        value={startDate}
                                        onChange={e => setStartDate(e.target.value)}
                                    />
                                </div>

                                <div className="flex items-center gap-2">
                                    <label className="text-sm text-black font-serif">Até:</label>
                                    <input
                                        className="p-2 rounded-3xl border border-[#6142FC] focus:outline-none focus:border-[#6142FC] focus:ring-1 focus:ring-[#6142FC]"
                                        type="date"
                                        value={endDate}
                                        onChange={e => setEndDate(e.target.value)}
                                        min={startDate}
                                    />
                                </div>

                                {(search || startDate || endDate || sortBy) && (
                                    <button
                                        className="p-2 text-sm text-red-500 hover:text-red-700 font-semibold font-serif"
                                        onClick={clearAllFilters}
                                    >
                                        Limpar Filtros
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="w-full max-w-6xl flex justify-end p-2">
                        <div className="relative">
                            <button
                                className="flex items-center gap-2 bg-[#6142FC] text-white px-4 py-2 rounded-3xl hover:bg-[#7357ff] font-serif"
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                            >
                                <ArrowDownUp size={16} />
                                Ordenar
                            </button>
                            {isMenuOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                                    <button
                                        className="block w-full text-left px-4 py-2 hover:bg-gray-100 font-serif"
                                        onClick={() => handleSortSelect("menorPreco")}
                                    >
                                        Menor Preço
                                    </button>
                                    <button
                                        className="block w-full text-left px-4 py-2 hover:bg-gray-100 font-serif"
                                        onClick={() => handleSortSelect("maiorPreco")}
                                    >
                                        Maior Preço
                                    </button>
                                    <button
                                        className="block w-full text-left px-4 py-2 hover:bg-gray-100 font-serif"
                                        onClick={() => handleSortSelect("")}
                                    >
                                        Limpar Ordenação
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="w-full max-w-6xl bg-white rounded-3xl overflow-hidden shadow-[0_0_25px#4D4D4D]">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="bg-[#6142FC] text-white font-serif">
                                    <th className="p-3 text-center">Responsável</th>
                                    <th className="p-3 text-center">Data de Entrada</th>
                                    <th className="p-3 text-center">Valor Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredStudios.map((studio, index) => (
                                    <tr
                                        key={studio.id}
                                        className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                                            } border-b border-gray-200 hover:bg-[#8c77f7] hover:text-white cursor-pointer transition-colors`}
                                        onClick={() => onSeeDetailsClick(studio)}
                                    >
                                        <td className="p-3 font-serif font-semibold text-center">{studio.nomeResponsavel}</td>
                                        <td className="p-3 text-center font-medium">
                                            {new Date(studio.dataEHoraDeEntrada).toLocaleDateString('pt-BR')}
                                        </td>
                                        <td className="p-3 font-medium text-center text-green-700">R$ {studio.valorTotal},00</td>
                                    </tr>
                                ))}

                                <tr>
                                    <td colSpan="3" className="p-0">
                                        <div className="bg-[#6142FC] border-gray-300 rounded-b-3xl p-3">
                                            <div className="flex justify-center items-center gap-2 font-serif font-semibold">
                                                <span className="text-white font-black">
                                                    Total: {formatNumber(filteredStudios.length)} / {formatNumber(studios.length)}
                                                </span>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <ModalScheduleDetails isOpen={isModalDetailsOpen}
                        studio={selectedStudio}
                        closeModal={() => setIsModalDetailsOpen(false)}
                        onReloadStudios={reloadStudios}
                        onEditStudioClick={onEditStudioClick}>
                    </ModalScheduleDetails>
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
                        closeModal={() => setIsModalSettingsOpen(false)}
                        isMusicianUSer={false}>
                    </ModalUserSettings>
                </div>
            </div>

        </div>
    );
};

export default ScheduleList;