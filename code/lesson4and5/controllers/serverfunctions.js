dataStorage = ['prefilled data1', 'prefilled data2'];

const getDataStorage = (req, res) => {
    res.send({ dataToReturn: dataStorage });
};

const addToDataStorage = (req, res) => {
    const dataToAdd = req.body.dataToAdd;

    dataStorage.push(dataToAdd);

    res.send({ dataToReturn: dataStorage });
};

const deleteFromDataStorage = (req, res) => {
    dataStorage.shift(); // remove [0]
    res.send({ dataToReturn: dataStorage });
}

const updateDataInStorage = (req, res) => {
    const newData = req.body.dataToUpdate;
    const index = parseInt(req.params.id) - 1;
    dataStorage = dataStorage.map((oldData, i) => 
        (i == index) ? newData : oldData
    );
    res.send({ dataToReturn: dataStorage });
}

module.exports = { 
    getDataStorage,  
    addToDataStorage, 
    deleteFromDataStorage,
    updateDataInStorage
};
