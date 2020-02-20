const db = require('../connect');


const ForumPost = {
    create(obj){
        return new Promise(async (resolve, reject) => {

            try{

                const {userId, headline, content, categoryId, isAnon, img1, img2} = obj;

                const qry = `
                INSERT INTO forumposts(userId, headline, content, categoryId, is_anon, img1, img2)
                VALUES(?,?,?,?,?,?,?)
                `;

                const result = await db.execute(qry, [
                    userId, headline, content, categoryId, isAnon, img1, img2
                ]);

                resolve(result[0]);

            }catch(e){

                reject(e);

            }



        });
    }
}

module.exports = ForumPost;