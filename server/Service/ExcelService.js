const dbClient = require('../dbclient');

exports.saveExcelData = async (exceldata) => {
    
    const response= await dbClient.upsertEmployeeData(exceldata);
    console.log(response)
    return response
};

exports.getDatabaseData = async (columns, groupBy, aggregatedColumns, limit, offset, operator, alias) => {
    const response = await dbClient.getData(columns, groupBy, aggregatedColumns, limit, offset, operator, alias);

    console.log(response);
    return response;
};


exports.deleteData=async(id)=>{
    const response= await dbClient.deleteData(id);
    console.log(response)
    return response
}

exports.editData=async(data)=>{
    const response= await dbClient.updateEmployeeData(data);
    console.log(response)
    return response
}
exports.saveEmployee=async(data)=>{
    const response= await dbClient.insertSingleData(data);
    console.log(response)
    return response
}


