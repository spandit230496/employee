const dbClient = require('../dbclient');

exports.saveExcelData = async (exceldata) => {
    
    const response= await dbClient.upsertEmployeeData(exceldata);
    return response
};

exports.getDatabaseData = async (columns, groupBy, aggregatedColumns, limit, offset, operator, alias) => {
    const response = await dbClient.getData(columns, groupBy, aggregatedColumns, limit, offset, operator, alias);

    return response;
};

exports.addColumn = async (columnname) => {
    const response = await dbClient.addColumn(columnname);
    return response
}
exports.deleteData=async(id)=>{
    const response= await dbClient.deleteData(id);
    return response
}

exports.editData=async(data)=>{
    const response= await dbClient.updateEmployeeData(data);
    return response
}
exports.saveEmployee=async(data)=>{
    const response= await dbClient.insertSingleData(data);
    return response
}
exports.deleteColumn=async(columnname)=>{
    const response= await dbClient.deleteColumn(columnname);
    return response
}


