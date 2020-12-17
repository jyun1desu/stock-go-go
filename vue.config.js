module.exports = {
    css: {
        loaderOptions: {
            sass: {
                additionalData: `
                    @import "@/styles/_theme.scss";
                    @import "@/styles/_table_style.scss";
                `
            }
        }
    },
    publicPath: process.env.NODE_ENV === 'production' ?
        '/stock-go-go/' :
        '/'
}