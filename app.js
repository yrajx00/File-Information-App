const Express = require('express')
const app = Express()
const path = require('path')
const multer = require('multer')
const mime = require('mime')
const CustomError = require('./CustomError')

const storage = multer.memoryStorage()
const upload = multer({ storage })
let ext = ''
let mtype = ''

app.set('view engine', 'ejs')
app.set('views', __dirname)

app.listen(3000, ()=> {
    console.log('LISTENING ON PORT 3000...')
})

app.post('/', upload.single('file'), async (req, res) => {
    const file = req.file
    console.log(req.file)
    mtype = req.file.mimetype
    ext = mime.getExtension(mtype)
    console.log(ext)
    res.redirect('/')
});

app.get('/', (req, res) => {
    res.render('index', {ext, mtype})
})

app.all('*', (req, res, next) => {
    next(new CustomError('Page Not Found', 404))
})

app.use((err, req, res, next) => {
    const {statusCode = 500} = err
    if (!err.message) err.message = 'Something Went Wrong'
    res.status(statusCode).render('error', {err})
})