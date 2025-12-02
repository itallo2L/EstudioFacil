import { X, Phone, MapPin, Calendar, Clock, Save } from "lucide-react";

export function ModalScheduleDetails({ isOpen, studio, closeModal, onEditStudioClick }) {
    if (!isOpen) return null;

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
                <h1 className="text-2xl font-bold text-center mb-2">Detalhes do Agendamento</h1>

                {/* Subtítulo */}
                <h2 className="text-lg font-semibold text-center text-gray-700 mb-6">
                    Agendar horário em <span className="text-[#6142FC]">Studio 54</span>
                </h2>

                {/* Descrição do estúdio */}
                <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <h1 className="text-2xl font-bold text-center mb-2">Horário agendado por Jorge Teste para o dia 01/12/2025 de 14:00 até 18:00</h1>
                   

                    {/* Informações de contato */}
                    <div className="mt-4 space-y-2">
                        <div className="flex items-center gap-2 text-sm">
                            <Phone size={14} className="text-gray-500" />
                            <span className="font-medium">Telefone para contato:</span>
                            <span className="text-gray-700">(62) 8932-9292</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                            <MapPin size={14} className="text-gray-500" />
                            <span className="font-medium">Endereço:</span>
                            <span className="text-gray-700">Rua Aparecida, Qd 57, Lt 60 - GO</span>
                        </div>
                    </div>
                </div>

                {/* Formulário de agendamento */}
                <div className="space-y-5">
                    {/* Linha divisória */}
                    <div className="border-t border-gray-400 my-2"></div>

                    {/* Botões */}
                    <div className="flex gap-3 pt-2">
                        <button
                            // onClick={onSave}
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