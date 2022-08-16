import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('worlds.db');

export const init = () => {
    const promise = new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql('CREATE TABLE IF NOT EXISTS worlds (id INTEGER PRIMARY KEY NOT NULL, title TEXT NOT NULL, ImageUri TEXT NOT NULL, address TEXT NOT NULL, lat REAL NOT NULL, lng REAL NOT NULL);',
                [],
                () => {
                    resolve();
                },
                (_, err) => {
                    reject(err);
                })
        });
    })
    return promise;
}

 export const InsertPlace = (title, ImageUri, address, lat, lng) => {
    const promise = new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql('INSERT INTO worlds (title,ImageUri,address,lat,lng) VALUES (?,?,?,?,?)',
                [title, ImageUri, address, lat, lng],
                (_, result) => {
                    resolve(result);
                },
                (_, err) => {
                    reject(err);
                })
        });
    })
    return promise;

}

 export const fetchData =()=>{
    const promise = new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql('SELECT * FROM worlds',
                [],
                (_, result) => {
                    resolve(result);
                },
                (_, err) => {
                    reject(err);
                })
        });
    })
    return promise;
}