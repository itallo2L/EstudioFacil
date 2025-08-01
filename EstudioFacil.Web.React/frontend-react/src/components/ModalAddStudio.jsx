import { X } from "lucide-react";

function ModalAddStudio({ isOpen, closeModal }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="flex w-8/12 flex-col items-center p-6">

                <div className="w-full max-w-6xl flex items-center p-2 bg-slate-200 rounded-t-lg">
                    <div className="flex p-2 flex-1">
                        <button
                            className="bg-slate-400 text-white p-2 rounded-md hover:bg-red-400"
                            onClick={() => closeModal()}
                        >
                            <X />
                        </button>
                    </div>

                    <div className="flex justify-center">
                        <h2 className="text-4xl font-bold">Adicionar Estúdio</h2>
                    </div>

                    <div className="flex space-x-2 p-2 justify-end flex-1">
                        <button
                            className="bg-slate-400 text-white p-2 rounded-md hover:bg-green-400 w-28"
                            onClick={() => alert("Salvar não implementado!")}>
                            Salvar
                        </button>
                    </div>
                </div>

                <div className="w-full max-w-6xl flex flex-col items-center justify-center p-2 bg-slate-200 rounded-b-lg">
                    <div>
                        <div className="flex items-center mb-3">
                            <p className="p-2 h-8 flex items-center font-bold text-xl">Nome:</p>
                            <input
                                className="w-64 h-8 p-2 rounded-md border border-gray-400"
                                type="text" />
                        </div>
                        <div className="flex items-center mb-3">
                            <label className="p-2 font-bold text-xl">Está aberto:
                                <input
                                    type="checkbox"
                                    className="p-2 size-5 rounded-md ml-2 border-gray-400" />
                            </label>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ModalAddStudio;