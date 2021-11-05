import {MongoClient} from 'mongodb';
import config from './config.js';



class MongoManager {
    constructor(config){
        this.url = config.urlDatabase;
        this._connect(config.db);
    }
    async _connect(db){
        try {
            this.client = new MongoClient(this.url,{useNewUrlParser:true});
            this.client.connect();
            this.db = this.client.db(db);
        } catch (error) {
            this._dropConnection();
            throw error;

        }
    }
    async _dropConnection(){
        this.client.close();
    }



    async insertOne(collectionName, data){
        try {
            const result = await this.db.collection(collectionName)
                                                .insertOne(data);
            this._dropConnection();
            return result;
        } catch (error) {
            throw error;
            
        }
    }
    async insertMany(collectionName,data){
        try {
            const result = await this.db.collection(collectionName)
                                        .insertMany(data);
            this._dropConnection();
            return result;
        } catch (error) {
            throw error;
            
        }
    }
    async find(collectionName,query,projection){
        try {
            const result = await this.db.collection(collectionName)
                                         .find(query)
                                         .project(projection)
                                        //  .limit(10)
                                         .toArray();
            // this._dropConnection();                            
            return result;
        } catch (error) {
            throw error;
            
        }
    }
    
    async findAndSort(collectionName,query,projection,sort){
        try {
            const result = await this.db.collection(collectionName)
                                        .find(query)
                                        .project(projection)
                                        .sort(sort)
                                        .toArray();                          
            return result;
        } catch (error) {
            throw error;
        }
    }

    async count_documents(collectionName,query){
        try {
            const result = await this.db.collection(collectionName)
            .find(query)                                
            .count()
            // .then(n => console.log(`There are ${n} ${collectionName}`);
            return result;
        } catch (error) {
            throw error;
        }
    }

    async updateOne(collectionName,query,data){
        try {
            const result = await this.db.collection(collectionName)
                        .updateOne(query,data)

            this._dropConnection();

            return result;
        } catch (error) {
            throw error;
            
        }
    }
    async removeOne(collectionName, query){
        try {
            const result = await this.db.collection(collectionName)
                                                .removeOne(query);
            this._dropConnection();
            return result;
        } catch (error) {
            throw error;
            
        }
    }
    
    // async aggregate()
}

 export default new MongoManager(config);
