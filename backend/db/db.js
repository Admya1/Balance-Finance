const mongoose = require('mongoose');

const db = async () => {
    try {
        mongoose.set('strictQuery', false)
        await mongoose.connect('mongodb+srv://admyamaini:tzgGNuEi6Wg4YWCZ@cluster0.deonr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
        console.log('Db Connected')
    } catch (error) {
        console.log('DB Connection Error');
    }
}

module.exports = {db}