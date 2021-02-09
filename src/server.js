// Dados
const proffys = [
    {
        name: "Diego Silva", 
        avatar: "https://avatars2.githubusercontent.com/u/2254731?s=460&u=0ba16a79456c2f250e7579cb388fa18c5c2d7d65&v=4",
        whatsapp: "997777777",
        bio: "Entusiasta das melhores tecnologias de química avançada.Apaixonado por explodir coisas em laboratório e por mudar a vida das pessoas através de experiências. Mais de 200.000 pessoas já passaram por uma das minhas explosões.",
        subject: "Química ",
        cost: "20",
        weekday: [
            1
        ],
        time_frim: [
            720
        ],
        time_to: [
            1220
        ]
    },
    {
        name: "Diego Fernandes", 
        avatar: "https://avatars2.githubusercontent.com/u/2254731?s=460&u=0ba16a79456c2f250e7579cb388fa18c5c2d7d65&v=4",
        whatsapp: "997777777",
        bio: "Entusiasta das melhores tecnologias de química avançada.Apaixonado por explodir coisas em laboratório e por mudar a vida das pessoas através de experiências. Mais de 200.000 pessoas já passaram por uma das minhas explosões.",
        subject: "Química ",
        cost: "20",
        weekday: [
            0
        ],
        time_frim: [
            720
        ],
        time_to: [
            1220
        ]
    }
]
const subjects = [
    "Artes",
    "Biologia",
    "Ciências",
    "Educação física",
    "Física",
    "Geografia",
    "História",
    "Matemática",
    "Português",
    "Química",
]
const weekdays = [
    "Domingo",
    "Segunda-feira",
    "Terça-feira", 
    "Quarta-feira", 
    "Quinta-feira", 
    "Sexta-feira", 
    "Sábado",
]

// Funcionalidades
function getSubject(subjectNumber) {
    const arrayPosition = +subjectNumber - 1 
    return subjects[arrayPosition]
}

function pageLanding(req, res) {
    return res.render("index.html")
}

function pageStudy(req, res) {
    // Mandando de volta para o HTML
    const filters = req.query
    return res.render("study.html",  { proffys, filters, subjects, weekdays })
}

function pageGiveClasses(req, res) {
    const data = req.query

    // Se tiver dados, adicionar
    // Transformando as chaves do objeto em um array
    // Com dados => [name, avatar, bio, ...]
    // Sem dados => []
    const isNotEmpty = Object.keys(data).length > 0
    if (isNotEmpty) {
        // Para mostar o nome da matéria e não o número
        data.subject = getSubject(data.subject)

        // Adicionar dados a lista de proffys
        proffys.push(data)
        // Redirecionando para outra página (Pós cadastro)
        return res.redirect("/study")
    }
    // Senão, mostrar a página
    return res.render("give-classes.html", { subjects, weekdays })
}

// Servidor
const express = require('express')
const server = express()  

// Configurar nunjucks (Template engine)
const nunjucks = require('nunjucks')
nunjucks.configure('src/views', {
    express: server,
    noCache: true,
})

// Inicio e configuração do servidor
server
// Configurando a pasta public como pasta raiz do projeto
.use(express.static("public"))
// Rotas da aplicação
.get("/", pageLanding)
.get("/study", pageStudy)
.get("/give-classes", pageGiveClasses)
// Start do servidor
.listen(5500)