const app = require('./server').app;
const modules = require('./model');
const seq = require('./dbconfig').seq;
const Op = seq.Op;
const { Users, Blogs} = modules
const mailgun = require('./mailconfig').mailgun


app.set('view engine', 'jade')

app.post('/adduser',async (req,res) => {
    try {
        res.header("Content-Type",'application/json');
        const response = await Users.create(req.body)
        res.json({
            status: 200,
            response: "Added user successfully"
        })
    } catch (e) {
        res.sendStatus(500)
    }
})


app.post('/post',async (req, res) => {
    try {
        res.header("Content-Type",'application/json');
        console.log("******** req.body.authorID **********", req.body.authorID)
        const response = await Blogs.create(req.body);
        const otherusers = await Users.findAll({
            where :{
                id: {
                    [seq.Op.not]: req.body.authorID
                }
            },
            raw:true
        });

        const author = await Users.findAll({
            where : {
                id: req.body.authorID
            },
            raw: true            
        });

        console.log("OTHERS USERS", otherusers);
        console.log("AUTHOR", author);

        otherusers.forEach((data)=>{

            var emailData = {
                from: 'marsai493@email.com',
                to: data.emailID,
                subject: `${req.body.title}`,
                html: `Hello ${data.firstname} ${data.lastName} , A new blog(${req.body.title}) has been posted by ${author.length && author[0].username}`
            }
            
            mailgun.messages().send(emailData, function (err, body) {
                if (err) {
                    res.render('error', { error : err});
                    console.log("got an error: ", err);
                }
            });
            
        })
        res.json({
            status: 200,
            response: "Added blog successfully"
        })  
    } catch (e) {
        res.sendStatus(500)
    }
})

app.get('/posts/', async (req, res) => {
    try {
        const id = req.query.postID;
        const authorID = req.query.authorID
        let response = await Blogs.findAll({
            where: {
                [Op.or]: [
                    {
                        authorID: authorID ? [authorID]:[]
                    },
                    {
                        id: id ? [id] : []
                    }
                ]
            }
        });
        return res.json(response)
    } catch(e){
        res.sendStatus(500)  
    }
});

app.delete('/post',async (req, res) => {
    try {        
        res.header("Content-Type",'application/json');
        const id = req.body.postID;
        const authorID = req.body.authorID
        console.log("****************** id,authorID", id, authorID)
        if (id || authorID) {
            const response = await Blogs.destroy({
                where : {
                    authorID: authorID ? [authorID]:[],
                    id: id ? [id] : [] 
                }
            });
            res.json({
                status: 200,
                response: "Delete blog successfully"
            });
        } else {
            res.sendStatus(400) 
        }
    } catch (e) {
        res.sendStatus(500)
    }
})
