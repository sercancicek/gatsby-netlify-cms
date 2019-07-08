module.exports = {
    siteMetadata: {
        title: 'Full-Stack Bootcamp',
        author: 'Andrew Mead',
        siteUrl: 'https://inspiring-goldstine-3c29e5.netlify.com'
    },
    plugins: [
        `gatsby-plugin-netlify-cms`,
        'gatsby-plugin-sass',
        {
            resolve: 'gatsby-source-filesystem',
            options: {
                name: 'src',
                path: `${__dirname}/src/`
            }
        },
        'gatsby-plugin-sitemap',
        {
            resolve: 'gatsby-plugin-netlify-cms',
            options: {
                modulePath: `${__dirname}/src/cms/cms.js`,
                stylesPath: `${__dirname}/src/cms/admin.css`,
                enableIdentityWidget: true
            }
        },
        'gatsby-plugin-sharp',
        {
            resolve: 'gatsby-transformer-remark',
            options: {
                plugins: [
                    'gatsby-remark-relative-images',
                    {
                        resolve: 'gatsby-remark-images',
                        options: {
                            maxWidth: 750,
                            linkImagesToOriginal: false
                        }
                    }
                ]
            }
        },
        'gatsby-plugin-netlify'
    ]
}