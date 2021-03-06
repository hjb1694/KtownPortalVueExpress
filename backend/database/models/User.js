const db = require('../connect');

const User = {
    create(obj){

        const {username, email, password, dob, vericode} = obj;

        return new Promise(async (resolve, reject) => {

            try {

                const qry = `
                INSERT INTO users(username, email, password, dob, verification_code)
                VALUES(?,?,?,?,?)
                `;

                const result = await db.execute(qry, [
                    username, email, password, dob, vericode
                ]);

                resolve(result[0]);

            }catch(e){

                reject(e);

            }


        });
    },
    emailExists(email){
        return new Promise(async (resolve, reject) => {

            try {

                const qry = `
                SELECT COUNT(*) AS count
                FROM users 
                WHERE email = ?
                `;

                const [rows] = await db.execute(qry, [email]);

                rows[0].count ? resolve(true) : resolve(false);

            }catch(e){

                reject(e);

            }

        });
    }, 
    usernameExists(username){
        return new Promise(async (resolve, reject) => {

            try {

                const qry = `
                SELECT COUNT(*) AS count
                FROM users 
                WHERE username = ?
                `;

                const [rows] = await db.execute(qry, [username]);

                rows[0].count ? resolve(true) : resolve(false);

            }catch(e){

                reject(e);

            }

        });
    }, 
    findUserByEmail(email){

        return new Promise(async (resolve, reject) => {

            try{

                const qry = `
                SELECT * FROM users 
                WHERE email = ?
                `;

                const [rows] = await db.execute(qry, [email]);

                resolve(rows[0]);


            }catch(e){

                reject(e);

            }



        });

    }, 
    checkIfVerified(userId){

        return new Promise(async (resolve, reject) => {

            try{

                const qry = `
                SELECT is_verified
                FROM users 
                WHERE id = ?
                `;

                const [rows] = await db.execute(qry, [userId]);


                rows[0].is_verified == 1 ? resolve(true) : resolve(false);


            }catch(e){

                reject(e);

            }


        });


    }
}


module.exports = User;