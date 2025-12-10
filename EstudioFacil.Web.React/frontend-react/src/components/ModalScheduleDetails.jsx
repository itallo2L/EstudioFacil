import { X, Phone, MapPin, AlertTriangle } from "lucide-react";
import { useState } from "react";

export function ModalScheduleDetails({ isOpen, schedule, closeModal, onSuccess, onError, onScheduleRemoved }) {
    const [studioLogged, setStudioLogged] = useState(JSON.parse(localStorage.getItem("studioLogged")) || {});
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [isCancelling, setIsCancelling] = useState(false); // Para mostrar loading durante o cancelamento

    const formatarDataParaBR = (dataISO) => {
        if (!dataISO) return '';
        const data = new Date(dataISO);
        const dia = String(data.getDate()).padStart(2, '0');
        const mes = String(data.getMonth() + 1).padStart(2, '0'); // Janeiro é 0
        const ano = data.getFullYear();
        return `${dia}/${mes}/${ano}`;
    };

    const formatarHoraParaBR = (dataISO) => {
        if (!dataISO) return '';
        const data = new Date(dataISO);
        const horas = String(data.getHours()).padStart(2, '0');
        const minutos = String(data.getMinutes()).padStart(2, '0');
        return `${horas}:${minutos}`;
    };

    if (!isOpen)
        return null;
    else
        formatarDataHora();

    function formatarDataHora() {
        schedule = {
            ...schedule,
            // Formata data para dd/mm/yyyy
            dataFormatada: schedule.dataEHoraDeEntrada
                ? formatarDataParaBR(schedule.dataEHoraDeEntrada)
                : '',
            // Formata hora de entrada para hh:mm
            horaEntradaFormatada: schedule.dataEHoraDeEntrada
                ? formatarHoraParaBR(schedule.dataEHoraDeEntrada)
                : '',
            // Formata hora de saída para hh:mm
            horaSaidaFormatada: schedule.dataEHoraDeSaida
                ? formatarHoraParaBR(schedule.dataEHoraDeSaida)
                : ''
        };
    };

    function TelefoneFormatado({ telefone }) {
        const formatarTelefone = (numero) => {
            if (!numero) return '';
            const numeros = numero.replace(/\D/g, '');
            if (numeros.length === 11) {
                return `(${numeros.substring(0, 2)}) ${numeros.substring(2, 7)}-${numeros.substring(7)}`;
            } else if (numeros.length === 10) {
                return `(${numeros.substring(0, 2)}) ${numeros.substring(2, 6)}-${numeros.substring(6)}`;
            }
            return numero;
        };
        return <span className="text-gray-700">{formatarTelefone(telefone)}</span>;
    };

    function textoRoxo(texto) {
        return <span className="text-[#6142FC]">{texto}</span>;
    };

    function textoVerde(texto) {
        return <span className="text-green-600">{texto}</span>;
    };

    function cancelSchedule() {
        setShowConfirmModal(true);
    };

    function removerScheduleDoLocalStorage() {
        const schedules = JSON.parse(localStorage.getItem("schedules")) ?? [];
        const newScheduleList = schedules.filter(s => s.id != schedule.id);
        localStorage.setItem("schedules", JSON.stringify(newScheduleList));
    };

    // Função para confirmar o cancelamento
    async function confirmarCancelamento() {
        setIsCancelling(true);
        try {
            const response = await fetch(`https://localhost:7144/api/Agendamento/${schedule.id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (response.ok) {
                onSuccess('Agendamento cancelado com sucesso!');
                removerScheduleDoLocalStorage();
                setShowConfirmModal(false);
                if (onScheduleRemoved)
                    onScheduleRemoved(schedule.id);
                closeModal();
            } else {
                const error = await response.text();
                onError(`Erro ao excluir: ${error}`);
                setShowConfirmModal(false);
            }
        } catch (error) {
            console.error('Erro:', error);
            onError('Erro ao conectar com o servidor.');
            setShowConfirmModal(false);
        } finally {
            setIsCancelling(false);
        }
    };

    // Função para cancelar a ação e fechar a modal
    function cancelarAcao() {
        setShowConfirmModal(false);
    };


    const ConfirmModal = () => {
        if (!showConfirmModal) return null;

        return (
            <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
                <div className="bg-white rounded-2xl w-[400px] p-8 relative">
                    {/* Botão X no canto superior direito - POSIÇÃO ABSOLUTA */}
                    <button
                        onClick={cancelarAcao}
                        disabled={isCancelling}
                        className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition"
                    >
                        ×
                    </button>

                    <div className="flex flex-col items-center text-center">
                        {/* Ícone de alerta */}
                        <div className="mb-4 p-3 bg-red-100 rounded-full">
                            <AlertTriangle size={48} className="text-red-600" />
                        </div>

                        {/* Título */}
                        <h2 className="text-xl font-bold mb-2">Confirmar Cancelamento</h2>

                        {/* Mensagem */}
                        <p className="text-gray-600 mb-6">
                            Tem certeza que deseja cancelar este agendamento? Esta ação não pode ser desfeita.
                        </p>

                        {/* Detalhes do agendamento (opcional) */}
                        <div className="bg-gray-50 p-4 rounded-lg w-full mb-6">
                            <p className="font-medium text-gray-800">{studioLogged.nome}</p>
                            <p className="text-sm text-gray-600 mt-1">
                                {schedule.dataFormatada} • {schedule.horaEntradaFormatada} - {schedule.horaSaidaFormatada}
                            </p>
                            <p className="text-sm font-medium text-gray-800 mt-2">
                                Valor: R$ {schedule.valorTotal},00
                            </p>
                        </div>

                        {/* Botões de ação */}
                        <div className="flex gap-3 w-full">
                            <button
                                onClick={cancelarAcao}
                                disabled={isCancelling}
                                className="flex-1 bg-gray-200 text-gray-800 font-medium py-3 hover:bg-gray-300 transition disabled:opacity-50 rounded-full"
                            >
                                Voltar
                            </button>

                            <button
                                onClick={confirmarCancelamento}
                                disabled={isCancelling}
                                className="flex-1 bg-red-600 text-white font-medium py-3 rounded-full hover:bg-red-700 transition flex items-center justify-center gap-2 disabled:opacity-50"
                            >
                                {isCancelling ? (
                                    <>
                                        <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></span>
                                        Cancelando...
                                    </>
                                ) : (
                                    "Cancelar"
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <>
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-2xl w-[450px] p-8 relative">
                    <button
                        onClick={closeModal}
                        className="absolute top-4 right-4 border border-[#6142FC] bg-[#6142FC] text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-[#7357ff] transition"
                    >
                        <X size={18} />
                    </button>

                    {/* Título principal */}
                    <h1 className="text-2xl font-bold text-center mb-2">Agendamento</h1>
                    <div className="border-t border-gray-400 my-2"></div>

                    {/* Subtítulo */}
                    <h2 className="text-lg font-semibold text-center text-gray-700 mb-6">
                        <span className="text-[#6142FC]">{studioLogged.nome}</span>
                    </h2>

                    {/* Descrição do estúdio */}
                    <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                        {/* <h1 className="text-2xl font-bold text-center mb-2">{`Horário agendado por ${textoRoxo(schedule.nomeResponsavel)} para o dia ${schedule.dataFormatada} de ${schedule.horaEntradaFormatada} até ${schedule.horaSaidaFormatada} com valor total de R$ ${schedule.valorTotal},00`}</h1> */}
                        <h1 className="text-2xl font-bold text-center mb-2">
                            Horário agendado por {textoRoxo(schedule.nomeResponsavel)} para o dia {schedule.dataFormatada} de {schedule.horaEntradaFormatada} até {schedule.horaSaidaFormatada} com valor total de {textoVerde(`R$ ${schedule.valorTotal},00`)}
                        </h1>
                        {/* Informações de contato */}
                        <div className="mt-4 space-y-2">
                            <div className="flex items-center gap-2 text-sm">
                                <Phone size={14} className="text-gray-500" />
                                <span className="font-medium">Telefone para contato:</span>
                                <TelefoneFormatado telefone={schedule.telefone} />
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                                <MapPin size={14} className="text-gray-500" />
                                <span className="font-medium">Endereço:</span>
                                <span className="text-gray-700">{schedule.endereco}</span>
                            </div>
                        </div>
                    </div>

                    {/* Formulário de agendamento */}
                    <div className="space-y-5">
                        {/* Linha divisória */}

                        {/* Botões */}
                        <div className="flex gap-3 pt-2">
                            <button
                                onClick={cancelSchedule}
                                className="flex-1 bg-[#6142FC] text-white font-medium py-3 rounded-3xl hover:bg-[#7357ff] transition flex items-center justify-center gap-2"
                            >
                                Cancelar Agendamento
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <ConfirmModal />
        </>
    );
}