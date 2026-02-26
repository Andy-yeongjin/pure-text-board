export default {
  name: 'like',
  title: '좋아요',
  type: 'document',
  fields: [
    {
      name: 'post',
      title: '게시글',
      type: 'reference',
      to: [{ type: 'post' }],
      validation: Rule => Rule.required()
    },
    {
      name: 'user',
      title: '사용자',
      type: 'reference',
      to: [{ type: 'user' }],
      validation: Rule => Rule.required()
    }
  ]
}
