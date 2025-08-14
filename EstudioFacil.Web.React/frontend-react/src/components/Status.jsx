function Status({ isOpenStudioOnList, isOpenStudioOnDetails }) {
    if (isOpenStudioOnList != undefined) {
        if (isOpenStudioOnList)
            return (<p className="text-green-700">Aberto</p>);
        else if (!isOpenStudioOnList)
            return (<p className="text-red-700">Fechado</p>);
    };

    if (isOpenStudioOnDetails != undefined) {
        if (isOpenStudioOnDetails)
            return (<p className="text-left p-2 font-bold text-3xl text-green-700">Aberto</p>);
        else
            return (<p className="text-left p-2 font-bold text-3xl text-red-700">Fechado</p>);
    };

    return null;
};

export default Status;