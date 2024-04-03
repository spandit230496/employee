const ExcelService = require('../Service/ExcelService');

exports.getExcelData = async (req, res) => {

    const response = await ExcelService.saveExcelData(req.body);
    res.send(response)
    
};

exports.getDatabaseData = async (req, res) => {
    const { columns, groupBy, aggregatedColumns, limit, offset,operator,alias } = req.query;
    const response = await ExcelService.getDatabaseData(columns, groupBy, aggregatedColumns, limit, offset,operator,alias);
    res.send(response);
};
exports.deleteData = async (req, res) => {
    const { id } = req.body;
    const response = await ExcelService.deleteData(id);
    res.send({
        message: 'Data deleted successfully',});
};

exports.editData = async (req, res) => {
    const { row } = req.body;
    const response = await ExcelService.editData(row);
    res.send({
        message: 'Data updated successfully',});
};

exports.saveEmployee = async (req, res) => {
    const { row } = req.body;
    const response = await ExcelService.saveEmployee(row);
    res.send({
        message: 'Data saved successfully',});
};

exports.addColumn = async (req, res) => {
    const { columnName } = req.body;
    console.log(columnName)
    const response = await ExcelService.addColumn(columnName);
    console.log(response);
    res.send({
        message: 'Column added successfully',});
};
