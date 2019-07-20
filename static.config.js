import React from 'react'
import { reloadRoutes } from 'react-static/node'
import jdown from 'jdown'
import chokidar from 'chokidar'
import { ServerStyleSheet } from 'styled-components'
import marked from 'marked'
import dotenv from 'dotenv'

import config from './config.json'

const renderer = new marked.Renderer()

renderer.link = (href, title, text) =>
  `<a target="_blank" href="${href}" title="${title}">${text}</a>`
chokidar.watch('content').on('all', () => reloadRoutes())
dotenv.config()

export default {
  siteRoot: 'https://timo.sh',
  getRoutes: async () => {
    const { projects, achievements, about, contact } = await jdown('content', {
      assets: {
        output: './public',
        png: {
          quality: [0.8, 0.9]
        },
        jpg: {
          progressive: true
        }
      }
    })
    return [
      {
        path: '/',
        component: 'src/pages/Home',
        getData: () => ({
          about,
          achievements,
          githubToken: process.env.GITHUB_TOKEN,
          projects: projects.map(project => ({
            ...project,
            types: project.types.split(', ')
          }))
        }),
        priority: 1,
        children: projects.map(project => ({
          path: `/${project.slug}`,
          component: 'src/pages/Project',
          getData: () => ({
            project,
            tags: project.tags && project.tags.split(', ')
          }),
          priority: project.featured ? 0.7 : 0.5
        }))
      },
      {
        path: '/contact',
        component: 'src/pages/Contact',
        getData: () => ({
          contact
        }),
        priority: 0.8
      },
      {
        is404: true,
        component: 'src/pages/404'
      }
    ]
  },
  renderToHtml: (render, Comp, meta) => {
    const sheet = new ServerStyleSheet()
    const html = render(sheet.collectStyles(<Comp />))
    meta.styleTags = sheet.getStyleElement()
    return html
  },
  Document: class CustomHtml extends React.Component {
    render() {
      const { Html, Head, Body, children, renderMeta } = this.props

      return (
        <Html>
          <Head>
            <title>{`${config.name} - ${config.subtitle}`}</title>
            <meta charSet="UTF-8" />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
            <link rel="shortcut icon" type="image/png" href="/favicon.png" />
            {renderMeta.styleTags}
          </Head>
          <Body>{children}</Body>
        </Html>
      )
    }
  }
}
