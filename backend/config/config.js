module.exports = {
    port : process.env.PORT || 8081, 
    db : {
        host : process.env.DB_HOST || 'localhost', 
        user : process.env.DB_USER || 'root', 
        password : process.env.DB_PASS || '', 
        database : process.env.DB_NAME || 'ktown'
    }, 
    jwt : {
        secret : process.env.JWT_SECRET || 'secret'
    }
}