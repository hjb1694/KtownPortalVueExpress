const db = require('../connect');


const UserProfile = {
    create(userId){

        return new Promise(async (resolve, reject) => {

            try{
                const qry = `
                INSERT INTO userprofiles(userId)
                VALUES(?)
                `;

                await db.execute(qry, [userId]);

                resolve();

            }catch(e){

                reject(e);

            }


        });

    }
}

module.exports = UserProfile;