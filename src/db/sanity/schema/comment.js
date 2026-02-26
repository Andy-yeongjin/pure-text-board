export default {
  name: 'comment',
  title: '댓글',
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
      name: 'author',
      title: '작성자',
      type: 'reference',
      to: [{ type: 'user' }],
      validation: Rule => Rule.required()
    },
    {
      name: 'content',
      title: '내용',
      type: 'text',
      validation: Rule => Rule.required()
    },
    {
      name: 'isDeleted',
      title: '삭제여부',
      type: 'boolean',
      initialValue: false
    },
    {
      name: 'createdAt',
      title: '작성일',
      type: 'datetime',
      initialValue: (new Date()).toISOString()
    }
  ]
}
