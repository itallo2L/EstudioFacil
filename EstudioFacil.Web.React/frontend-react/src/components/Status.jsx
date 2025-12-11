function Status({ valor }) {

    function valorVerde(valor) {
        return (<span className="font-mono text-green-700">{`R$ ${valor},00`}</span>);
    };

    if (valor)
        return (<p className="font-serif">Valor por hora: {valorVerde(valor)}</p>);
    else if (!valor)
        return (<p>''</p>);

    return null;
};

export default Status;