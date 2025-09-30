const bcrypt = require ("bcrypt")
const db = require("../models")
async function register(req,res) {
    const {usuarioN, emailN,senhaN} = req.body

    if(!usuarioN || !emailN || !senhaN){
        return res.status(400).json({ mensagem: 'Erro: Todos os campos são obrigatórios!' });
    }
    try{
        const existe = await db.Usuario.findOne({
            where:{
                email: emailN
            }
        })
        if(existe){
            return res.status(409).json({mensagem: "E-mail ja esta em uso"})
        }
        const senhaCripotagrafa = await bcrypt.hash(senhaN,10)

        await db.Usuario.create({
            nome: usuarioN,
            email: emailN,
            senha: senhaCripotagrafa
        })
        return res.status(201).json({mensagem:"Usuario criado com sucesso"})
    }catch (error) { 
        console.error("Erro registrado:", error); 
        return res.status(500).json({ mensagem: "Ocorreu um erro interno no servidor" });
    }
}

module.exports ={
    register
}