import { Header, Layout, SideProfileView, CreatePost } from "../components";

export default function CreatePostPage() {
  return (
    <Layout header={<Header />} sidebar={<SideProfileView />}>
      <CreatePost />
    </Layout>
  );
}
