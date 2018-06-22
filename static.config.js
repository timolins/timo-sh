import React from 'react'
import {reloadRoutes} from 'react-static/node'
import jdown from 'jdown'
import chokidar from 'chokidar'
import {ServerStyleSheet} from 'styled-components'

chokidar.watch('content').on('all', () => reloadRoutes())

export default {
  getSiteData: () => ({
    title: 'Timo Lins'
  }),
  getRoutes: async () => {
    const {projects, about} = await jdown('content')

    return [
      {
        path: '/',
        component: 'src/pages/Home',
        getData: () => ({
          projects: projects.filter(project => project.slug)
        }),
        children: projects.map(project => ({
          path: `/${project.slug}`,
          component: 'src/pages/Project',
          getData: () => ({
            project
          })
        }))
      },
      {
        path: '/about',
        component: 'src/pages/About',
        getData: () => ({
          about
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
      const {Html, Head, Body, children, renderMeta} = this.props

      return (
        <Html>
          <Head>
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
