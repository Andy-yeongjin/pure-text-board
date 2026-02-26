import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';
import post from './src/db/sanity/schema/post';
import user from './src/db/sanity/schema/user';
import comment from './src/db/sanity/schema/comment';
import like from './src/db/sanity/schema/like';

export default defineConfig({
  name: 'default',
  title: 'PureText Board',

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'your-project-id',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',

  plugins: [deskTool()],

  schema: {
    types: [post, user, comment, like],
  },
});
