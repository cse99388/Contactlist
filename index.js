const express = require('express');
const path = require('path');

const port = 8000;

const db = require('./config/mongoose');
const Contact = require('./models/contact');

const app = express();
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded());
app.use(express.static("assets"));
// app.use(function(req,res,next)
// {
//     console.log('middleware');
//     next();
// });

var contactlist = [
    {
        name : 'siddu',
        phone : 123456789
    },
    {
        name : 'Kaliki',
        phone : 987654321
    }
];
app.get('/',function(req,res)
{
    console.log(req.url);
    // res.render('home',{title : 'Contact list',contact_list : contactlist});
    // res.send('<h1>My first express server</h1>');
    Contact.find({},function(err,contacts)
    {
        if(err)
        {
            console.log('error in opening database');
            return;
        }
        res.render('home',{'title' : 'Contact list',contact_list : contacts});
    });
});
app.get('/profile',function(req,res)
{
    console.log(req.url);
    res.send('<h1>profile</h1>');
});
app.get('/practice',function(req,res)
{
    return res.render('practice',
    {
        s1 : 0,
        s2 : 0,
        title : 'even odd'
    }
    );
});
// app.get("/delete-contact/:phone",function(req,res)
// {
//     console.log(req.params);
//     console.log(req.params.phone)
// });
// app.get("/delete-contact/",function(req,res)
// {
//      console.log(req.query);
//      console.log(req.query.phone);
//      let phone = req.query.phone;
//      let name = req.query.name;
//      let contact = contactlist.findIndex(i => ((phone == i.phone) && (name == i.name)));
//      if (contact != -1)
//      {
//          contactlist.splice(contact,1);
//      }
//      return res.redirect(('back'));
//  });
app.get("/delete-contact/",function(req,res)
{
    let id = req.query.id;
    Contact.findByIdAndDelete(id,function(err)
    {
        if (err)
        {
            console.log("error in deleting");
            return;
        };
        res.redirect('back');
    });
});
app.post("/create-contact",function(req,res)
{
    Contact.create({
        name : req.body.name,
        phone : req.body.phone
    },
    function(err,newContact)
    {
        if(err)
        {
            console.log('error in creating the contact');
        }
        console.log("created contact : ",newContact);
        return res.redirect('/');
    });
    // contactlist.push(req.body);
    // return res.redirect('/');
});

app.listen(port,function(err)
{
    if (err)
    {
        console.log("Error : ",err);
    }
    console.log("Server running on port : ",port);
});