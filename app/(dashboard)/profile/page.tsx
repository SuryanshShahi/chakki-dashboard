import PageWrapper from "@/app/components/pageWrapper/PageWrapper";
import Profile from "@/app/features/profile";

const Page = () => {
  return (
    <PageWrapper hideFooter wrapperClass="!px-0">
      <Profile />
    </PageWrapper>
  );
};

export default Page;
