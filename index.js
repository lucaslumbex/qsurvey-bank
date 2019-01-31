const express = require('express');
var bodyParser = require("body-parser");
var sql = require("mssql");
var app = express();
const pool = {
    user: 'qucoon',
    password: 'tiger000',
    server: 'qucoondb.csudtdi0cdhj.us-west-2.rds.amazonaws.com',
    database: 'qucoondb'
};

// Body Parser Middleware
app.use(bodyParser.json());

app.set('port', (process.env.PORT || 5000))
app.use(express.static(__dirname + '/public'))

//CORS Middleware
app.use(function (req, res, next) {
    //Enabling CORS
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, contentType,Content-Type, Accept, Authorization");
    next();
});

app.get('/', function(req, res) {
    try {
        sql.close()
        sql.connect(pool)
            .then(function () {
                // To retrieve all the data - Start
                new sql.Request()
                    .query("select * from BankSurveyAnswers")
                    .then(function (dbData) {
                        if (dbData == null || dbData.length === 0)
                            return;
                        console.dir('All the survey questions');
                        console.dir(dbData);

                        // send records as a response
                        let surveyQuestion = dbData.recordset
                        console.log('survey Answers', dbData.recordset);
                        sql.close()
                        res.send(surveyQuestion);
                    })
                    .catch(function (error) {
                        console.dir(error);
                    });
                // To retrieve all the data - End
            }).catch(function (error) {
            console.dir(error);
        });
    } catch (error) {
        console.dir(error);
    }
});

app.get('/questions', function(req, res) {
    try {
        sql.close()
        sql.connect(pool)
            .then(function () {
                // To retrieve all the data - Start
                new sql.Request()
                    .query("select * from BankSurveyQuestion")
                    .then(function (dbData) {
                        if (dbData == null || dbData.length === 0)
                            return;
                        console.dir('All the survey questions');
                        console.dir(dbData);

                        // send records as a response
                        let surveyQuestion = dbData
                        console.log('survey Question', dbData);
                        sql.close()
                        res.send(surveyQuestion.recordset);
                    })
                    .catch(function (error) {
                        console.dir(error);
                    });
                // To retrieve all the data - End
            }).catch(function (error) {
            console.dir(error);
        });
    } catch (error) {
        console.dir(error);
    }
    });

app.get('/fire2', function(request, response) {
    let questionID = '555';
    let question = 'lucaslumbex';

    try {
        sql.close();
        sql.connect(pool)
            .then(function () {
                // Insert data - Start
                let dbConn = new sql.ConnectionPool(pool,
                    function (err) {
                        let myTransaction = new sql.Transaction(dbConn);
                        myTransaction.begin(function (error) {
                            let rollBack = false;
                            myTransaction.on('rollback', aborted => {
                                    rollBack = true;
                                });
                            new sql.Request(myTransaction)
                                // .query("insert into BankSurveyQuestion VALUES ('"+questionID+"', '"+question+"')", (err, result) => {
                                .query("insert into BankSurveyQuestion VALUES ('01', 'GENDER'), " +
                                    "('02', 'EMPLOYMENT DURATION')," +
                                    "('03', 'AGE GROUPINGS')," +
                                    "('04', 'DEPARTMENT')," +
                                    "('05', 'BANK')," +
                                    "('06', 'EMPLOYMENT TYPE')," +
                                    "('07', 'SALARY RANGE')," +
                                    " ('08', 'LOCATION')", (err, result) => {

                                    if (err) {
                                        if (!rollBack) {
                                            myTransaction.rollback(err => {
                                                console.dir('Rollback ERROR 1',err);
                                            })
                                        }
                                    } else {
                                        myTransaction.commit(err => {
                                            console.dir('Data is inserted successfully!');
                                            response.send('Hello Fire2!>>')
                                        })
                                    }
                                })
                        });
                    });
                // Insert data - End

            }).catch(function (error) {
            console.dir('ERROR 3',error);
        });
    } catch (error) {
        console.dir('ERROR 4',error);
    }
})

app.get('/free', function(request, response) {
    try {
        sql.close();
        sql.connect(pool)
            .then(function () {
                // Insert data - Start
                let dbConn = new sql.ConnectionPool(pool,
                    function (err) {
                        let myTransaction = new sql.Transaction(dbConn);
                        myTransaction.begin(function (error) {
                            let rollBack = false;
                            myTransaction.on('rollback', aborted => {
                                rollBack = true;
                            });
                            new sql.Request(myTransaction)
                                .query("insert into BankSurveyQuestion VALUES ('09', 'GENDER'), " +
                                    "('10', 'MY OFFICE IS VERY CONDUCIVE FOR WORK')," +
                                    "('11', 'MY BOSS VALUES MY CONTRIBUTION')," +
                                    "('12', 'COLLEAGUES ARE RESPECTFUL AND SUPPORTIVE')," +
                                    "('13', 'MANAGEMENT IS ETHICAL AND OF HIGH INTEGRITY')," +
                                    "('14', 'THERE IS NO GENDER, RELIGIOUS OR ETHNIC BIAS')," +
                                    "('15', 'I HAVE NO CONCERN OR FEAR OF LOSING MY JOB')," +
                                    "('16', 'MY SALARY IS GOOD COMPARED TO OTHER BANKS')," +
                                    "('17', 'I RECEIVE ADEQUATE TRAINING FOR MY JOB')," +
                                    "('18', 'I AM SO SURE OF MY CAREER PATH IN THIS BANK')," +
                                    "('19', 'PROMOTION IS STRONGLY BASED ON PERFORMANCE')," +
                                    " ('20', 'COMMENT')", (err, result) => {
                                    if (err) {
                                        if (!rollBack) {
                                            myTransaction.rollback(err => {
                                                console.dir('Rollback ERROR 1',err);
                                            })
                                        }
                                    } else {
                                        myTransaction.commit(err => {
                                            console.dir('Data is inserted successfully!');
                                            response.send('Hello Free!>>')
                                        })
                                    }
                                })
                        });
                    });
                // Insert data - End
            }).catch(function (error) {
            console.dir('ERROR 3',error);
        });
    } catch (error) {
        console.dir('ERROR 4',error);
    }
})


app.post('/surveyanswer', function(request, response) {
    let body = request.body;

    let body2 = {
        "userAgent" : "",
        "question_01" : "",
        "question_02" : "",
        "question_03" : "",
        "question_04" : "",
        "question_05" : "",
        "question_06" : "",
        "question_07" : "",
        "question_08" : "",
        "question_09" : "",
        "question_10" : "",
        "question_11" : "",
        "question_12" : "",
        "question_13" : "",
        "question_14" : "",
        "question_15" : "",
        "question_16" : "",
        "question_17" : "",
        "question_18" : "",
        "question_19" : "",
        "question_20" : "",
    }

     let userAgent = body.userAgent, question_01 = body.question_01,
     question_02 = body.question_02, question_03 = body.question_03,
     question_04 = body.question_04, question_05 = body.question_05,
     question_06 = body.question_06, question_07 = body.question_07,
     question_08 = body.question_08, question_09 = body.question_09,
     question_10 = body.question_10, question_11 = body.question_11,
     question_12 = body.question_12, question_13 = body.question_13,
     question_14 = body.question_14, question_15 = body.question_15,
     question_16 = body.question_16, question_17 = body.question_17,
     question_18 = body.question_18, question_19 = body.question_19,
     question_20 = body.question_20;



    //Try and SAVE THE Survey Answers
    console.log("Body >>>", body);

        try {
            sql.close();
            sql.connect(pool)
                .then(function () {
                    // Insert data - Start
                    let dbConn = new sql.ConnectionPool(pool,
                        function (err) {
                            let myTransaction = new sql.Transaction(dbConn);
                            myTransaction.begin(function (error) {
                                let rollBack = false;
                                myTransaction.on('rollback', aborted => {
                                    rollBack = true;
                                });
                                new sql.Request(myTransaction)
                                    .query("insert into BankSurveyAnswers VALUES ('"+userAgent+"', '"+question_01+"' , '"+question_02+"' , '"+question_03+"' , '"+question_04+"' , '"+question_05+"' , '"+question_06+"' , '"+question_07+"' , '"+question_08+"' , '"+question_09+"' , '"+question_10+"' , '"+question_11+"' , '"+question_12+"' , '"+question_13+"' , '"+question_14+"' , '"+question_15+"' ,'"+question_16+"' ,'"+question_17+"' ,'"+question_18+"' ,'"+question_19+"' , '"+question_20+"') ",
                                        (err, result) => {
                                            if (err) {
                                                if (!rollBack) {
                                                    myTransaction.rollback(err => {
                                                        let vm ={
                                                            responsecode: "01",
                                                            responsemessage: "For some reasons this insert has been rolled back by the Database"
                                                        }

                                                        console.log('Rollback ERROR', vm)
                                                    })
                                                }
                                                let vm ={
                                                    responsecode: "02",
                                                    responsemessage: err
                                                }
                                                console.log('Rollback ERROR', vm)

                                            } else {
                                                myTransaction.commit(err => {
                                                    let vm ={
                                                        responsecode: "00",
                                                        responsemessage: "Survey Saved Successfully"
                                                    }

                                                    response.send(vm);
                                                })
                                            }
                                        })
                            });
                        });
                    // Insert data - End
                }).catch(function (error) {
                console.dir('ERROR 3',error);
            });
        } catch (error) {
            console.dir('ERROR 4',error);
        }


})

app.get('/questions', function(req, res) {
    try {
        sql.close()
        sql.connect(pool)
            .then(function () {
                // To retrieve all the data - Start
                new sql.Request()
                    .query("select * from BankSurveyQuestion")
                    .then(function (dbData) {
                        if (dbData == null || dbData.length === 0)
                            return;
                        console.dir('All the survey questions');
                        console.dir(dbData);

                        // send records as a response
                        let surveyQuestion = dbData
                        console.log('survey Question', dbData);
                        sql.close()
                        res.send(surveyQuestion.recordset);
                    })
                    .catch(function (error) {
                        console.dir(error);
                    });
                // To retrieve all the data - End
            }).catch(function (error) {
            console.dir(error);
        });
    } catch (error) {
        console.dir(error);
    }
});

app.post('/surveyduplicatefind', function(request, response) {
    let body = request.body;
    //Try and SAVE THE Survey Answers
    console.log("Body >>>");
    // console.log("Body >>>", body);
    let userAgent = body.userAgent;

    try {
        sql.close();
        sql.connect(pool)
            .then(function () {
                console.log('user Agent >>>', userAgent)
                new sql.Request()
                    .query("select * from BankSurveyAnswers where userAgent = '"+userAgent+"'")
                    .then(function (dbData) {
                        if (dbData == null || dbData.length === 0)
                            return;
                        console.dir('Course with ID = 2');
                        if (dbData.recordset.length === 0){
                            console.dir(dbData);
                            let vm = {
                                responsecode: '00',
                                responsemessage: 'No such Records Exists'
                            }
                            response.send(vm);
                        }else {
                            let vm = {
                                responsecode: '01',
                                responsemessage: 'This user Agent has already filled the Survey',
                                record: dbData.recordset
                            }
                            response.send(vm);
                        }
                    })
                    .catch(function (error) {
                        console.dir(error);
                    });
                // To retrieve specicfic data - End
            }).catch(function (error) {
            console.dir(error);
        });
    } catch (error) {
        console.dir(error);
    }
});


app.get('/emptydb', function(request, response) {
    console.log("About to empty DB");
    try {
        sql.close();
        sql.connect(pool)
            .then(function () {
                // Delete data - Start
                let delValue = 4;
                let dbConn = new sql.ConnectionPool(pool,
                    function (err) {
                        let myTransaction = new sql.Transaction(dbConn);
                        myTransaction.begin(function (error) {
                            let rollBack = false;
                            myTransaction.on('rollback',
                                function (aborted) {
                                    rollBack = true;
                                });
                            new sql.Request(myTransaction)
                                .query("TRUNCATE TABLE  BankSurveyAnswers",
                                    function (err, recordset) {
                                        if (err) {
                                            if (!rollBack) {
                                                myTransaction.rollback(function (err) {
                                                    console.dir(err);
                                                });
                                            }
                                        } else {
                                            myTransaction.commit().then(function (recordset) {
                                                console.dir('Data is deleted successfully!');
                                                let vm ={
                                                    responsecode: "00",
                                                    responsemessage: "BankSurveyAnswers table Truncated Successfully"
                                                }
                                                response.send(vm);
                                            }).catch(function (err) {
                                                console.dir('Error in transaction commit ' + err);
                                            });
                                        }
                                    });
                        });
                    });
                // Delete data - End
            }).catch(function (error) {
            console.dir(error);
        });
    } catch (error) {
        console.dir(error);
    }
});




app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})
