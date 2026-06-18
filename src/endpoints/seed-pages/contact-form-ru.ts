import type { RequiredDataFromCollectionSlug } from 'payload'

// Локализованная форма обратной связи для блока contact-us-form на /contact.
// Лёгкие seed-скрипты (seed-pages/seed-posts/seed-globals) не создают
// документы forms — без этого блок формы тихо не рендерится (нет ошибки,
// просто пустое место), поэтому форму создаём здесь же при отсутствии.
export const contactFormRu: RequiredDataFromCollectionSlug<'forms'> = {
  title: 'Форма обратной связи',
  confirmationType: 'message',
  confirmationMessage: {
    root: {
      type: 'root',
      children: [
        {
          type: 'heading',
          children: [
            {
              type: 'text',
              detail: 0,
              format: 0,
              mode: 'normal',
              style: '',
              text: 'Спасибо! Ваша заявка отправлена, мы свяжемся с вами в ближайшее время.',
              version: 1,
            },
          ],
          direction: 'ltr',
          format: '',
          indent: 0,
          tag: 'h2',
          version: 1,
        },
      ],
      direction: 'ltr',
      format: '',
      indent: 0,
      version: 1,
    },
  },
  emails: [
    {
      emailFrom: '"MegaDomic" <hello@megadomic.ru>',
      emailTo: '{{email}}',
      subject: 'Мы получили вашу заявку',
      message: {
        root: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  detail: 0,
                  format: 0,
                  mode: 'normal',
                  style: '',
                  text: 'Спасибо за обращение! Мы получили вашу заявку и скоро свяжемся с вами.',
                  version: 1,
                },
              ],
              direction: 'ltr',
              format: '',
              indent: 0,
              textFormat: 0,
              version: 1,
            },
          ],
          direction: 'ltr',
          format: '',
          indent: 0,
          version: 1,
        },
      },
    },
  ],
  fields: [
    {
      name: 'full-name',
      blockName: 'full-name',
      blockType: 'text',
      label: 'Имя',
      required: true,
      width: 100,
    },
    {
      name: 'email',
      blockName: 'email',
      blockType: 'email',
      label: 'Email',
      required: true,
      width: 100,
    },
    {
      name: 'phone',
      blockName: 'phone',
      blockType: 'number',
      label: 'Телефон',
      required: false,
      width: 100,
    },
    {
      name: 'message',
      blockName: 'message',
      blockType: 'textarea',
      label: 'Сообщение',
      required: true,
      width: 100,
    },
  ],
  submitButtonLabel: 'Отправить',
}
