module.exports = {
    entry:[
        './src/sizeinreality.js','./src/aframe-v0.7.0.min.js','./src/aframe-ar.js'
    ],
    output:{
        filename:'./dist/sir.bundle.js'
    },
    node: { fs: 'empty' }
    
    
}