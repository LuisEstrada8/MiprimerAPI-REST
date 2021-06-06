import mongoose, { ConnectOptions } from 'mongoose'
import config from './config/config'

const dbOptions={
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    user: config.DB.USER,
    pass: config.DB.PASSWORD
}

mongoose.connect(config.DB.URI, dbOptions);

const connection = mongoose.connection;

connection.once('open',()=>{
    console.log('Mongodb connection stablished');
    
});

connection.on('error', err => {
    console.log(err);
    process.exit(0);
    
})