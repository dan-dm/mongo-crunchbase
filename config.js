export default  {
    urlDatabase: process.env.URL || 'mongodb+srv://dbUser:<PASSWORD>@learning-mongo.z8au7.mongodb.net/crunchbase?retryWrites=true&w=majority',
    db: process.env.DB || 'crunchbase'
}
