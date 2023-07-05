/*
 * @Author: hyman
 * @Date: 2023-06-24 13:27:32
 * @LastEditors: Dalas
 * @LastEditTime: 2023-06-24 15:15:40
 * @Description: 请填写简介
 */
import dotenv from 'dotenv'
import  pkg  from 'pg'
dotenv.config()
// console.log(dotenv.configDotenv())

const { Client } = pkg

dotenv.config()

const client = new Client({
    ...dotenv.configDotenv()
})

const createTable = async (tableName) =>{
    await client.connect()
    try{
        await client.query(`
            create table if not exists ${tableName}(
                id serial primary key,
                name varchar(50) not null
            )
        `)
        console.log(`table ${tableName} is created successfully...`)
    }catch(e){
        console.log(e)
    }finally{
        await client.end()
    }
}


const getTable = async (tableName) => {
    await client.connect()
    try{
        const res = await client.query(`select * from ${tableName}`)
        console.log(res.rows)
    }catch(e){
        console.log(e)
    }finally{
        client.end()
    }
}

const insertTable = async () => {
    await client.connect()
    try{
        const res = await client.query(`
            insert into username (name) values('pad')
        `)
        console.log(res)
    }catch(e){
        console.log(e)
    }finally{
        client.end()
    }
}


// createTable('username')
// insertTable()
getTable('username')