import { X, Phone, MapPin, Calendar, Clock, Save } from "lucide-react";

export function ModalDetails({ isOpen, closeModal, onSave, onCancel }) {
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
                <h1 className="text-2xl font-bold text-center mb-2">Agendamento</h1>

                {/* Subtítulo */}
                <h2 className="text-lg font-semibold text-center text-gray-700 mb-6">
                    Agendar horário em <span className="text-[#6142FC]">Estúdio Harmonia 54</span>
                </h2>

                {/* Descrição do estúdio */}
                <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <h3 className="text-sm font-semibold mb-2">Descrição:</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                        No coração da cena musical, o Estúdio Harmonia 54 oferece um ambiente profissional
                        e inspirador para artistas que buscam excelência. Com acústica premium e equipamentos
                        de última geração, proporcionamos a qualidade sonora que sua música merece.
                    </p>

                    {/* Informações de contato */}
                    <div className="mt-4 space-y-2">
                        <div className="flex items-center gap-2 text-sm">
                            <Phone size={14} className="text-gray-500" />
                            <span className="font-medium">Telefone para contato:</span>
                            <span className="text-gray-700">(62) 9292-8932</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                            <MapPin size={14} className="text-gray-500" />
                            <span className="font-medium">Endereço:</span>
                            <span className="text-gray-700">Av Goiânia, N54 - GO</span>
                        </div>
                    </div>
                </div>

                {/* Formulário de agendamento */}
                <div className="space-y-5">
                    {/* Data */}
                    <div>
                        <label className="text-sm font-semibold mb-1 block">Data</label>
                        <input
                            className="p-2 rounded-3xl border border-[#6142FC] focus:outline-none focus:border-[#6142FC] focus:ring-1 focus:ring-[#6142FC]"
                            type="date"
                        // value={startDate}
                        // onChange={e => setStartDate(e.target.value)}
                        />
                    </div>

                    {/* Horário */}
                    <div>
                        <label className="text-sm font-semibold mb-1 block">Horário</label>
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2 flex-1">
                                <Clock size={16} className="text-gray-500" />
                                <span className="text-sm text-gray-600">De</span>
                                <select
                                    className="p-2 w-3/4 rounded-3xl border border-[#6142FC] focus:outline-none focus:border-[#6142FC] focus:ring-1 focus:ring-[#6142FC]"
                                >
                                    <option value=""></option>
                                    <option>8:00</option>
                                    <option>9:00</option>
                                    <option>10:00</option>
                                    <option>11:00</option>
                                    <option>12:00</option>
                                    <option>13:00</option>
                                    <option>14:00</option>
                                    <option>15:00</option>
                                    <option>16:00</option>
                                    <option>17:00</option>
                                    <option>18:00</option>
                                </select>
                            </div>
                            <div className="flex items-center gap-2 flex-1">
                                <span className="text-sm text-gray-600">Até</span>
                                <select
                                    className="p-2 w-3/4 rounded-3xl border border-[#6142FC] focus:outline-none focus:border-[#6142FC] focus:ring-1 focus:ring-[#6142FC]"
                                >
                                    <option value=""></option>
                                    <option>8:00</option>
                                    <option>9:00</option>
                                    <option>10:00</option>
                                    <option>11:00</option>
                                    <option>12:00</option>
                                    <option>13:00</option>
                                    <option>14:00</option>
                                    <option>15:00</option>
                                    <option>16:00</option>
                                    <option>17:00</option>
                                    <option>18:00</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Linha divisória */}
                    <div className="border-t border-gray-400 my-2"></div>

                    {/* Botões */}
                    <div className="flex gap-3 pt-2">
                        <button
                            onClick={onSave}
                            className="flex-1 bg-[#6142FC] text-white font-medium py-3 rounded-3xl hover:bg-[#7357ff] transition flex items-center justify-center gap-2"
                        >
                            <Save size={16} />
                            Agendar
                        </button>

                        <button
                            onClick={closeModal}
                            className="flex-1 border border-gray-600 text-gray-900 font-medium py-3 rounded-3xl hover:bg-gray-50 transition"
                        >
                            Cancelar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}