import PageWrapper from "@/app/components/pageWrapper/PageWrapper";
import Settings from "@/app/features/settings";

const Page = () => {
  return (
    <PageWrapper hideFooter wrapperClass="!px-0">
      <Settings />
    </PageWrapper>
  );
};

export default Page;
