import S from '@sanity/desk-tool/structure-builder';
import { GoBrowser as PageIcon, GoHome, GoSettings } from 'react-icons/go';
import PreviewIFrame from './components/previewIFrame';

const hiddenDocTypes = (listItem) =>
  ![
    'siteSettings',
    'landingPage',
    'coffeePage',
    'eventsPage',
    'aboutPage',
  ].includes(listItem.getId());
export default () =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Site Page Settings')
        .icon(GoSettings)
        .child(
          S.document().schemaType('siteSettings').documentId('siteSettings')
        ),
      S.listItem()
        .title('Home Page')
        .icon(GoHome)
        .child(
          S.document()
            .schemaType('landingPage')
            .documentId('homePage')
            .views([S.view.form(), PreviewIFrame()])
        ),
      S.listItem()
        .title('Coffee Page')
        .icon(PageIcon)
        .child(
          S.document()
            .schemaType('coffeePage')
            .documentId('coffeePage')
            .views([S.view.form(), PreviewIFrame()])
        ),
      S.listItem()
        .title('Events Page')
        .icon(PageIcon)
        .child(
          S.document()
            .schemaType('eventsPage')
            .documentId('eventsPage')
            .views([S.view.form(), PreviewIFrame()])
        ),
      S.listItem()
        .title('About Page')
        .icon(PageIcon)
        .child(
          S.document()
            .schemaType('aboutPage')
            .documentId('aboutPage')
            .views([S.view.form(), PreviewIFrame()])
        ),
      ...S.documentTypeListItems().filter(hiddenDocTypes),
    ]);
