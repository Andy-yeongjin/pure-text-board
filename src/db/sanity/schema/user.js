export default {
  name: 'user',
  title: '사용자',
  type: 'document',
  fields: [
    {
      name: 'email',
      title: '이메일',
      type: 'string',
      validation: Rule => Rule.required().email()
    },
    {
      name: 'password',
      title: '비밀번호',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'name',
      title: '이름',
      type: 'string',
      validation: Rule => Rule.required()
    }
  ]
}
