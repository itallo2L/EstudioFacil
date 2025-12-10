import { X, Phone, MapPin, Clock } from "lucide-react";
import { toast, ToastContainer } from 'react-toastify';
import { useState } from "react";

export function ModalDetails({ isOpen, studio, closeModal, hasAgendamento, onSuccess, onError }) {
    const [firstValue, setFirstValue] = useState('');
    const [secondValue, setSecondValue] = useState('');
    const [totalValue, setTotalValue] = useState('');
    const [scheduleDate, setScheduleDate] = useState('');
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
    const [agendamentoAtual, setagendamentoAtual] = useState(JSON.parse(localStorage.getItem("agendamentoAtual")));
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

    const onSelectFirstValue = (event) => {
        const value = parseInt(event.target.value);
        setFirstValue(value);
        if (secondValue) {
            calcularValorTotal(value, secondValue);
        }
    };

    const onSelectSecondValue = (event) => {
        const value = parseInt(event.target.value);
        setSecondValue(value);
        if (firstValue) {
            calcularValorTotal(firstValue, value);
        }
    };

    const calcularValorTotal = (inicio, fim) => {
        const diferenca = fim - inicio;
        const calculoFinal = diferenca * studio.valorDaHora;
        setTotalValue(`R$ ${calculoFinal},00`);
    };

    const obterData = (event) => {
        setScheduleDate(event.target.value);
    };

    // Função para formatar a data e hora para o formato ISO
    const formatarDataHora = (data, hora) => {
        if (!data || !hora) return '';

        // Converte hora (8, 9, 10...) para formato HH:00:00
        const horaFormatada = hora.toString().padStart(2, '0') + ':00:00';

        // Retorna no formato ISO: yyyy-mm-ddTHH:mm:ss
        return `${data}T${horaFormatada}`;
    };

    function extrairNumeroMonetario(valor) {
        // Remove "R$" e espaços, depois divide pela vírgula
        const partes = valor.replace('R$', '').trim().split(',');
        return parseInt(partes[0].replace(/\./g, '')) || 0;
    };

    async function adicionarAgendamento() {
        if (!scheduleDate || !firstValue || !secondValue) {
            // Usa a função de erro passada por prop
            onError('Por favor, preencha todos os campos: data, horário de entrada e horário de saída.');
            return;
        }

        if (secondValue <= firstValue) {
            onError('O horário de saída deve ser maior que o horário de entrada.');
            return;
        }

        const valorTotal = extrairNumeroMonetario(totalValue);

        const dados = {
            nomeResponsavel: user.nomeDoResponsavel,
            cpfResponsavel: user.cpf,
            dataEHoraDeEntrada: formatarDataHora(scheduleDate, firstValue),
            dataEHoraDeSaida: formatarDataHora(scheduleDate, secondValue),
            valorTotal: valorTotal,
            idEstudio: studio.id
        };

        console.log('Dados enviados:', dados);

        try {
            const response = await fetch("https://localhost:7144/api/Agendamento", {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dados)
            });

            if (response.ok) {
                // Usa a função de sucesso passada por prop
                onSuccess('Agendamento realizado com sucesso!');

                // Fecha o modal e limpa os campos
                closeModal();
                setFirstValue('');
                setSecondValue('');
                setTotalValue('');
                setScheduleDate('');
            } else {
                const error = await response.text();
                onError(`Erro ao agendar: ${error}`);
            }
        } catch (error) {
            console.error('Erro:', error);
            onError('Erro ao conectar com o servidor.');
        }
    };

    function cancelSchedule() {
        return excluirAgendamento();
    };

    async function excluirAgendamento() {
        try {
            const response = await fetch(`https://localhost:7144/api/Agendamento/${agendamentoAtual.id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (response.ok) {
                onSuccess('Agendamento cancelado com sucesso!');
                localStorage.removeItem("agendamentoAtual");
                setFirstValue('');
                setSecondValue('');
                setTotalValue('');
                setScheduleDate('');
                closeModal();
            } else {
                const error = await response.text();
                onError(`Erro ao excluir: ${error}`);
            }
        } catch (error) {
            console.error('Erro:', error);
            onError('Erro ao conectar com o servidor.');
        }
    };

    function onSave() {
        adicionarAgendamento();
    };

    if (!isOpen) return null;

    if (!hasAgendamento) {
        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-2xl w-[450px] p-8 relative">
                    <button
                        onClick={closeModal}
                        className="absolute top-4 right-4 border border-[#6142FC] bg-[#6142FC] text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-[#7357ff] transition"
                    >
                        <X size={18} />
                    </button>

                    <h1 className="text-2xl font-bold text-center mb-2">Agendamento</h1>
                    <h2 className="text-lg font-semibold text-center text-gray-700 mb-6">
                        Agendar horário em <span className="text-[#6142FC]">{studio.nome}</span>
                    </h2>

                    <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                        <h3 className="text-sm font-semibold mb-2">Descrição:</h3>
                        <p className="text-sm text-gray-600 leading-relaxed">
                            {studio.descricao}
                        </p>

                        <div className="mt-4 space-y-2">
                            <div className="flex items-center gap-2 text-sm">
                                <Phone size={14} className="text-gray-500" />
                                <span className="font-medium">Telefone para contato:</span>
                                <TelefoneFormatado telefone={studio.telefone} />
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                                <MapPin size={14} className="text-gray-500" />
                                <span className="font-medium">Endereço:</span>
                                <span className="text-gray-700">{studio.endereco}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                                <MapPin size={14} className="text-gray-500" />
                                <span className="font-medium">Valor por hora:</span>
                                <span className="text-gray-700">{`R$ ${studio.valorDaHora},00`}</span>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-5">
                        <div className="space-y-5">
                            <div className="flex gap-4">
                                <div className="flex-1">
                                    <label className="text-sm font-semibold mb-1 block">Data</label>
                                    <input
                                        className="p-2 w-full rounded-3xl border border-[#6142FC] focus:outline-none focus:border-[#6142FC] focus:ring-1 focus:ring-[#6142FC]"
                                        type="date"
                                        onChange={obterData}
                                        value={scheduleDate}
                                        required
                                    />
                                </div>

                                <div className="flex-1">
                                    <label className="text-sm font-semibold mb-1 block">Valor Total</label>
                                    <input
                                        className="p-2 w-full text-center rounded-3xl border border-[#6142FC] focus:outline-none focus:border-[#6142FC] focus:ring-1 focus:ring-[#6142FC] bg-gray-50"
                                        type="text"
                                        disabled={true}
                                        value={totalValue || 'Selecione os horários'}
                                        readOnly
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="text-sm font-semibold mb-1 block">Horário</label>
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center gap-2 flex-1">
                                        <Clock size={16} className="text-gray-500" />
                                        <span className="text-sm text-gray-600">De</span>
                                        <select
                                            onChange={onSelectFirstValue}
                                            value={firstValue}
                                            className="p-2 w-3/4 rounded-3xl border border-[#6142FC] focus:outline-none focus:border-[#6142FC] focus:ring-1 focus:ring-[#6142FC]"
                                            required
                                        >
                                            <option value="">Selecione</option>
                                            <option value="8">8:00</option>
                                            <option value="9">9:00</option>
                                            <option value="10">10:00</option>
                                            <option value="11">11:00</option>
                                            <option value="12">12:00</option>
                                            <option value="13">13:00</option>
                                            <option value="14">14:00</option>
                                            <option value="15">15:00</option>
                                            <option value="16">16:00</option>
                                            <option value="17">17:00</option>
                                            <option value="18">18:00</option>
                                        </select>
                                    </div>
                                    <div className="flex items-center gap-2 flex-1">
                                        <span className="text-sm text-gray-600">Até</span>
                                        <select
                                            onChange={onSelectSecondValue}
                                            value={secondValue}
                                            className="p-2 w-3/4 rounded-3xl border border-[#6142FC] focus:outline-none focus:border-[#6142FC] focus:ring-1 focus:ring-[#6142FC]"
                                            required
                                        >
                                            <option value="">Selecione</option>
                                            <option value="9">9:00</option>
                                            <option value="10">10:00</option>
                                            <option value="11">11:00</option>
                                            <option value="12">12:00</option>
                                            <option value="13">13:00</option>
                                            <option value="14">14:00</option>
                                            <option value="15">15:00</option>
                                            <option value="16">16:00</option>
                                            <option value="17">17:00</option>
                                            <option value="18">18:00</option>
                                            <option value="19">19:00</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="border-t border-gray-400 my-2"></div>

                        <div className="flex gap-3 pt-2">
                            <button
                                onClick={onSave}
                                className="flex-1 bg-[#6142FC] text-white font-semibold py-3 rounded-3xl hover:bg-[#7357ff] transition flex items-center justify-center gap-2"
                            >
                                Agendar
                            </button>

                            <button
                                onClick={closeModal}
                                className="flex-1 bg-red-600 text-white font-semibold py-2 rounded-full hover:bg-red-700 transition"
                            >
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
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

                {/* Subtítulo */}
                <h2 className="text-lg font-semibold text-center text-gray-700 mb-6">
                    <span className="text-[#6142FC]">{studio.nome}</span>
                </h2>

                {/* Descrição do estúdio */}
                <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <h3 className="text-sm font-semibold mb-2">Descrição:</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                        {studio.descricao}
                    </p>

                    {/* Informações de contato */}
                    <div className="mt-4 space-y-2">
                        <div className="flex items-center gap-2 text-sm">
                            <Phone size={14} className="text-gray-500" />
                            <span className="font-medium">Telefone para contato:</span>
                            <TelefoneFormatado telefone={studio.telefone} />
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                            <MapPin size={14} className="text-gray-500" />
                            <span className="font-medium">Endereço:</span>
                            <span className="text-gray-700">{studio.endereco}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                            <MapPin size={14} className="text-gray-500" />
                            <span className="font-medium">Valor por hora:</span>
                            <span className="text-gray-700">{`R$ ${studio.valorDaHora},00`}</span>
                        </div>
                    </div>
                </div>

                {/* Formulário de agendamento */}
                <div className="space-y-5">
                    {/* Data */}
                    <h1 className="text-2xl font-bold text-center mb-2">{`Horário agendado para o dia ${agendamentoAtual.dataFormatada} de ${agendamentoAtual.horaEntradaFormatada} até ${agendamentoAtual.horaSaidaFormatada} com valor total de R$ ${agendamentoAtual.valorTotal},00`}</h1>

                    {/* Linha divisória */}
                    <div className="border-t border-gray-400 my-2"></div>

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
    );
}