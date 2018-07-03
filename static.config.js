import React from 'react'
import {reloadRoutes} from 'react-static/node'
import jdown from 'jdown'
import chokidar from 'chokidar'
import {ServerStyleSheet} from 'styled-components'

import config from './config.json'

chokidar.watch('content').on('all', () => reloadRoutes())

export default {
  preact: true,
  getRoutes: async () => {
<<<<<<< HEAD
=======
    const {projects, achievements, about} = await jdown('content')
>>>>>>> 1195ee1c8e057cfee79220ea0c617f9f611bdf74
    const {projects, achievements, about, contact} = await jdown('content')

    return [
      {
        path: '/',
        component: 'src/pages/Home',
        getData: () => ({
          about,
          achievements,
          projects: projects.filter(project => project.slug).map(project => ({
            ...project,
            types: project.types.split(', ')
          }))
        }),
        children: projects.map(project => ({
          path: `/${project.slug}`,
          component: 'src/pages/Project',
          getData: () => ({
            project,
            tags: project.tags && project.tags.split(', ')
          })
        }))
      },
      {
        path: '/contact',
        component: 'src/pages/Contact',
        getData: () => ({
          contact
        })
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
            <title>{config.name}</title>
            <meta charSet="UTF-8" />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
            {renderMeta.styleTags}
          </Head>
          <Body>{children}</Body>
        </Html>
      )
    }
  }
}
