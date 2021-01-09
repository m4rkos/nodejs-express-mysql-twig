const fixDate = (date) =>{
    let dt = new Date(date);    
    return dt.toLocaleDateString('pt-BR');
}