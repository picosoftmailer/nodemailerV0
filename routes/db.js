const express = require('express');
const router = express.Router()
const gt = require('C:\\Users\\ayoub.bellaj\\Desktop\\nodemailerV0\\MyFunctions\\get.js');
const pool = require('../database/config');
var total;
//************************************************
//toala column
pool.query('SELECT COUNT(*)  FROM customers', (error, result) => {
    if (error) {
        console.log('' + error)
    } else {
        total = result[0]["COUNT(*)"];
    }
});
//******************************** 
//route '/'
router.get('/', (req, res) => { res.send({ message: 'Node.js and Express REST API' }); });
//*********************************
//route '/users'
router.get('/users', (req, res) => { 
    var take = req.param("take");
    var skip = req.param("skip");
    var orderby = req.param("orderby");
    var filter = req.param('filter');
   
    //chaine start
    var sql2 = 'SELECT * FROM customers';
    //Chaine de test
    var test = 'SELECT * FROM customers';
    //requete final envoyé à la BD
    var requeteFinal = "";

    //Filter
    if (filter != undefined)  {
        var x = req.query.filter;
        var ch = '';
        x = x.substring(0, x.length - 1)
        x = x + ',and,'
        if (x.includes(',and,')) {
            var T = x.split(',and,');
            for (i = 0; i < T.length; i++) {
                // equals  
                if (T[i].includes('=') && T[i].includes('<') == false && T[i].includes('>') == false) {
                    var w = T[i].replace(/,/g, " ");
                    var R = w.split(' = ');
                    if (isNaN(R[1])) { ch += R[0] + ' = ' + '\'' + R[1] + '\'' + " AND " }
                    else { ch += R[0] + ' = ' + R[1] + " AND " }
                }
                // LESS THAN 
                if (T[i].includes('<') && T[i].includes('>') == false && T[i].includes('=') == false) {
                    var w = T[i].replace(/,/g, " ");
                    var R = w.split(' < ');
                    if (isNaN(R[1])) { ch += R[0] + ' < ' + '\'' + R[1] + '\'' + " AND " }
                    else { ch += R[0] + ' < ' + R[1] + " AND " }
                }
                // LESS THAN or equal 
                if (T[i].includes('<=') && T[i].includes('>') == false) {
                    var w = T[i].replace(/,/g, " ");
                    var R = w.split(' <= ');
                    if (isNaN(R[1])) { ch += R[0] + ' <= ' + '\'' + R[1] + '\'' + " AND " }
                    else { ch += R[0] + ' <= ' + R[1] + " AND " }
                }
                // Greater than 
                if (T[i].includes('>') && T[i].includes('<') == false && T[i].includes('=') == false) {
                    var w = T[i].replace(/,/g, " ");
                    var R = w.split(' > ');
                    if (isNaN(R[1])) { ch += R[0] + ' > ' + '\'' + R[1] + '\'' + " AND " }
                    else { ch += R[0] + ' > ' + R[1] + " AND " }
                }
                // Greater than  or equal 
                if (T[i].includes('>=') && T[i].includes('<') == false) {
                    var w = T[i].replace(/,/g, " ");
                    var R = w.split(' >= ');
                    if (isNaN(R[1])) { ch += R[0] + ' >= ' + '\'' + R[1] + '\'' + " AND " }
                    else { ch += R[0] + ' >= ' + R[1] + " AND " }
                }
                // NOT equals  
                if (T[i].includes('<>') && T[i].includes('=') == false) {
                    var w = T[i].replace(/,/g, " ");
                    var R = w.split(' <> ');
                    if (isNaN(R[1])) { ch += R[0] + ' <> ' + '\'' + R[1] + '\'' + " AND " }
                    else { ch += R[0] + ' <> ' + R[1] + " AND " }
                }
                //not contains 
                if (T[i].includes('notcontains')) {
                    var w = T[i].replace(/,/g, " ");
                    var R = w.split(' notcontains ');
                    ch += R[0] + ' NOT LIKE ' + '\'%' + R[1] + '%\'' + " AND "
                }
                // contains 
                if ((T[i].includes('contains')) && (T[i].includes('not') ==false)) {
                    var w = T[i].replace(/,/g, " ");
                    var R = w.split(' contains ');
                    ch += R[0] + ' LIKE ' + '\'%' + R[1] + '%\'' + " AND "
                }
                //starts with
                if (T[i].includes('startswith')) {
                    var w = T[i].replace(/,/g, " ");
                    var R = w.split(' startswith ');
                    ch += R[0] + ' LIKE ' + '\'%' + R[1] + '\'' + " AND "
                }
                //ends with
                if (T[i].includes('endswith')) {
                    var w = T[i].replace(/,/g, " ");
                    var R = w.split(' endswith ');
                    ch += R[0] + ' LIKE ' + '\'' + R[1] + '%\'' + " AND "
                }
                //or (FOR THE DATE 'not equal)
                if (T[i].includes(',or,')) {
                    var w = T[i].split(",or,");
                    var R = w[0].split(",<,");
                    var Q = w[1].split(",>=,");
                    ch += R[0] + ' < ' + '\'' + R[1] + '\'' + " or " + R[0] + ' >= ' + '\'' + Q[1] + '\'' + " AND "
                    console.log(ch)
                }
            }//end for
            ch = ch.substring(0, ch.length - 5)
        }//end ',and,'
        sql2 += ' WHERE ' + ch;
    }//END FILTER 

    //Order by
    if (orderby != undefined) {
        ch2 = ' ORDER BY ' + orderby  ;
        sql2 += ch2; 
    }

    //Test requete (load ou traitement)
    if(sql2 !== test){
         sql2 +=  ' LIMIT ' + take + ' OFFSET ' + skip;
         requeteFinal = sql2;
    }else{
        test += ' LIMIT ' + take + ' OFFSET ' + skip;
        requeteFinal = test;
    }
    
    console.log('requeteFinal    ' + requeteFinal);

    //sql request
    pool.query(requeteFinal, (error, result) => {
        if (error) {
            console.log('' + error)
        } else {
            var obj = {}
            obj = { total: total }
            obj.data = result
            res.send('   ' + JSON.stringify(obj));
        }
    });

});
//**************************************************
// Export the router
module.exports = router;
//**************************************************
