import React from 'react'
import {reloadRoutes} from 'react-static/node'
import jdown from 'jdown'
import chokidar from 'chokidar'
import {ServerStyleSheet} from 'styled-components'

import config from './config.json'

chokidar.watch('content').on('all', () => reloadRoutes())

export default {
  preact: true,
  siteRoot: 'https://timo.sh',
  getRoutes: async () => {
    const {projects, achievements, about, contact} = await jdown('content')

    return [
      {
        path: '/',
        component: 'src/pages/Home',
        getData: () => ({
          about,
          achievements,
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
      const {Html, Head, Body, children, renderMeta, siteData} = this.props

      return (
        <Html>
          <Head>
            <title>{`${config.name} ~ ${config.subtitle}`}</title>
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
