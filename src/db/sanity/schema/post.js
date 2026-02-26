export default {
  name: 'post',
  title: '게시글',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: '제목',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'content',
      title: '본문',
      type: 'text',
      validation: Rule => Rule.required()
    },
    {
      name: 'author',
      title: '작성자',
      type: 'reference',
      to: [{ type: 'user' }],
      validation: Rule => Rule.required()
    },
    {
      name: 'viewCount',
      title: '조회수',
      type: 'number',
      initialValue: 0
    },
    {
      name: 'publishedAt',
      title: '발행일',
      type: 'datetime',
      initialValue: (new Date()).toISOString()
    }
  ]
}
