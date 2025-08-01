import { X, Trash2Icon, Pencil } from "lucide-react";
import Status from "./Status"

export function ModalDetails({ isOpen, studio, closeModal }) {
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
                        <h2 className="text-4xl font-bold">Detalhes do Estúdio</h2>
                    </div>

                    <div className="flex space-x-2 p-2 justify-end flex-1">
                        <button
                            className="bg-slate-400 text-white p-2 rounded-md hover:bg-slate-500"
                            onClick={() => alert("Deletar não implementado")}
                        >
                            <Trash2Icon />
                        </button>
                        <button
                            className="bg-slate-400 text-white p-2 rounded-md hover:bg-slate-500"
                            onClick={() => alert("Editar não implementado")}
                        >
                            <Pencil />
                        </button>
                    </div>
                </div>

                <div className="w-full max-w-6xl flex flex-col items-center justify-center p-2 bg-slate-200 rounded-b-lg">
                    <p className="w-full text-left p-2 font-bold text-3xl">Nome: {studio.nome}</p>
                    <div className="flex w-full max-w-6xl">
                        <p className="text-left mt-2 ms-2 mb-2 font-bold text-3xl">Status:</p>
                        <Status
                            isOpenStudioOnDetails={studio.estaAberto}>
                        </Status>
                    </div>
                </div>

            </div>
        </div>
    );
}