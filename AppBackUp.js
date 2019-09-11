const express = require('express');
const bodyParser = require('body-parser');
const graphglHttp = require('express-graphql');
const {buildSchema} = require('graphql');
const mongoose = require('mongoose');


const app = express();

const event = [];

app.use(bodyParser);

app.use(
    '/graphql',
    graphglHttp({
        schema:buildSchema(`
        type Event{
            _id:ID!
            name:String!
            summary:String!
            price:Number!
            imageCover:String!
        }

        input EventInput {
            name:String!
            summary:String!
            price:Number!
            imageCover:String!
        }

        type RootQuery {
            event: [Event!]!
        }

        type RootMutation{
            createEvent(eventInput: EventInput): Event
        }

        schema{
            query: RootQuery
            mutation: RootMutation
        }
        `),
        rootValue:{
            events: () => {
                return events;
            },

            createEvents: args => {
                const event = {
                   
                    name:args.eventInput.name,
                    summary:args.eventInput.summary,
                    price:args.eventInput.price,
                    imageCover:args.eventInput.imageCover


                }
                events.push(event);
            }
        },
        graphiql:true
    })
)

const dotenv = require('dotenv');
dotenv.config({path:'./config.env'});
const app = require("./app");
const DB = process.env.DATABASE_LOCAL;

//const DB = process.env.DATABASE.replace('<PASSWORD>',process.env.DATABASE_PASSWORD);
mongoose.connect(DB,{
    useNewUrlParser:true,
    useCreateIndex: true,
    useFindAndModify: true
}).then(con=>{
   // console.log(con.connections);
    console.log("DB connection successful");
});
