import connection from '../db/mongoose.js';

const productoSchema = new connection.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: String,
        trim: true
    },
    image: {
        type: String,
        trim: true
    },
    url: {
        type: String,
        trim: true
    },

},{
    strict: false
});

const Producto = connection.model('Producto', productoSchema);

export default Producto;