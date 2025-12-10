import { useEffect, useState } from "react";
import { ModalDetails } from "../components/ModalDetails"
import ModalAddStudio from "../components/ModalAddStudio"
import ModalEditStudio from "../components/ModalEditStudio"
import ModalUserSettings from "../components/ModalUserSettings"
import Status from "../components/Status"
import { ChevronLeft, Settings, ArrowDownUp, Calendar } from "lucide-react";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function StudioList() {
    const [studios, setStudios] = useState([
        JSON.parse(localStorage.getItem("studios")) || []
    ]);

    const showSuccessToast = (message = 'Agendamento realizado com sucesso!') => {
        toast.success(message);
    };

    const showErrorToast = (message) => {
        toast.error(message);
    };

    function salvarAgendamento() {

    };

    function onUserSettingsClick() {
        setIsModalSettingsOpen(true);
    };

    const [isModalDetailsOpen, setIsModalDetailsOpen] = useState(false);
    const [isModalAdditionOpen, setIsModalAdditionOpen] = useState(false);
    const [isModalEditOpen, setIsModalEditOpen] = useState(false);
    const [isModalSettingsOpen, setIsModalSettingsOpen] = useState(false);
    const [selectedStudio, setSelectedStudio] = useState(null);
    const [haveAgendamento, setHaveAgendamento] = useState(null);

    const checkAgendamento = async (studio) => {
        try {
            const usuarioLogged = JSON.parse(localStorage.getItem("user"));
            const auxiliar = {
                nomeDoResponsavel: usuarioLogged.nomeDoResponsavel,
                idDoEstudio: studio.id
            };

            const response = await fetch(
                `https://localhost:7144/api/Agendamento/obter-agendamento-por-estudio`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(auxiliar),
            });

            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Erro ao verificar agendamento:", error);
            return { possuiAgendamento: false };
        }
    };

    // Função modificada para verificar agendamento ao clicar
    const onSeeDetailsClick = async (studio) => {
        setSelectedStudio(studio);
        const agendamento = await checkAgendamento(studio);
        (agendamento.nomeResponsavel == 'Não há agendamentos')
            ? setHaveAgendamento(false)
            : setHaveAgendamento(true);

        setIsModalDetailsOpen(true);
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
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [sortBy, setSortBy] = useState("");
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const filteredStudios = studios
        .filter(studio => {
            const statusMatch =
                filter === "Todos" ||
                (filter === "Aberto" && studio.estaAberto) ||
                (filter === "Fechado" && !studio.estaAberto);

            const searchMatch = studio.nome?.toLowerCase().includes(search.toLowerCase());

            // Filtro por range de data
            let dateMatch = true;
            if (startDate || endDate) {
                // Assumindo que o studio tenha uma propriedade 'dataCriacao', 'dataAgendamento', etc.
                const studioDate = studio.dataCriacao || studio.dataAgendamento || studio.data;

                if (studioDate) {
                    const studioDateObj = new Date(studioDate);
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
                    // Se não houver data no studio, não mostra no filtro
                    dateMatch = false;
                }
            }

            return statusMatch && searchMatch && dateMatch;
        })
        .sort((a, b) => {
            // Ordenação por preço
            if (sortBy === "menorPreco") {
                return (a.preco || 0) - (b.preco || 0);
            } else if (sortBy === "maiorPreco") {
                return (b.preco || 0) - (a.preco || 0);
            }
            return 0;
        });

    const handleSortSelect = (sortOption) => {
        setSortBy(sortOption);
        setIsMenuOpen(false);
    };

    const clearDateFilter = () => {
        setStartDate("");
        setEndDate("");
    };

    return (
        <div className="w-screen h-screen flex flex-col items-center p-6 font-serif">
            <ToastContainer />
            <div className="w-full max-w-6xl bg-white rounded-3xl relative shadow-[0_0_25px#6142FC]">

                <div className="w-full max-w-6xl grid grid-cols-3 items-center p-2 bg-white rounded-t-3xl">
                    {/* Espaço vazio */}
                    <div></div>

                    {/* Título centralizado */}
                    <h2 className="text-center text-black text-3xl p-2">
                        Lista de Estúdios ({filteredStudios.length})
                    </h2>

                    {/* Botão alinhado à direita */}
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
                            {/* Input de pesquisa */}
                            <input
                                className="w-full p-2 rounded-3xl border border-[#6142FC] focus:outline-none focus:border-[#6142FC] focus:ring-1 focus:ring-[#6142FC]"
                                type="text"
                                placeholder="Nome do estúdio..."
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                            />

                            <div className="flex items-center gap-2">
                                <div className="flex items-center gap-2">
                                    <label className="text-sm text-black">De:</label>
                                    <input
                                        className="p-2 rounded-3xl border border-[#6142FC] focus:outline-none focus:border-[#6142FC] focus:ring-1 focus:ring-[#6142FC]"
                                        type="date"
                                        value={startDate}
                                        onChange={e => setStartDate(e.target.value)}
                                    />
                                </div>

                                <div className="flex items-center gap-2">
                                    <label className="text-sm text-black">Até:</label>
                                    <input
                                        className="p-2 rounded-3xl border border-[#6142FC] focus:outline-none focus:border-[#6142FC] focus:ring-1 focus:ring-[#6142FC]"
                                        type="date"
                                        value={endDate}
                                        onChange={e => setEndDate(e.target.value)}
                                        min={startDate} // Impede selecionar data final anterior à inicial
                                    />
                                </div>

                                {(startDate || endDate) && (
                                    <button
                                        className="p-2 text-sm text-red-500 hover:text-red-700 font-semibold"
                                        onClick={clearDateFilter}
                                    >
                                        Limpar
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="w-full max-w-6xl flex items-end justify-end p-2">
                        {/* MenuButton de ordenação */}
                        <div className="relative">
                            <button
                                className="flex items-end justify-end gap-2 bg-[#6142FC] text-white px-4 py-2 rounded-3xl border border-[#6142FC] hover:bg-[#7357ff] transition-colors"
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                            >
                                <ArrowDownUp size={18} />
                                <span>Ordenar</span>
                            </button>

                            {isMenuOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-[#6142FC] z-10">
                                    <button
                                        className="w-full text-left px-4 py-2 hover:bg-[#6142FC] hover:text-white rounded-t-lg transition-colors"
                                        onClick={() => handleSortSelect("menorPreco")}
                                    >
                                        Menor valor
                                    </button>
                                    <button
                                        className="w-full text-left px-4 py-2 hover:bg-[#6142FC] hover:text-white rounded-b-lg transition-colors"
                                        onClick={() => handleSortSelect("maiorPreco")}
                                    >
                                        Maior valor
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

                    <ul className="w-full max-w-6xl bg-white p-2 rounded-b-3xl">
                        {filteredStudios.map(studio => (
                            <li key={studio.id} className="flex p-1">
                                <div className="w-full flex flex-col items-center bg-white p-2 rounded-3xl hover:bg-[#8c77f7] 
                                            border border-[#6142FC] shadow-[0_0_5px_#6142FC]"
                                    onClick={() => onSeeDetailsClick(studio)}>
                                    <p className="text-xl text-black font-bold rounded-s-md">{studio.nome}</p>
                                    <Status isOpenStudioOnList={studio.estaAberto}></Status>
                                    {/* Exibir preço se existir */}
                                    {studio.preco && (
                                        <p className="text-black mt-1 font-semibold">
                                            R$ {studio.preco.toFixed(2)}
                                        </p>
                                    )}
                                    {/* Exibir data se existir */}
                                    {(studio.dataCriacao || studio.dataAgendamento || studio.data) && (
                                        <p className="text-sm text-gray-600 mt-1">
                                            {new Date(studio.dataCriacao || studio.dataAgendamento || studio.data).toLocaleDateString('pt-BR')}
                                        </p>
                                    )}
                                </div>
                            </li>
                        ))}
                    </ul>
                    <ModalDetails isOpen={isModalDetailsOpen}
                        studio={selectedStudio}
                        closeModal={() => setIsModalDetailsOpen(false)}
                        hasAgendamento={haveAgendamento}
                        onSuccess={() => showSuccessToast()}
                        onError={(message) => showErrorToast(message)}>
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
                        closeModal={() => setIsModalSettingsOpen(false)}
                        isMusicianUSer={true}>
                    </ModalUserSettings>
                </div>
            </div>

        </div>
    );
};

export default StudioList;